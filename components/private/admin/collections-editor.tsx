import {
  saveFaq,
  saveService,
  saveSkill,
  saveTimelineEntry,
} from "@/actions/admin-cms"
import { AdminForm } from "@/components/private/admin/admin-form"
import { AssetField } from "@/components/private/admin/asset-field"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type {
  PortfolioMediaAsset,
  PortfolioFaq,
  PortfolioService,
  PortfolioSkill,
  PortfolioTimelineEntry,
} from "@/types/cms"
import type { ContentCollectionKey } from "@/constants/content-editor"

function VisibleField({ defaultChecked = true }: { defaultChecked?: boolean }) {
  return (
    <label className="flex-center min-h-11 gap-3 rounded-lg border border-border bg-muted/40 px-3 text-sm font-medium">
      <input
        type="checkbox"
        name="visible"
        defaultChecked={defaultChecked}
        className="size-4 accent-blue-600"
      />
      Tampilkan di website
    </label>
  )
}

function DeleteButton({ label }: { label: string }) {
  return (
    <button
      type="submit"
      name="intent"
      value="delete"
      formNoValidate
      className="mt-5 min-h-11 cursor-pointer rounded-lg border border-destructive/30 px-4 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
    >
      {label}
    </button>
  )
}

function Section({
  children,
  description,
  title,
}: {
  children: React.ReactNode
  description: string
  title: string
}) {
  return (
    <section>
      <div className="mb-4">
        <h2 className="heading-5">{title}</h2>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </div>
      {children}
    </section>
  )
}

function SkillFields({
  skill,
  media,
}: {
  skill?: PortfolioSkill
  media: PortfolioMediaAsset[]
}) {
  const key = skill?.id ?? "new"

  return (
    <div className="grid gap-5 md:grid-cols-2">
      <input type="hidden" name="id" value={skill?.id ?? ""} />
      <div className="flex flex-col gap-2">
        <Label htmlFor={`skill-name-${key}`}>Nama skill *</Label>
        <Input
          id={`skill-name-${key}`}
          name="name"
          required
          defaultValue={skill?.name ?? ""}
          className="h-11"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor={`skill-category-${key}`}>Kategori</Label>
        <select
          id={`skill-category-${key}`}
          name="category"
          defaultValue={skill?.category ?? "core"}
          className="h-11 rounded-lg border border-input bg-transparent px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <option value="core">Core</option>
          <option value="toolkit">Toolkit</option>
          <option value="additional">Additional</option>
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor={`skill-description-${key}`}>Deskripsi</Label>
        <Input
          id={`skill-description-${key}`}
          name="description"
          defaultValue={skill?.description ?? ""}
          className="h-11"
        />
      </div>
      <AssetField
        id={`skill-icon-${key}`}
        name="icon_key"
        label="Ikon skill"
        value={skill?.iconKey ?? null}
        assets={media}
      />
      <div className="flex flex-col gap-2">
        <Label htmlFor={`skill-order-${key}`}>Urutan tampil</Label>
        <Input
          id={`skill-order-${key}`}
          name="sort_order"
          type="number"
          min="0"
          defaultValue={skill?.sortOrder ?? 0}
          className="h-11"
        />
      </div>
      <VisibleField defaultChecked={skill?.visible ?? true} />
    </div>
  )
}

function ServiceFields({ service }: { service?: PortfolioService }) {
  const key = service?.id ?? "new"

  return (
    <div className="grid gap-5 md:grid-cols-2">
      <input type="hidden" name="id" value={service?.id ?? ""} />
      <div className="flex flex-col gap-2">
        <Label htmlFor={`service-title-${key}`}>Judul layanan *</Label>
        <Input
          id={`service-title-${key}`}
          name="title"
          required
          defaultValue={service?.title ?? ""}
          className="h-11"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor={`service-order-${key}`}>Urutan tampil</Label>
        <Input
          id={`service-order-${key}`}
          name="sort_order"
          type="number"
          min="0"
          defaultValue={service?.sortOrder ?? 0}
          className="h-11"
        />
      </div>
      <div className="flex flex-col gap-2 md:col-span-2">
        <Label htmlFor={`service-description-${key}`}>Deskripsi *</Label>
        <Textarea
          id={`service-description-${key}`}
          name="description"
          required
          defaultValue={service?.description ?? ""}
        />
      </div>
      <VisibleField defaultChecked={service?.visible ?? true} />
    </div>
  )
}

function FaqFields({ faq }: { faq?: PortfolioFaq }) {
  const key = faq?.id ?? "new"

  return (
    <div className="grid gap-5 md:grid-cols-2">
      <input type="hidden" name="id" value={faq?.id ?? ""} />
      <div className="flex flex-col gap-2 md:col-span-2">
        <Label htmlFor={`faq-question-${key}`}>Pertanyaan *</Label>
        <Input
          id={`faq-question-${key}`}
          name="question"
          required
          defaultValue={faq?.question ?? ""}
          className="h-11"
        />
      </div>
      <div className="flex flex-col gap-2 md:col-span-2">
        <Label htmlFor={`faq-answer-${key}`}>Jawaban *</Label>
        <Textarea
          id={`faq-answer-${key}`}
          name="answer"
          required
          defaultValue={faq?.answer ?? ""}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor={`faq-order-${key}`}>Urutan tampil</Label>
        <Input
          id={`faq-order-${key}`}
          name="sort_order"
          type="number"
          min="0"
          defaultValue={faq?.sortOrder ?? 0}
          className="h-11"
        />
      </div>
      <VisibleField defaultChecked={faq?.visible ?? true} />
    </div>
  )
}

function TimelineFields({ entry }: { entry?: PortfolioTimelineEntry }) {
  const key = entry?.id ?? "new"

  return (
    <div className="grid gap-5 md:grid-cols-2">
      <input type="hidden" name="id" value={entry?.id ?? ""} />
      <div className="flex flex-col gap-2">
        <Label htmlFor={`timeline-title-${key}`}>Judul *</Label>
        <Input
          id={`timeline-title-${key}`}
          name="title"
          required
          defaultValue={entry?.title ?? ""}
          className="h-11"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor={`timeline-organization-${key}`}>Organisasi</Label>
        <Input
          id={`timeline-organization-${key}`}
          name="organization"
          defaultValue={entry?.organization ?? ""}
          className="h-11"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor={`timeline-type-${key}`}>Tipe</Label>
        <select
          id={`timeline-type-${key}`}
          name="entry_type"
          defaultValue={entry?.entryType ?? "experience"}
          className="h-11 rounded-lg border border-input bg-transparent px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <option value="experience">Pengalaman</option>
          <option value="education">Pendidikan</option>
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor={`timeline-order-${key}`}>Urutan tampil</Label>
        <Input
          id={`timeline-order-${key}`}
          name="sort_order"
          type="number"
          min="0"
          defaultValue={entry?.sortOrder ?? 0}
          className="h-11"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor={`timeline-start-${key}`}>Tanggal mulai</Label>
        <Input
          id={`timeline-start-${key}`}
          name="start_date"
          type="date"
          defaultValue={entry?.startDate ?? ""}
          className="h-11"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor={`timeline-end-${key}`}>Tanggal selesai</Label>
        <Input
          id={`timeline-end-${key}`}
          name="end_date"
          type="date"
          defaultValue={entry?.endDate ?? ""}
          className="h-11"
        />
      </div>
      <div className="flex flex-col gap-2 md:col-span-2">
        <Label htmlFor={`timeline-description-${key}`}>Deskripsi</Label>
        <Textarea
          id={`timeline-description-${key}`}
          name="description"
          defaultValue={entry?.description ?? ""}
        />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <VisibleField defaultChecked={entry?.visible ?? true} />
        <label className="flex-center min-h-11 gap-3 rounded-lg border border-border bg-muted/40 px-3 text-sm font-medium">
          <input
            type="checkbox"
            name="is_current"
            defaultChecked={entry?.isCurrent ?? false}
            className="size-4 accent-blue-600"
          />
          Masih berlangsung
        </label>
      </div>
    </div>
  )
}

function CollectionCard({
  children,
  title,
}: {
  children: React.ReactNode
  title: string
}) {
  return (
    <Card className="border border-border py-0 shadow-none">
      <CardHeader className="border-b border-border px-5 py-5 sm:px-6">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="px-5 py-5 sm:px-6 sm:py-6">
        {children}
      </CardContent>
    </Card>
  )
}

export function CollectionsEditor({
  collection,
  media,
  faqs,
  services,
  skills,
  timeline,
}: {
  collection: ContentCollectionKey
  media: PortfolioMediaAsset[]
  faqs: PortfolioFaq[]
  services: PortfolioService[]
  skills: PortfolioSkill[]
  timeline: PortfolioTimelineEntry[]
}) {
  return (
    <div className="mt-8 space-y-12">
      {collection === "skills" ? (
        <Section
          title="Skills"
          description="Kelola skill yang muncul pada section Skills di homepage."
        >
          <div className="space-y-4">
            <CollectionCard title="Tambah skill">
              <AdminForm
                action={saveSkill}
                resetOnSuccess
                submitLabel="Tambah skill"
              >
                <SkillFields media={media} />
              </AdminForm>
            </CollectionCard>
            {skills.map((skill) => (
              <CollectionCard key={skill.id} title={skill.name}>
                <AdminForm action={saveSkill} submitLabel="Simpan skill">
                  <SkillFields skill={skill} media={media} />
                  <DeleteButton label="Hapus skill" />
                </AdminForm>
              </CollectionCard>
            ))}
          </div>
        </Section>
      ) : null}

      {collection === "services" ? (
        <Section
          title="Layanan"
          description="Layanan yang ditampilkan pada halaman About, sesuai urutan yang ditentukan."
        >
          <div className="space-y-4">
            <CollectionCard title="Tambah layanan">
              <AdminForm
                action={saveService}
                resetOnSuccess
                submitLabel="Tambah layanan"
              >
                <ServiceFields />
              </AdminForm>
            </CollectionCard>
            {services.map((service) => (
              <CollectionCard key={service.id} title={service.title}>
                <AdminForm action={saveService} submitLabel="Simpan layanan">
                  <ServiceFields service={service} />
                  <DeleteButton label="Hapus layanan" />
                </AdminForm>
              </CollectionCard>
            ))}
          </div>
        </Section>
      ) : null}

      {collection === "faqs" ? (
        <Section
          title="FAQ"
          description="Pertanyaan yang visible akan ditampilkan di homepage."
        >
          <div className="space-y-4">
            <CollectionCard title="Tambah FAQ">
              <AdminForm
                action={saveFaq}
                resetOnSuccess
                submitLabel="Tambah FAQ"
              >
                <FaqFields />
              </AdminForm>
            </CollectionCard>
            {faqs.map((faq) => (
              <CollectionCard key={faq.id} title={faq.question}>
                <AdminForm action={saveFaq} submitLabel="Simpan FAQ">
                  <FaqFields faq={faq} />
                  <DeleteButton label="Hapus FAQ" />
                </AdminForm>
              </CollectionCard>
            ))}
          </div>
        </Section>
      ) : null}

      {collection === "timeline" ? (
        <Section
          title="Riwayat"
          description="Pendidikan dan pengalaman ditampilkan lengkap pada halaman About. Matikan visibilitas untuk menyembunyikan riwayat."
        >
          <div className="space-y-4">
            <CollectionCard title="Tambah riwayat">
              <AdminForm
                action={saveTimelineEntry}
                resetOnSuccess
                submitLabel="Tambah riwayat"
              >
                <TimelineFields />
              </AdminForm>
            </CollectionCard>
            {timeline.map((entry) => (
              <CollectionCard key={entry.id} title={entry.title}>
                <AdminForm
                  action={saveTimelineEntry}
                  submitLabel="Simpan riwayat"
                >
                  <TimelineFields entry={entry} />
                  <DeleteButton label="Hapus riwayat" />
                </AdminForm>
              </CollectionCard>
            ))}
          </div>
        </Section>
      ) : null}
    </div>
  )
}
