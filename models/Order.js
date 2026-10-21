import mongoose from "mongoose";

export const ORDER_STATUSES = [
  "new",
  "confirmed",
  "shipped",
  "completed",
  "cancelled",
];

const OrderItemSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true },
    name: { type: String, required: true },
    imageUrl: { type: String, default: "" },
    reference: { type: String, default: "" },
    strap: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    unitPrice: { type: Number, required: true, min: 0 },
    lineTotal: { type: Number, required: true, min: 0 },
  },
  { _id: false },
);

const OrderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    customer: {
      name: { type: String, required: true, trim: true, maxlength: 120 },
      email: { type: String, required: true, trim: true, maxlength: 254 },
      phone: { type: String, required: true, trim: true, maxlength: 30 },
    },
    items: {
      type: [OrderItemSchema],
      validate: [
        (items) => items.length > 0,
        "An order needs at least one item.",
      ],
    },
    subtotal: { type: Number, required: true, min: 0 },
    total: { type: Number, required: true, min: 0 },
    currency: { type: String, default: "PKR" },
    status: { type: String, enum: ORDER_STATUSES, default: "new" },
    notifications: {
      email: { sent: Boolean, error: String },
      whatsapp: { sent: Boolean, error: String },
    },
  },
  { timestamps: true },
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
