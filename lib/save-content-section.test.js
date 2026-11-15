import { expect, mock, test } from "bun:test"

mock.module("server-only", () => ({}))
const { persistContentSection } = await import("@/lib/save-content-section")

function clientFor({
  rpcError = { code: "PGRST202" },
  versions = [],
  saves = [],
} = {}) {
  const query = {
    select: mock(() => query),
    eq: mock(() => query),
    update: mock(() => query),
    single: mock(
      async () =>
        versions.shift() ?? { data: null, error: { code: "MISSING_SETTINGS" } }
    ),
    maybeSingle: mock(async () => saves.shift() ?? { data: null, error: null }),
  }
  return {
    query,
    client: {
      rpc: mock(async () => ({ error: rpcError })),
      from: mock(() => query),
    },
  }
}

test("available RPC saves directly without a read/merge/write", async () => {
  const { client } = clientFor({ rpcError: null })
  expect(
    await persistContentSection(client, "header", { brandName: "New" })
  ).toEqual({ error: null })
  expect(client.from).not.toHaveBeenCalled()
})

test("older databases save one section with a conditional version check", async () => {
  const previous = {
    hero: { title: "Keep hero" },
    header: { brandName: "Old" },
    customSection: { value: "Keep unknown content" },
  }
  const { client, query } = clientFor({
    versions: [
      { data: { content: previous, updated_at: "version-1" }, error: null },
    ],
    saves: [{ data: { id: true }, error: null }],
  })
  expect(
    await persistContentSection(client, "header", { brandName: "New" })
  ).toEqual({ error: null })
  expect(query.update).toHaveBeenCalledWith({
    content: { ...previous, header: { brandName: "New" } },
  })
  expect(query.eq).toHaveBeenCalledWith("updated_at", "version-1")
  expect(previous.header.brandName).toBe("Old")
})

test("concurrent saves retry from fresh content and retain the other editor's change", async () => {
  const { client, query } = clientFor({
    versions: [
      {
        data: {
          content: { hero: { title: "Old hero" } },
          updated_at: "version-1",
        },
        error: null,
      },
      {
        data: {
          content: { hero: { title: "Edited in another session" } },
          updated_at: "version-2",
        },
        error: null,
      },
    ],
    saves: [
      { data: null, error: null },
      { data: { id: true }, error: null },
    ],
  })
  expect(
    await persistContentSection(client, "header", { brandName: "New" })
  ).toEqual({ error: null })
  expect(query.update).toHaveBeenLastCalledWith({
    content: {
      hero: { title: "Edited in another session" },
      header: { brandName: "New" },
    },
  })
  expect(query.eq).toHaveBeenCalledWith("updated_at", "version-2")
})

test("repeated conflicts return an error instead of claiming a successful save", async () => {
  const { client, query } = clientFor({
    versions: [1, 2, 3].map((version) => ({
      data: { content: {}, updated_at: `version-${version}` },
      error: null,
    })),
  })
  expect(await persistContentSection(client, "header", {})).toEqual({
    error: { code: "CONTENT_CONFLICT" },
  })
  expect(query.update).toHaveBeenCalledTimes(3)
})

test("missing content columns and malformed JSON are never overwritten", async () => {
  const missing = clientFor({
    versions: [{ data: null, error: { code: "42703" } }],
  })
  expect(await persistContentSection(missing.client, "header", {})).toEqual({
    error: { code: "42703" },
  })
  expect(missing.query.update).not.toHaveBeenCalled()
  const invalid = clientFor({
    versions: [{ data: { content: [], updated_at: "version" }, error: null }],
  })
  expect(await persistContentSection(invalid.client, "header", {})).toEqual({
    error: { code: "INVALID_CONTENT" },
  })
  expect(invalid.query.update).not.toHaveBeenCalled()
})

test("RPC permission failures never trigger the compatibility path", async () => {
  const { client } = clientFor({ rpcError: { code: "42501" } })
  expect(await persistContentSection(client, "header", {})).toEqual({
    error: { code: "42501" },
  })
  expect(client.from).not.toHaveBeenCalled()
})
