import { updateMessageStatus } from "@/actions/admin-cms"
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
import type { PortfolioContactMessage } from "@/types/cms"

export function InboxEditor({
  messages,
}: {
  messages: PortfolioContactMessage[]
}) {
  return (
    <div className="mt-8 space-y-4">
      {messages.length ? (
        messages.map((message) => (
          <Card
            key={message.id}
            className="border border-border py-0 shadow-none"
          >
            <CardHeader className="border-b border-border px-5 py-5 sm:px-6">
              <CardTitle className="text-lg">{message.senderName}</CardTitle>
              <CardDescription className="mt-1">
                {message.senderEmail}
              </CardDescription>
            </CardHeader>
            <CardContent className="px-5 py-5 sm:px-6 sm:py-6">
              <AdminForm
                action={updateMessageStatus}
                submitLabel="Simpan status"
              >
                <input type="hidden" name="id" value={message.id} />
                <div className="grid gap-5 md:grid-cols-2">
                  <div className="flex flex-col gap-2 md:col-span-2">
                    <Label htmlFor={`message-${message.id}`}>Pesan</Label>
                    <Textarea
                      id={`message-${message.id}`}
                      value={message.message}
                      readOnly
                      className="min-h-28 resize-none bg-muted/40"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor={`message-status-${message.id}`}>
                      Status
                    </Label>
                    <select
                      id={`message-status-${message.id}`}
                      name="status"
                      defaultValue={message.status}
                      className="h-11 rounded-lg border border-input bg-transparent px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                    >
                      <option value="unread">Belum dibaca</option>
                      <option value="read">Sudah dibaca</option>
                      <option value="archived">Arsip</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor={`message-date-${message.id}`}>
                      Diterima
                    </Label>
                    <Input
                      id={`message-date-${message.id}`}
                      value={
                        message.createdAt
                          ? new Intl.DateTimeFormat("id-ID", {
                              dateStyle: "medium",
                              timeStyle: "short",
                            }).format(new Date(message.createdAt))
                          : "-"
                      }
                      readOnly
                      className="h-11 bg-muted/40"
                    />
                  </div>
                  <div className="flex flex-col gap-2 md:col-span-2">
                    <Label htmlFor={`message-note-${message.id}`}>
                      Catatan internal
                    </Label>
                    <Textarea
                      id={`message-note-${message.id}`}
                      name="internal_note"
                      defaultValue={message.internalNote ?? ""}
                      placeholder="Tidak terlihat oleh pengirim."
                    />
                  </div>
                </div>
              </AdminForm>
            </CardContent>
          </Card>
        ))
      ) : (
        <Card className="border border-dashed border-border py-0 shadow-none">
          <CardContent className="px-5 py-12 text-center text-sm text-muted-foreground sm:px-6">
            Belum ada pesan dari formulir kontak.
          </CardContent>
        </Card>
      )}
    </div>
  )
}
