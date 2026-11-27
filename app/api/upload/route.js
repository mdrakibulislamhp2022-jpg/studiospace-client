import { headers } from "next/headers";
import { auth } from "../../../lib/auth";

export async function POST(request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return Response.json({ message: "Please log in to upload images." }, { status: 401 });
  }

  const key = process.env.IMGBB_API_KEY;
  if (!key) {
    return Response.json({ message: "Image upload is not configured." }, { status: 500 });
  }

  let file;
  try {
    const form = await request.formData();
    file = form.get("image");
  } catch {
    return Response.json({ message: "Invalid upload request." }, { status: 400 });
  }

  if (!file || typeof file === "string") {
    return Response.json({ message: "No image was provided." }, { status: 400 });
  }
  if (!file.type || !file.type.startsWith("image/")) {
    return Response.json({ message: "Only image files are allowed." }, { status: 400 });
  }
  if (file.size > 5 * 1024 * 1024) {
    return Response.json({ message: "Image must be 5 MB or smaller." }, { status: 400 });
  }

  const body = new FormData();
  body.append("image", file);

  try {
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, {
      method: "POST",
      body,
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      return Response.json({ message: "Image host rejected the upload." }, { status: 502 });
    }
    return Response.json({ url: data.data.display_url });
  } catch {
    return Response.json({ message: "Could not reach the image host." }, { status: 502 });
  }
}