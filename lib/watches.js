import { cache } from "react";
import { connectDB } from "./mongodb";
import Watch from "@/models/Watch";

const FALLBACK_CATEGORY = "everyday";

export function watchToProduct(doc) {
  const id = String(doc._id);
  const imageUrls =
    Array.isArray(doc.images) && doc.images.length
      ? doc.images.map((image) => image.url)
      : [doc.imageUrl];
  return {
    id,
    name: doc.title,
    reference: doc.reference || `AUR-${id.slice(-4).toUpperCase()}`,
    category: doc.category || FALLBACK_CATEGORY,
    movement: doc.movement || "Quartz",
    price: doc.price,
    originalPrice:
      Number.isFinite(doc.originalPrice) && doc.originalPrice > doc.price
        ? doc.originalPrice
        : null,
    image: imageUrls[0],
    images: imageUrls,
    dial: doc.dial || "Signature",
    caseSize: doc.caseSize || "One size",
    caseMaterial: doc.caseMaterial || "Stainless steel",
    waterResistance: doc.waterResistance || "3 ATM",
    straps:
      Array.isArray(doc.straps) && doc.straps.length
        ? doc.straps
        : ["Standard"],
    stock: Number.isInteger(doc.stock) ? doc.stock : 1,
    badge: doc.badge || "New arrival",
    description: doc.description,
    video: doc.videoUrl
      ? { url: doc.videoUrl, type: doc.videoType === "video" ? "video" : "gif" }
      : null,
  };
}

export const getStoreWatches = cache(async () => {
  try {
    await connectDB();
    const docs = await Watch.find().sort({ createdAt: -1 }).lean();
    return docs.map(watchToProduct);
  } catch (error) {
    console.error("Could not load watches from the database:", error);
    return [];
  }
});

export const getCatalog = cache(async () => [...(await getStoreWatches())]);
