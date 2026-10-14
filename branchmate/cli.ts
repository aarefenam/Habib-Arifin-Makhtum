#!/usr/bin/env bun
// branchmate - keyboard-driven git worktree + branch CRUD for CLI agents.
// Usage:
//   bun branchmate/cli.ts              interactive menu (single-keypress)
//   bun branchmate/cli.ts list         list worktrees + branches
//   bun branchmate/cli.ts create <name> [-b base]   new branch + worktree
//   bun branchmate/cli.ts switch <name>  print worktree path (cd to it)
//   bun branchmate/cli.ts remove <name>  delete worktree (+ branch)

import { execSync } from "node:child_process"
import * as readline from "node:readline"
import { basename, dirname, join } from "node:path"

function sh(cmd: string): string {
  return execSync(cmd, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim()
}

function repoRoot(): string {
  return sh("git rev-parse --show-toplevel")
}

function repoNick(): string {
  return basename(repoRoot())
}

function wtPath(branch: string): string {
  const safe = branch.replace(/\//g, "-")
  return join(dirname(repoRoot()), `wt-${repoNick()}-${safe}`)
}

function worktrees(): { path: string; branch: string }[] {
  const out = sh("git worktree list --porcelain")
  const rows: { path: string; branch: string }[] = []
  let cur = ""
  for (const line of out.split("\n")) {
    if (line.startsWith("worktree ")) cur = line.slice(9)
    else if (line.startsWith("branch ")) {
      rows.push({ path: cur, branch: line.slice(7).replace("refs/heads/", "") })
      cur = ""
    } else if (line === "" && cur) {
      rows.push({ path: cur, branch: "(detached)" })
      cur = ""
    }
  }
  return rows
}

function branches(): string[] {
  return sh("git branch --format='%(refname:short)'")
    .split("\n")
    .map((b) => b.trim().replace(/^'|'$/g, ""))
    .filter(Boolean)
}

function list() {
  console.log("\nWorktrees:")
  for (const [i, w] of worktrees().entries())
    console.log(`  [${i + 1}] ${w.branch}  ->  ${w.path}`)
  console.log("\nBranches:")
  for (const b of branches()) console.log(`  - ${b}`)
}

function create(name: string, base = "main") {
  const path = wtPath(name)
  const exists = branches().includes(name)
  const baseFlag = exists ? "" : `-b ${name} ${base}`
  // existing branch: attach worktree; new branch: create from base
  sh(exists ? `git worktree add "${path}" ${name}` : `git worktree add "${path}" ${baseFlag}`)
  console.log(`created: ${name} -> ${path}`)
  console.log(`cd "${path}"`);
}

function switchTo(name: string) {
  const hit = worktrees().find((w) => w.branch === name || w.branch.endsWith(`/${name}`))
  if (!hit) {
    console.error(`no worktree for "${name}". Run: bun branchmate/cli.ts create ${name}`)
    process.exit(1)
  }
  // CLI agents capture stdout and cd to it; humans can copy-paste.
  console.log(hit.path)
}

function remove(name: string, keepBranch = false) {
  const hit = worktrees().find((w) => w.branch === name)
  if (hit) sh(`git worktree remove "${hit.path}" --force`)
  if (!keepBranch) {
    try {
      sh(`git branch -D ${name}`)
    } catch {
      /* branch may not exist locally */
    }
  }
  sh("git worktree prune")
  console.log(`removed: ${name}`)
}

// --- keyboard-driven interactive menu (single keypress, no Enter) ---
async function menu() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
  const ask = (q: string): Promise<string> =>
    new Promise((res) => rl.question(q, res))
  const key = (): Promise<string> =>
    new Promise((res) => {
      process.stdin.setRawMode?.(true)
      process.stdin.resume()
      process.stdin.once("data", (d) => {
        process.stdin.setRawMode?.(false)
        res(d.toString())
      })
    })

  for (;;) {
    console.log("\nbranchmate  [1]list [2]create [3]switch [4]remove [q]quit")
    const k = (await key()).trim()
    if (k === "q" || k === "\u0003") break
    if (k === "1") list()
    else if (k === "2") {
      const n = (await ask("branch name: ")).trim()
      if (n) create(n)
    } else if (k === "3" || k === "4") {
      const wts = worktrees()
      wts.forEach((w, i) => console.log(`  [${i + 1}] ${w.branch}`))
      console.log("  [q] back")
      const pick = (await key()).trim()
      if (pick === "q") continue
      const hit = wts[Number(pick) - 1]
      if (!hit) continue
      if (k === "3") console.log(`\ncd "${hit.path}"`)
      else remove(hit.branch)
    }
  }
  rl.close()
}

const [, , cmd, ...rest] = process.argv
if (!cmd) await menu()
else if (cmd === "list") list()
else if (cmd === "create" && rest[0]) {
  const b = rest.indexOf("-b")
  create(rest[0], b >= 0 ? rest[b + 1] : "main")
} else if (cmd === "switch" && rest[0]) switchTo(rest[0])
else if (cmd === "remove" && rest[0])
  remove(rest[0], rest.includes("--keep-branch"))
else {
  console.error("usage: bun branchmate/cli.ts [list|create|switch|remove] <name>")
  process.exit(1)
}
