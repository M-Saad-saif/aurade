import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/adminAuth";
import { connectDB } from "@/lib/mongodb";
import { deleteImage, deleteMedia } from "@/lib/cloudinary";
import Watch from "@/models/Watch";

export const runtime = "nodejs";

export async function DELETE(_request, { params }) {
  if (!(await isAdmin()))
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const { id } = await params;
  if (!mongoose.isValidObjectId(id))
    return NextResponse.json({ error: "Invalid id." }, { status: 400 });

  try {
    await connectDB();
    const watch = await Watch.findByIdAndDelete(id);
    if (!watch)
      return NextResponse.json({ error: "Watch not found." }, { status: 404 });
    const publicIds = watch.images?.length
      ? watch.images.map((image) => image.publicId)
      : [watch.imagePublicId];
    await Promise.all(
      publicIds.map((publicId) =>
        deleteImage(publicId).catch((error) =>
          console.error("Cloudinary delete failed:", error),
        ),
      ),
    );
    if (watch.videoPublicId) {
      await deleteMedia(
        watch.videoPublicId,
        watch.videoType === "video" ? "video" : "image",
      ).catch((error) => console.error("Cloudinary clip delete failed:", error));
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Delete watch failed:", error);
    return NextResponse.json(
      { error: "Could not delete the watch." },
      { status: 500 },
    );
  }
}
