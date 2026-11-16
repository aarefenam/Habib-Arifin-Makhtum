import { saveProject } from "@/actions/admin-cms"
import { AdminForm } from "@/components/private/admin/admin-form"
import { AssetField } from "@/components/private/admin/asset-field"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { COUNTRIES } from "@/lib/countries"
import { cn } from "@/lib/utils"
import type { PortfolioMediaAsset, PortfolioProject } from "@/types/cms"

function CheckboxField({
  defaultChecked,
  label,
  name,
}: {
  defaultChecked: boolean
  label: string
  name: string
}) {
  return (
    <label className="flex-center min-h-11 gap-3 rounded-lg border border-border bg-muted/40 px-3 text-sm font-medium">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="size-4 accent-blue-600"
      />
      {label}
    </label>
  )
}

// Optional detail-page field stored in project.content
function ContentField({
  project,
  name,
  label,
  hint,
  long = false,
  half = false,
}: {
  project?: PortfolioProject
  name: string
  label: string
  hint?: string
  long?: boolean
  half?: boolean
}) {
  const id = `project-${name}-${project?.id ?? "new"}`
  const value = project?.content[name]
  const defaultValue = typeof value === "string" ? value : ""

  return (
    <div className={cn("flex flex-col gap-2", !half && "md:col-span-2")}>
      <Label htmlFor={id}>{label}</Label>
      {long ? (
        <Textarea
          id={id}
          name={name}
          defaultValue={defaultValue}
          placeholder={hint}
          className="min-h-28"
        />
      ) : (
        <Input
          id={id}
          name={name}
          defaultValue={defaultValue}
          placeholder={hint}
          className="h-11"
        />
      )}
    </div>
  )
}

function ProjectFields({
  project,
  media,
}: {
  project?: PortfolioProject
  media: PortfolioMediaAsset[]
}) {
  const body =
    typeof project?.content.body === "string" ? project.content.body : ""

  return (
    <div className="grid gap-5 md:grid-cols-2">
      <input type="hidden" name="id" value={project?.id ?? ""} />
      <div className="flex flex-col gap-2">
        <Label htmlFor={`project-title-${project?.id ?? "new"}`}>Judul *</Label>
        <Input
          id={`project-title-${project?.id ?? "new"}`}
          name="title"
          required
          defaultValue={project?.title ?? ""}
          className="h-11"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor={`project-slug-${project?.id ?? "new"}`}>Slug *</Label>
        <Input
          id={`project-slug-${project?.id ?? "new"}`}
          name="slug"
          required
          defaultValue={project?.slug ?? ""}
          className="h-11"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor={`project-type-${project?.id ?? "new"}`}>
          Tipe project
        </Label>
        <Input
          id={`project-type-${project?.id ?? "new"}`}
          name="project_type"
          defaultValue={project?.projectType ?? "Web application"}
          className="h-11"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor={`project-order-${project?.id ?? "new"}`}>
          Urutan tampil
        </Label>
        <Input
          id={`project-order-${project?.id ?? "new"}`}
          name="sort_order"
          type="number"
          min="0"
          defaultValue={project?.sortOrder ?? 0}
          className="h-11"
        />
      </div>
      <div className="flex flex-col gap-2 md:col-span-2">
        <Label htmlFor={`project-summary-${project?.id ?? "new"}`}>
          Ringkasan *
        </Label>
        <Textarea
          id={`project-summary-${project?.id ?? "new"}`}
          name="short_description"
          required
          defaultValue={project?.shortDescription ?? ""}
        />
      </div>
      <div className="flex flex-col gap-2 md:col-span-2">
        <Label htmlFor={`project-content-${project?.id ?? "new"}`}>
          Case study
        </Label>
        <Textarea
          id={`project-content-${project?.id ?? "new"}`}
          name="content"
          defaultValue={body}
          className="min-h-36"
        />
      </div>
      {/* Optional detail page sections - empty fields are hidden on the site */}
      <ContentField
        project={project}
        name="headline"
        label="Headline (kalimat besar di bawah judul)"
        hint="A modern ERP for travel agencies."
      />
      <ContentField
        project={project}
        name="client"
        label="Nama client"
        hint="Egypt Malaya Tours"
        half
      />
      <div className="flex flex-col gap-2">
        <Label htmlFor={`project-country-${project?.id ?? "new"}`}>
          Negara client
        </Label>
        <select
          id={`project-country-${project?.id ?? "new"}`}
          name="client_country"
          defaultValue={
            typeof project?.content.clientCountry === "string"
              ? project.content.clientCountry
              : ""
          }
          className="h-11 rounded-lg border border-input bg-transparent px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <option value="">- Tanpa negara -</option>
          {COUNTRIES.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
      </div>
      <ContentField
        project={project}
        name="timeline"
        label="Timeline"
        hint="May 2026 to Sep 2026"
      />
      <ContentField
        project={project}
        name="features"
        label="Fitur utama (satu per baris: Judul | Deskripsi)"
        hint={
          "Booking engine | Real-time availability and pricing\nInvoicing | Automatic invoices and payment tracking"
        }
        long
      />
      <ContentField
        project={project}
        name="problem"
        label="Deep dive - Problem"
        long
      />
      <ContentField
        project={project}
        name="solution"
        label="Deep dive - Solution"
        long
      />
      <ContentField
        project={project}
        name="insight"
        label="Deep dive - Insight"
        long
      />
      <div className="flex flex-col gap-2">
        <Label htmlFor={`project-tech-${project?.id ?? "new"}`}>
          Teknologi
        </Label>
        <Input
          id={`project-tech-${project?.id ?? "new"}`}
          name="technologies"
          defaultValue={project?.technologies.join(", ") ?? ""}
          placeholder="Next.js, Supabase, R2"
          className="h-11"
        />
      </div>
      <AssetField
        id={`project-cover-${project?.id ?? "new"}`}
        name="cover_key"
        label="Cover project"
        value={project?.coverKey ?? null}
        assets={media}
      />
      <div className="flex flex-col gap-2">
        <Label htmlFor={`project-live-${project?.id ?? "new"}`}>URL live</Label>
        <Input
          id={`project-live-${project?.id ?? "new"}`}
          name="live_url"
          type="url"
          defaultValue={project?.liveUrl ?? ""}
          className="h-11"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor={`project-repository-${project?.id ?? "new"}`}>
          URL repository
        </Label>
        <Input
          id={`project-repository-${project?.id ?? "new"}`}
          name="repository_url"
          type="url"
          defaultValue={project?.repositoryUrl ?? ""}
          className="h-11"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor={`project-status-${project?.id ?? "new"}`}>Status</Label>
        <select
          id={`project-status-${project?.id ?? "new"}`}
          name="status"
          defaultValue={project?.status ?? "draft"}
          className="h-11 rounded-lg border border-input bg-transparent px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <CheckboxField
          name="featured"
          label="Tampilkan unggulan"
          defaultChecked={project?.featured ?? false}
        />
      </div>
    </div>
  )
}

export function ProjectEditor({
  projects,
  media,
  configured,
}: {
  projects: PortfolioProject[]
  media: PortfolioMediaAsset[]
  configured: boolean
}) {
  return (
    <div className="mt-8 space-y-6">
      <Card className="border border-border py-0 shadow-none">
        <CardHeader className="border-b border-border px-5 py-5 sm:px-6">
          <CardTitle className="text-lg">Tambah project</CardTitle>
          <CardDescription className="mt-1 leading-6">
            Buat case study baru. Simpan sebagai draft sampai siap ditampilkan
            di halaman publik.
          </CardDescription>
        </CardHeader>
        <CardContent className="px-5 py-5 sm:px-6 sm:py-6">
          <AdminForm
            action={saveProject}
            disabled={!configured}
            resetOnSuccess
            submitLabel="Tambah project"
          >
            <ProjectFields media={media} />
          </AdminForm>
        </CardContent>
      </Card>

      <section aria-labelledby="existing-projects">
        <div className="mb-4">
          <h2 id="existing-projects" className="heading-5">
            Project tersimpan
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Edit, publikasi, atau hapus project yang sudah ada.
          </p>
        </div>
        <div className="space-y-4">
          {projects.length ? (
            projects.map((project) => (
              <Card
                key={project.id}
                className="border border-border py-0 shadow-none"
              >
                <CardHeader className="border-b border-border px-5 py-5 sm:px-6">
                  <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
                    <div>
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                      <CardDescription className="mt-1">
                        /{project.slug} · {project.status}
                      </CardDescription>
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">
                      Urutan {project.sortOrder}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="px-5 py-5 sm:px-6 sm:py-6">
                  <AdminForm
                    action={saveProject}
                    disabled={!configured}
                    submitLabel="Simpan project"
                  >
                    <ProjectFields project={project} media={media} />
                    <button
                      type="submit"
                      name="intent"
                      value="delete"
                      formNoValidate
                      className="mt-5 min-h-11 cursor-pointer rounded-lg border border-destructive/30 px-4 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
                    >
                      Hapus project
                    </button>
                  </AdminForm>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="border border-dashed border-border py-0 shadow-none">
              <CardContent className="px-5 py-10 text-center text-sm text-muted-foreground sm:px-6">
                Belum ada project. Gunakan form di atas untuk menambahkan case
                study pertama.
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  )
}
