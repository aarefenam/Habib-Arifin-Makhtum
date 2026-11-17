import { saveTestimonial } from "@/actions/admin-cms"
import { AdminForm } from "@/components/private/admin/admin-form"
import { StarRating } from "@/components/shared/star-rating"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import type { PortfolioTestimonial } from "@/types/cms"

function formatDate(value: string) {
  return value
    ? new Intl.DateTimeFormat("id-ID", { dateStyle: "medium" }).format(
        new Date(value)
      )
    : "-"
}

export function TestimonialsEditor({
  testimonials,
  shareUrl,
}: {
  testimonials: PortfolioTestimonial[]
  shareUrl: string
}) {
  return (
    <div className="mt-8 space-y-6">
      {/* ===== Share link ===== */}
      <Card className="border border-border py-0 shadow-none">
        <CardHeader className="px-5 py-5 sm:px-6">
          <CardTitle className="text-lg">Link untuk client</CardTitle>
          <CardDescription className="mt-1 leading-6">
            Kirim link ini ke client setelah project selesai. Halaman ini tidak
            muncul di Google.
          </CardDescription>
          <Input
            aria-label="Link rating"
            value={shareUrl}
            readOnly
            className="mt-3 h-11 bg-muted/40 font-mono text-sm"
          />
        </CardHeader>
      </Card>

      {/* ===== Ratings list ===== */}
      {testimonials.length ? (
        testimonials.map((item) => (
          <Card key={item.id} className="border border-border py-0 shadow-none">
            <CardHeader className="border-b border-border px-5 py-5 sm:px-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
                <div>
                  <CardTitle className="text-lg">{item.clientName}</CardTitle>
                  <CardDescription className="mt-1">
                    {[item.clientRole, item.projectName]
                      .filter(Boolean)
                      .join(" · ") || "-"}
                  </CardDescription>
                </div>
                <div className="flex flex-col gap-1 sm:items-end">
                  <StarRating rating={item.rating} />
                  <span
                    className={cn(
                      "text-xs font-medium",
                      item.visible ? "text-green-600" : "text-amber-600"
                    )}
                  >
                    {item.visible ? "Tampil di website" : "Menunggu review"} ·{" "}
                    {formatDate(item.createdAt)}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-5 py-5 sm:px-6 sm:py-6">
              <p className="leading-7 whitespace-pre-wrap text-muted-foreground">
                {item.message}
              </p>
              <AdminForm
                action={saveTestimonial}
                submitLabel="Simpan"
                className="mt-5"
              >
                <input type="hidden" name="id" value={item.id} />
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="flex-center min-h-11 gap-3 rounded-lg border border-border bg-muted/40 px-3 text-sm font-medium">
                    <input
                      type="checkbox"
                      name="visible"
                      defaultChecked={item.visible}
                      className="size-4 accent-blue-600"
                    />
                    Tampilkan di website
                  </label>
                  <div className="flex-center gap-3">
                    <Label htmlFor={`testimonial-order-${item.id}`}>
                      Urutan
                    </Label>
                    <Input
                      id={`testimonial-order-${item.id}`}
                      name="sort_order"
                      type="number"
                      min="0"
                      defaultValue={item.sortOrder}
                      className="h-11"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  name="intent"
                  value="delete"
                  formNoValidate
                  className="mt-5 min-h-11 cursor-pointer rounded-lg border border-destructive/30 px-4 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
                >
                  Hapus testimoni
                </button>
              </AdminForm>
            </CardContent>
          </Card>
        ))
      ) : (
        <Card className="border border-dashed border-border py-0 shadow-none">
          <CardContent className="px-5 py-12 text-center text-sm text-muted-foreground sm:px-6">
            Belum ada rating. Bagikan link di atas ke client kamu.
          </CardContent>
        </Card>
      )}
    </div>
  )
}
