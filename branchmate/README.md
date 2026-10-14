# branchmate

Keyboard-driven git worktree + branch CRUD for CLI-agent parallel sessions.
Zero dependencies - runs with `bun`, works from any repo checkout.

## Interactive (single keypress, no Enter)

```bash
bun branchmate/cli.ts
```

| Key | Action                            |
| --- | --------------------------------- |
| `1` | List worktrees + branches (read)  |
| `2` | Create branch + worktree (create) |
| `3` | Pick session, prints `cd` path    |
| `4` | Pick session, delete it (delete)  |
| `q` | Back / quit                       |

Worktrees are created as siblings: `wt-<repo>-<branch>`
(matches your existing `wt-portfolio-skills` layout).

## Direct commands (for agents)

```bash
bun branchmate/cli.ts list
bun branchmate/cli.ts create feat/faq -b main
bun branchmate/cli.ts switch feat/faq   # prints path -> cd to it
bun branchmate/cli.ts remove feat/faq   # removes worktree + branch
bun branchmate/cli.ts remove feat/faq --keep-branch
```
