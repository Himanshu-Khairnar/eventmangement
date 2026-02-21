import { bucket } from "@/lib/firebaseAdmin";

export async function uploadResume(
  buffer: Buffer,
  path: string,
  contentType: string
) {
  const file = bucket.file(path);

  await file.save(buffer, {
    metadata: { contentType },
  });

  await file.makePublic();

  return `https://storage.googleapis.com/${bucket.name}/${path}`;
}