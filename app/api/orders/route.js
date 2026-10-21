import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import { buildOrderDraft } from "@/lib/order";
import { getCatalog } from "@/lib/watches";

import {
  getWhatsAppFallbackUrl,
  sendOrderEmails,
  sendOrderWhatsApp,
} from "@/lib/notifications";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const fail = (error, status = 400) => NextResponse.json({ error }, { status });

export async function POST(request) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return fail("Invalid request.");
  }

  const catalog = await getCatalog();
  const draft = buildOrderDraft({
    customer: payload?.customer,
    lines: payload?.items,
    catalog,
  });

  if (draft.error) return fail(draft.error);

  const { order } = draft;

  const saveOrder = (async () => {
    try {
      await connectDB();
      await Order.create(order);
      return true;
    } catch (error) {
      console.error("Could not save order:", error);
      return false;
    }
  })();

  const [persisted, email, whatsapp] = await Promise.all([
    saveOrder,
    sendOrderEmails(order),
    sendOrderWhatsApp(order),
  ]);

  if (persisted) {
    const notifications = {
      email: { sent: Boolean(email.sent) },
      whatsapp: { sent: Boolean(whatsapp.sent) },
    };
    if (!email.sent && email.error) notifications.email.error = email.error;
    if (!whatsapp.sent && whatsapp.error)
      notifications.whatsapp.error = whatsapp.error;

    await Order.updateOne(
      { orderNumber: order.orderNumber },
      { $set: { notifications } },
    ).catch((error) =>
      console.error("Could not update order notifications:", error),
    );
  }

  const responseOrder = {
    ...order,
    emailSent: Boolean(email.sent),
    whatsappSent: Boolean(whatsapp.sent),
    whatsappFallbackUrl: whatsapp.sent ? null : getWhatsAppFallbackUrl(order),
  };

  return NextResponse.json(
    { ok: true, order: responseOrder, persisted },
    { status: 201 },
  );
}
