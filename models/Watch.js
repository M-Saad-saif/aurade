import mongoose from "mongoose";

export const WATCH_CATEGORIES = ["dress", "sport", "everyday", "automatic"];

const WatchImageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
  },
  { _id: false },
);

const WatchSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 120 },
    description: { type: String, required: true, trim: true, maxlength: 2000 },
    price: { type: Number, required: true, min: 0.01 },
    originalPrice: { type: Number, min: 0.01 },
    priceUnit: { type: String, enum: ["PKR"], default: "PKR" },
    category: { type: String, enum: WATCH_CATEGORIES, default: "everyday" },
    movement: { type: String, trim: true, maxlength: 60, default: "Quartz" },
    caseSize: { type: String, trim: true, maxlength: 40, default: "One size" },
    dial: { type: String, trim: true, maxlength: 40, default: "Signature" },
    caseMaterial: {
      type: String,
      trim: true,
      maxlength: 60,
      default: "Stainless steel",
    },
    waterResistance: {
      type: String,
      trim: true,
      maxlength: 40,
      default: "3 ATM",
    },
    straps: { type: [String], default: ["Standard"] },
    stock: { type: Number, min: 0, default: 1 },
    badge: { type: String, trim: true, maxlength: 40, default: "New arrival" },
    images: { type: [WatchImageSchema], default: [] },
    imageUrl: { type: String, required: true },
    imagePublicId: { type: String, required: true },
    videoUrl: { type: String, trim: true },
    videoPublicId: { type: String, trim: true },
    videoType: { type: String, enum: ["video", "gif"] },
  },
  { timestamps: true },
);

export default mongoose.models.Watch || mongoose.model("Watch", WatchSchema);
