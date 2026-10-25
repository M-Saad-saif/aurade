import crypto from "crypto";

export const MAX_LINES = 25;
export const MAX_QUANTITY = 99;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[0-9][0-9\s().-]{5,24}$/;

const clean = (value, max) => String(value ?? "").trim().slice(0, max);

export function generateOrderNumber(date = new Date()) {
  const stamp = date.toISOString().slice(2, 10).replace(/-/g, "");
  const suffix = crypto.randomBytes(3).toString("hex").toUpperCase();
  return `AUR-${stamp}-${suffix}`;
}

export function normalizeCustomer(input) {
  const source = input && typeof input === "object" ? input : {};
  const customer = {
    name: clean(source.name, 120),
    email: clean(source.email, 254).toLowerCase(),
    phone: clean(source.phone, 30),
  };

  if (customer.name.length < 2) return { error: "Please enter your full name." };
  if (!EMAIL_RE.test(customer.email))
    return { error: "Please enter a valid email address." };
  if (!PHONE_RE.test(customer.phone))
    return { error: "Please enter a valid phone number." };
  return { customer };
}

function resolveLines(lines, catalog) {
  if (!Array.isArray(catalog) || !catalog.length)
    return { error: "The catalog is unavailable. Please try again." };

  if (!Array.isArray(lines) || !lines.length)
    return { error: "Your bag is empty." };

  if (lines.length > MAX_LINES)
    return { error: "This order has too many items." };

  const byId = new Map(catalog.map((product) => [product.id, product]));
  const requested = new Map();
  const items = [];

  for (const raw of lines) {
    const id = clean(raw?.id, 100);
    const strap = clean(raw?.strap, 80);
    const quantity = Number(raw?.quantity);
    const product = byId.get(id);

    if (
      !product ||
      !Array.isArray(product.straps) ||
      !product.straps.includes(strap) ||
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > MAX_QUANTITY
    ) {
      return { error: "One of the items in your bag is no longer available." };
    }

    const alreadyRequested = requested.get(id) || 0;
    if (alreadyRequested + quantity > product.stock)
      return {
        error: `Only ${product.stock} of ${product.name} remain in stock.`,
      };
    requested.set(id, alreadyRequested + quantity);

    const unitPrice = product.price;
    items.push({
      productId: product.id,
      name: product.name,
      imageUrl: product.image || product.images?.[0] || "",
      reference: product.reference || "",
      strap,
      quantity,
      unitPrice,
      lineTotal: unitPrice * quantity,
    });
  }

  return { items };
}

export function buildOrderDraft({ customer, lines, catalog, now = new Date() }) {
  const normalized = normalizeCustomer(customer);
  if (normalized.error) return normalized;

  const resolved = resolveLines(lines, catalog);
  if (resolved.error) return resolved;

  const subtotal = resolved.items.reduce((sum, item) => sum + item.lineTotal, 0);

  return {
    order: {
      orderNumber: generateOrderNumber(now),
      customer: normalized.customer,
      items: resolved.items,
      subtotal,
      total: subtotal,
      currency: "PKR",
      priceUnit: "PKR",
      status: "new",
      createdAt: now.toISOString(),
    },
  };
}
