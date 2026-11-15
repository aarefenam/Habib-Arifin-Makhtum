import { beforeEach, expect, mock, test } from "bun:test"

import { DEFAULT_WEBSITE_CONTENT } from "@/constants/cms"

const requireSession = mock(async () => ({ username: "test-admin" }))
const revalidate = mock(() => {})
const rpc = mock(async () => ({ error: null }))
const single = mock(async () => ({ data: { id: true }, error: null }))
const maybeSingle = mock(async () => ({ data: { id: true }, error: null }))
const select = mock(() => query)
const eq = mock(() => query)
const update = mock(() => query)
const from = mock(() => query)
const query = { select, eq, update, single, maybeSingle }

mock.module("@/lib/auth/guard", () => ({ requireAdminSession: requireSession }))
mock.module("server-only", () => ({}))
mock.module("@/lib/supabase", () => ({
  getSupabaseAdmin: () => ({ rpc, from }),
}))
mock.module("next/cache", () => ({ revalidatePath: revalidate }))

const { saveContentSection } = await import("@/actions/site-content")
const idle = { status: "idle", message: null }

beforeEach(() => {
  for (const fn of [
    requireSession,
    revalidate,
    rpc,
    single,
    maybeSingle,
    select,
    eq,
    update,
    from,
  ])
    fn.mockClear()
})

function headerForm() {
  const form = new FormData()
  form.set("section", "header")
  for (const [key, value] of Object.entries(DEFAULT_WEBSITE_CONTENT.header)) {
    if (typeof value === "string") form.set(key, value)
  }
  form.set("brandName", "Edited header")
  form.set("links.count", "0")
  form.set("site_name", "Must not persist")
  return form
}

test("saving a header uses an atomic section update without replacing other settings", async () => {
  const state = await saveContentSection(idle, headerForm())
  expect(state.status).toBe("success")
  expect(requireSession).toHaveBeenCalledTimes(1)
  expect(rpc).toHaveBeenCalledWith("update_site_content_section", {
    section_key: "header",
    section_content: {
      ...DEFAULT_WEBSITE_CONTENT.header,
      brandName: "Edited header",
      links: [],
    },
  })
  expect(from).not.toHaveBeenCalled()
  expect(revalidate).toHaveBeenCalledWith("/", "layout")
})

test("unauthenticated saves cannot reach the database", async () => {
  requireSession.mockImplementationOnce(async () => {
    throw new Error("Authentication required")
  })
  await expect(saveContentSection(idle, headerForm())).rejects.toThrow(
    "Authentication required"
  )
  expect(rpc).not.toHaveBeenCalled()
  expect(from).not.toHaveBeenCalled()
})

test("invalid fields and unknown sections never mutate data", async () => {
  const form = headerForm()
  form.set("ctaHref", "javascript:alert(1)")
  expect((await saveContentSection(idle, form)).status).toBe("error")
  form.set("section", "__proto__")
  expect((await saveContentSection(idle, form)).status).toBe("error")
  expect(rpc).not.toHaveBeenCalled()
  expect(from).not.toHaveBeenCalled()
  expect(revalidate).not.toHaveBeenCalled()
})

test("database errors do not report a successful save", async () => {
  rpc.mockImplementationOnce(async () => ({ error: { code: "42501" } }))
  const state = await saveContentSection(idle, headerForm())
  expect(state.status).toBe("error")
  expect(state.message).toContain("gagal disimpan")
  expect(revalidate).not.toHaveBeenCalled()
})

test("saving contact settings only writes that group and retains empty optional fields", async () => {
  const form = new FormData()
  for (const [key, value] of Object.entries({
    section: "social",
    email: "test@example.com",
    phone: "",
    whatsapp_url: "",
    github: "",
    linkedin: "",
    instagram: "",
    role: "Must not persist",
  }))
    form.set(key, value)
  expect((await saveContentSection(idle, form)).status).toBe("success")
  expect(from).toHaveBeenCalledWith("site_settings")
  expect(update).toHaveBeenCalledWith({
    email: "test@example.com",
    phone: "",
    whatsapp_url: "",
    social_links: { github: "", linkedin: "", instagram: "" },
  })
  expect(eq).toHaveBeenCalledWith("id", true)
  expect(single).toHaveBeenCalledTimes(1)
  expect(rpc).not.toHaveBeenCalled()
})

test("a database exception keeps the save in error state", async () => {
  rpc.mockImplementationOnce(async () => {
    throw new Error("Connection failed")
  })
  expect((await saveContentSection(idle, headerForm())).status).toBe("error")
  expect(revalidate).not.toHaveBeenCalled()
})

test("header saves work before the optional RPC migration is installed", async () => {
  rpc.mockImplementationOnce(async () => ({ error: { code: "PGRST202" } }))
  single.mockImplementationOnce(async () => ({
    data: {
      content: { hero: { title: "Keep homepage" } },
      updated_at: "version-1",
    },
    error: null,
  }))
  expect((await saveContentSection(idle, headerForm())).status).toBe("success")
  expect(update).toHaveBeenCalledWith({
    content: {
      hero: { title: "Keep homepage" },
      header: {
        ...DEFAULT_WEBSITE_CONTENT.header,
        brandName: "Edited header",
        links: [],
      },
    },
  })
  expect(eq).toHaveBeenCalledWith("updated_at", "version-1")
  expect(revalidate).toHaveBeenCalledWith("/", "layout")
})
