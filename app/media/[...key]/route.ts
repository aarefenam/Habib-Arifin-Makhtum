import { isR2Configured } from "@/lib/env"
import { getR2Object } from "@/lib/r2"

// Serve R2 images from our own domain, since *.r2.dev is blocked by some ISPs.
// Keys are random UUIDs, so the response can be cached forever.
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ key: string[] }> }
) {
  if (!isR2Configured()) {
    return new Response("Storage not configured", { status: 503 })
  }

  const { key } = await params
  const objectKey = key.join("/")

  try {
    const object = await getR2Object(objectKey)
    if (!object.Body) return new Response("Not found", { status: 404 })

    const headers = new Headers({
      "Cache-Control": "public, max-age=31536000, s-maxage=31536000, immutable",
      "Content-Type": object.ContentType ?? "application/octet-stream",
    })
    if (object.ContentLength) {
      headers.set("Content-Length", String(object.ContentLength))
    }
    if (object.ETag) headers.set("ETag", object.ETag)

    return new Response(object.Body.transformToWebStream(), { headers })
  } catch (error) {
    const name = (error as { name?: string }).name
    if (name === "NoSuchKey" || name === "NotFound") {
      return new Response("Not found", { status: 404 })
    }
    return new Response("Failed to load image", { status: 502 })
  }
}
