import "server-only"

import { S3Client } from "@aws-sdk/client-s3"

import { getR2Env } from "@/lib/env"

export function getR2Client() {
  const env = getR2Env()

  return new S3Client({
    credentials: {
      accessKeyId: env.R2_ACCESS_KEY_ID,
      secretAccessKey: env.R2_SECRET_ACCESS_KEY,
    },
    endpoint: `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    region: "auto",
  })
}

export function getR2BucketName() {
  return getR2Env().R2_BUCKET
}

export function getR2PublicUrl(objectKey: string) {
  const baseUrl = getR2Env().R2_PUBLIC_URL.replace(/\/$/, "")
  return `${baseUrl}/${objectKey}`
}
