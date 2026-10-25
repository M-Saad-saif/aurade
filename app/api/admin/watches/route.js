import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdmin } from "@/lib/adminAuth";
import { connectDB } from "@/lib/mongodb";
import { deleteMedia, uploadImage, uploadVideo } from "@/lib/cloudinary";
import Watch, { WATCH_CATEGORIES } from "@/models/Watch";

export const runtime = "nodejs";

const MAX_IMAGE_BYTES = 4 * 1024 * 1024;
const MAX_IMAGES = 3;
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_VIDEO_BYTES = 25 * 1024 * 1024;
const VIDEO_TYPES = ["video/mp4", "video/webm", "video/quicktime", "video/ogg"];
const GIF_TYPE = "image/gif";

const fail = (error, status = 400) => NextResponse.json({ error }, { status });
const clean = (value, max) =>
  String(value ?? "")
    .trim()
    .slice(0, max);
const MAX_STOCK = 100000;

export async function POST(request) {
  if (!(await isAdmin())) return fail("Unauthorized.", 401);

  const form = await request.formData();
  const title = String(form.get("title") || "").trim();
  const description = String(form.get("description") || "").trim();
  const category = String(form.get("category") || "").trim();
  const pricePkr = Number(form.get("price"));

  const originalPriceRaw = String(form.get("originalPrice") ?? "")
    .replace(/[ ,]/g, "")
    .trim();
  const originalPricePkr = originalPriceRaw ? Number(originalPriceRaw) : null;

  const files = form
    .getAll("images")
    .filter((entry) => entry && typeof entry !== "string" && entry.size > 0);
    
  const rawVideo = form.get("video");
  const videoFile =
    rawVideo && typeof rawVideo !== "string" && rawVideo.size > 0
      ? rawVideo
      : null;

  const movement = clean(form.get("movement"), 60) || "Quartz";
  const caseSize = clean(form.get("caseSize"), 40) || "One size";
  const dial = clean(form.get("dial"), 40) || "Signature";
  const caseMaterial = clean(form.get("caseMaterial"), 60) || "Stainless steel";
  const waterResistance = clean(form.get("waterResistance"), 40) || "3 ATM";
  const badge = clean(form.get("badge"), 40) || "New arrival";
  const straps = String(form.get("straps") || "")
    .split(",")
    .map((item) => item.trim().slice(0, 40))
    .filter(Boolean)
    .slice(0, 10);
  const stock = Number(form.get("stock"));

  if (!title || title.length > 120)
    return fail("Title is required (max 120 characters).");

  if (!description || description.length > 2000)
    return fail("Description is required (max 2000 characters).");

  if (!WATCH_CATEGORIES.includes(category))
    return fail("Choose a valid collection.");

  if (!Number.isFinite(pricePkr) || pricePkr < 0.01 || pricePkr > 278_000_000)
    return fail("Enter a valid price.");

  if (
    originalPricePkr !== null &&
    (!Number.isFinite(originalPricePkr) ||
      originalPricePkr < 0.01 ||
      originalPricePkr > 278_000_000)
  )
    return fail("Enter a valid original price.");

  if (originalPricePkr !== null && originalPricePkr <= pricePkr)
    return fail("Original price must be higher than the price.");

  if (!Number.isInteger(stock) || stock < 0 || stock > MAX_STOCK)
    return fail("Enter a valid stock quantity (0 or more).");

  if (files.length === 0) return fail("Please choose at least one image.");

  if (files.length > MAX_IMAGES)
    return fail(`Upload up to ${MAX_IMAGES} images.`);

  for (const file of files) {
    if (!ALLOWED_IMAGE_TYPES.includes(file.type))
      return fail("Images must be JPG, PNG or WebP.");
    if (file.size > MAX_IMAGE_BYTES)
      return fail("Each image must be 4 MB or smaller.");
  }

  let videoKind = null;
  if (videoFile) {
    if (videoFile.type === GIF_TYPE) videoKind = "gif";
    else if (VIDEO_TYPES.includes(videoFile.type)) videoKind = "video";
    else return fail("Clip must be an MP4, WebM, MOV, OGG or GIF.");
    if (videoFile.size > MAX_VIDEO_BYTES)
      return fail("Clip must be 25 MB or smaller.");
  }

  const uploaded = [];
  try {
    const images = [];
    for (const file of files) {
      const result = await uploadImage(Buffer.from(await file.arrayBuffer()));
      uploaded.push({ publicId: result.public_id, resourceType: "image" });
      images.push({ url: result.secure_url, publicId: result.public_id });
    }

    let video = null;
    if (videoFile) {
      const buffer = Buffer.from(await videoFile.arrayBuffer());
      const result =
        videoKind === "gif"
          ? await uploadImage(buffer)
          : await uploadVideo(buffer);
      uploaded.push({
        publicId: result.public_id,
        resourceType: videoKind === "gif" ? "image" : "video",
      });
      video = {
        url: result.secure_url,
        publicId: result.public_id,
        type: videoKind,
      };
    }

    await connectDB();
    const watch = await Watch.create({
      title,
      description,
      category,
      movement,
      caseSize,
      dial,
      caseMaterial,
      waterResistance,
      straps: straps.length ? straps : ["Standard"],
      stock,
      badge,
      price: pricePkr,
      originalPrice:
        originalPricePkr === null
          ? undefined
          : originalPricePkr,
      images,
      imageUrl: images[0].url,
      imagePublicId: images[0].publicId,
      videoUrl: video?.url,
      videoPublicId: video?.publicId,
      videoType: video?.type,
    });
    const priceUpdate = {
      priceUnit: "PKR",
      ...(originalPricePkr === null
        ? {}
        : { originalPrice: originalPricePkr }),
    };
    await Watch.collection.updateOne(
      { _id: watch._id },
      { $set: priceUpdate },
    );
    const savedPrices = await Watch.collection.findOne(
      { _id: watch._id },
      { projection: { price: 1, originalPrice: 1 } },
    );
    revalidatePath("/");
    revalidatePath("/shop");
    return NextResponse.json(
      {
        ok: true,
        id: String(watch._id),
        price: savedPrices?.price ?? null,
        originalPrice: savedPrices?.originalPrice ?? null,
      },
      { status: 201 },
    );
  } catch (error) {
    await Promise.all(
      uploaded.map((asset) =>
        deleteMedia(asset.publicId, asset.resourceType).catch(() => {}),
      ),
    );
    return fail("Could not save the watch. Please try again.", 500);
  }
}
