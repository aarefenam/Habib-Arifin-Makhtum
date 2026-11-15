import { saveSiteContent } from "@/actions/admin-cms"
import { AdminForm } from "@/components/private/admin/admin-form"
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
import type { HomePageContent, PortfolioSiteSettings } from "@/types/cms"

function Field({
  hint,
  label,
  name,
  type = "text",
  value,
}: {
  hint?: string
  label: string
  name: string
  type?: "email" | "tel" | "text" | "url"
  value: string | null
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} type={type} defaultValue={value ?? ""} />
      {hint ? (
        <p className="text-xs leading-5 text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  )
}

function LongField({
  hint,
  label,
  name,
  value,
}: {
  hint?: string
  label: string
  name: string
  value: string
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={name}>{label}</Label>
      <Textarea
        id={name}
        name={name}
        defaultValue={value}
        className="min-h-24"
      />
      {hint ? (
        <p className="text-xs leading-5 text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  )
}

function EditorSection({
  children,
  description,
  title,
}: {
  children: React.ReactNode
  description: string
  title: string
}) {
  return (
    <Card className="border border-border py-0 shadow-none">
      <CardHeader className="border-b border-border px-5 py-5 sm:px-6">
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription className="mt-1 leading-6">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-5 px-5 py-5 sm:grid-cols-2 sm:px-6 sm:py-6">
        {children}
      </CardContent>
    </Card>
  )
}

export function SiteContentEditor({
  content,
  site,
}: {
  content: HomePageContent
  site: PortfolioSiteSettings
}) {
  const buildItems = content.hero.buildItems
    .map((item) => `${item.label} | ${item.icon}`)
    .join("\n")

  return (
    <AdminForm action={saveSiteContent} className="mt-8 space-y-6">
      <EditorSection
        title="Identitas & kontak"
        description="Data ini dipakai untuk profil, kontak, metadata, dan footer website. Field bertanda wajib tidak boleh kosong."
      >
        <Field label="Nama lengkap *" name="site_name" value={site.name} />
        <Field label="Nama pendek *" name="short_name" value={site.shortName} />
        <Field label="Handle *" name="handle" value={site.handle} />
        <Field label="Role utama *" name="role" value={site.role} />
        <Field
          label="Peran bisnis"
          name="business_role"
          value={site.businessRole}
        />
        <Field label="Email *" name="email" type="email" value={site.email} />
        <Field
          label="Nomor telepon"
          name="phone"
          type="tel"
          value={site.phone}
        />
        <Field
          label="URL WhatsApp"
          name="whatsapp_url"
          type="url"
          value={site.whatsappUrl}
        />
        <Field label="Domisili" name="location" value={site.location} />
        <Field label="Asal" name="origin" value={site.origin} />
        <LongField label="Bio singkat" name="bio" value={site.bio} />
        <Field
          label="Storage key foto profil"
          name="profile_image_key"
          value={site.profileImageKey}
          hint="Unggah gambar melalui Media library, lalu salin storage key aset ke field ini."
        />
      </EditorSection>

      <EditorSection
        title="Sosial media & SEO"
        description="Gunakan URL lengkap. Perubahan SEO akan diperbarui pada metadata website setelah disimpan."
      >
        <Field
          label="URL GitHub"
          name="github_url"
          type="url"
          value={site.socialLinks.github ?? ""}
        />
        <Field
          label="URL LinkedIn"
          name="linkedin_url"
          type="url"
          value={site.socialLinks.linkedin ?? ""}
        />
        <Field
          label="URL Instagram"
          name="instagram_url"
          type="url"
          value={site.socialLinks.instagram ?? ""}
        />
        <Field label="SEO title" name="seo_title" value={site.seoTitle} />
        <LongField
          label="SEO description"
          name="seo_description"
          value={site.seoDescription}
        />
      </EditorSection>

      <EditorSection
        title="Hero"
        description="Konten bagian pertama yang pengunjung lihat di homepage. Pisahkan chip dengan koma dan satu build item per baris."
      >
        <Field
          label="Role badge"
          name="hero_badge_role"
          value={content.hero.badgeRole}
        />
        <Field
          label="Status ketersediaan"
          name="hero_availability"
          value={content.hero.availability}
        />
        <Field
          label="Judul utama"
          name="hero_title"
          value={content.hero.title}
        />
        <Field
          label="Aksen judul"
          name="hero_title_accent"
          value={content.hero.titleAccent}
        />
        <LongField label="Lead" name="hero_lead" value={content.hero.lead} />
        <LongField
          label="Detail"
          name="hero_detail"
          value={content.hero.detail}
        />
        <Field
          label="Label CTA kedua"
          name="hero_secondary_cta"
          value={content.hero.secondaryCtaLabel}
        />
        <Field
          label="Chip keahlian"
          name="hero_chips"
          value={content.hero.chips.join(", ")}
          hint="Contoh: Web Apps, ERP, API Integration"
        />
        <LongField
          label="Daftar yang dibangun"
          name="hero_build_items"
          value={buildItems}
          hint="Satu item per baris dengan format: Nama | icon. Pilihan icon: globe, shield, briefcase, store, smartphone, graduation, calendar."
        />
      </EditorSection>

      <EditorSection
        title="Tentang"
        description="Seluruh teks pada section About di homepage dapat dikelola dari sini."
      >
        <Field
          label="Judul baris pertama"
          name="about_title_black"
          value={content.about.titleBlack}
        />
        <Field
          label="Judul aksen"
          name="about_title_gray"
          value={content.about.titleGray}
        />
        <LongField
          label="Catatan samping"
          name="about_side_note"
          value={content.about.sideNote}
        />
        <Field
          label="Badge profil"
          name="about_who_badge"
          value={content.about.whoBadge}
        />
        <Field
          label="Judul profil"
          name="about_who_heading"
          value={content.about.whoHeading}
        />
        <LongField
          label="Deskripsi profil"
          name="about_who_body"
          value={content.about.whoBody}
        />
        <Field
          label="Badge fokus"
          name="about_experience_badge"
          value={content.about.experienceBadge}
        />
        <Field
          label="Nilai fokus"
          name="about_experience_value"
          value={content.about.experienceValue}
        />
        <Field
          label="Teks fokus"
          name="about_experience_text"
          value={content.about.experienceText}
        />
        <Field
          label="Teks fokus sekunder"
          name="about_experience_muted"
          value={content.about.experienceMuted}
        />
        <Field
          label="Badge peran"
          name="about_work_badge"
          value={content.about.workBadge}
        />
        <Field
          label="Judul peran"
          name="about_work_heading"
          value={content.about.workHeading}
        />
        <LongField
          label="Deskripsi peran"
          name="about_work_body"
          value={content.about.workBody}
        />
        <Field
          label="Badge saat ini"
          name="about_now_badge"
          value={content.about.nowBadge}
        />
        <Field
          label="Judul saat ini"
          name="about_now_heading"
          value={content.about.nowHeading}
        />
        <LongField
          label="Deskripsi saat ini"
          name="about_now_body"
          value={content.about.nowBody}
        />
      </EditorSection>

      <EditorSection
        title="Skills & projects"
        description="Judul dan deskripsi section. Data item skill serta project dikelola dari menu koleksi dan Projects."
      >
        <Field
          label="Badge skill"
          name="skills_badge"
          value={content.skills.badge}
        />
        <Field
          label="Judul skill"
          name="skills_title_black"
          value={content.skills.titleBlack}
        />
        <Field
          label="Aksen judul skill"
          name="skills_title_gray"
          value={content.skills.titleGray}
        />
        <LongField
          label="Catatan skill"
          name="skills_side_note"
          value={content.skills.sideNote}
        />
        <Field
          label="Judul Core skills"
          name="skills_core_title"
          value={content.skills.coreTitle}
        />
        <LongField
          label="Deskripsi Core skills"
          name="skills_core_description"
          value={content.skills.coreDescription}
        />
        <Field
          label="Judul Toolkit"
          name="skills_toolkit_title"
          value={content.skills.toolkitTitle}
        />
        <LongField
          label="Deskripsi Toolkit"
          name="skills_toolkit_description"
          value={content.skills.toolkitDescription}
        />
        <Field
          label="Judul Additional"
          name="skills_additional_title"
          value={content.skills.additionalTitle}
        />
        <LongField
          label="Deskripsi Additional"
          name="skills_additional_description"
          value={content.skills.additionalDescription}
        />
        <Field
          label="Badge project"
          name="projects_header_badge"
          value={content.projects.headerBadge}
        />
        <Field
          label="Judul project"
          name="projects_header_title_black"
          value={content.projects.headerTitleBlack}
        />
        <Field
          label="Aksen judul project"
          name="projects_header_title_gray"
          value={content.projects.headerTitleGray}
        />
        <LongField
          label="Catatan project"
          name="projects_header_side_note"
          value={content.projects.headerSideNote}
        />
        <Field
          label="Judul empty project"
          name="projects_empty_title"
          value={content.projects.emptyTitle}
        />
        <LongField
          label="Deskripsi empty project"
          name="projects_empty_description"
          value={content.projects.emptyDescription}
        />
      </EditorSection>

      <EditorSection
        title="FAQ & contact"
        description="Header FAQ, header contact, serta CTA pada kartu pesan. Isi daftar FAQ dikelola dari menu Content."
      >
        <Field label="Badge FAQ" name="faq_badge" value={content.faq.badge} />
        <Field
          label="Judul FAQ"
          name="faq_title_black"
          value={content.faq.titleBlack}
        />
        <Field
          label="Aksen judul FAQ"
          name="faq_title_gray"
          value={content.faq.titleGray}
        />
        <LongField
          label="Catatan FAQ"
          name="faq_side_note"
          value={content.faq.sideNote}
        />
        <Field
          label="Badge contact"
          name="contact_header_badge"
          value={content.contact.headerBadge}
        />
        <Field
          label="Judul contact"
          name="contact_header_title_black"
          value={content.contact.headerTitleBlack}
        />
        <Field
          label="Aksen judul contact"
          name="contact_header_title_gray"
          value={content.contact.headerTitleGray}
        />
        <LongField
          label="Catatan contact"
          name="contact_header_side_note"
          value={content.contact.headerSideNote}
        />
        <Field
          label="Eyebrow kartu"
          name="contact_eyebrow"
          value={content.contact.eyebrow}
        />
        <Field
          label="Judul kartu"
          name="contact_card_heading"
          value={content.contact.cardHeading}
        />
        <Field
          label="Aksen kartu"
          name="contact_card_heading_accent"
          value={content.contact.cardHeadingAccent}
        />
        <LongField
          label="Deskripsi kartu"
          name="contact_card_sub"
          value={content.contact.cardSub}
        />
        <Field
          label="Label CTA"
          name="contact_cta_label"
          value={content.contact.ctaLabel}
        />
        <Field
          label="Kata latar kartu"
          name="contact_giant_word"
          value={content.contact.giantWord}
        />
      </EditorSection>
    </AdminForm>
  )
}
