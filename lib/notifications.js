import nodemailer from "nodemailer";
import { formatMoney } from "./catalog.js";

const escapeHtml = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const digitsOnly = (value) => String(value ?? "").replace(/\D/g, "");



// for whatsapp
export function orderWhatsAppText(order) {
  const lines = [
    `*NEW ORDER ${order.orderNumber}*`,
    "",
    `*CUSTOMER DETAILS*`,
    `Name: ${order.customer.name}`,
    `Email: ${order.customer.email}`,
    `Phone: ${order.customer.phone}`,
    "",
    "*ORDER ITEMS*",
    ...order.items.map(
      (item, index) =>
        `${index + 1}. ${item.name}${
          item.reference ? ` (${item.reference})` : ""
        } - ${item.strap} x${item.quantity} - ${formatMoney(item.lineTotal)}${
          item.imageUrl ? `\nImage: ${item.imageUrl}` : ""
        }`,
    ),
    "",
    `Subtotal: ${formatMoney(order.subtotal)}`,
    "",
    `*TOTAL: ${formatMoney(order.total)}*`,
  ];

  return lines.join("\n");
}

export function getWhatsAppFallbackUrl(order) {
  const phone = digitsOnly(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER);

  if (!phone) return null;

  const message = orderWhatsAppText(order);

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

function mailConfig() {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.ORDER_NOTIFICATION_EMAIL;
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 465);
  const secure =
    process.env.SMTP_SECURE != null
      ? process.env.SMTP_SECURE === "true"
      : port === 465;
  const from = process.env.SMTP_FROM || (user ? `Aurade <${user}>` : "");

  return { user, pass, to, host, port, secure, from };
}

let transport;
function getTransport(config) {
  if (!transport) {
    transport = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: { user: config.user, pass: config.pass },
    });
  }
  return transport;
}

function itemsRows(order) {
  return order.items
    .map(
      (item) => `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #e5ede9;">
            ${item.imageUrl ? `<img src="${escapeHtml(item.imageUrl)}" alt="${escapeHtml(item.name)}" width="120" style="display:block;width:120px;height:auto;margin:0 0 10px;border-radius:4px;" />` : ""}
            <strong style="color:#123c35;">${escapeHtml(item.name)}</strong>
            ${item.reference ? `<span style="color:#5e7a70;"> / ${escapeHtml(item.reference)}</span>` : ""}
            <div style="color:#5e7a70;font-size:12px;">${escapeHtml(item.strap)} · Qty ${item.quantity}</div>
          </td>
          <td align="right" style="padding:10px 0;border-bottom:1px solid #e5ede9;color:#123c35;">
            ${escapeHtml(formatMoney(item.lineTotal))}
          </td>
        </tr>`,
    )
    .join("");
}

function totalsRows(order) {
  return `
    <tr>
      <td style="padding:6px 0;color:#4d6b62;">Subtotal</td>
      <td align="right" style="padding:6px 0;color:#123c35;">${escapeHtml(formatMoney(order.subtotal))}</td>
    </tr>
    <tr>
      <td style="padding:12px 0 0;border-top:1px solid #d8e3dd;color:#123c35;font-weight:700;">Total</td>
      <td align="right" style="padding:12px 0 0;border-top:1px solid #d8e3dd;color:#123c35;font-weight:700;">${escapeHtml(formatMoney(order.total))}</td>
    </tr>`;
}

function ownerEmailHtml(order) {
  const fallback = getWhatsAppFallbackUrl(order);
  return `
  <div style="background:#f4f0e6;padding:32px;font-family:Arial,Helvetica,sans-serif;color:#123c35;">
    <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #d8e3dd;padding:32px;">
      <p style="margin:0 0 8px;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#5e7a70;">New order received</p>
      <h1 style="margin:0 0 24px;font-size:24px;">${escapeHtml(order.orderNumber)}</h1>
      <p style="margin:0 0 6px;"><strong>Name:</strong> ${escapeHtml(order.customer.name)}</p>
      <p style="margin:0 0 6px;"><strong>Email:</strong> ${escapeHtml(order.customer.email)}</p>
      <p style="margin:0 0 6px;"><strong>Phone:</strong> ${escapeHtml(order.customer.phone)}</p>
      <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;">
        ${itemsRows(order)}
        ${totalsRows(order)}
      </table>
      ${
        fallback
          ? `<p style="margin:24px 0 0;"><a href="${escapeHtml(fallback)}" style="color:#123c35;">Open this order in WhatsApp</a></p>`
          : ""
      }
    </div>
  </div>`;
}

function customerEmailHtml(order) {
  return `
  <div style="background:#f4f0e6;padding:32px;font-family:Arial,Helvetica,sans-serif;color:#123c35;">
    <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #d8e3dd;padding:32px;">
      <table
        role="presentation"
        cellpadding="0"
        cellspacing="0"
        border="0"
        width="100%"
        style="
          width: 100%;
          background-color: #f4f6f2;
          border-top: 1px solid #d8e3dd;
          border-bottom: 1px solid #d8e3dd;
          font-family: Arial, Helvetica, sans-serif;">
            <tr>
              <td style="padding: 18px 14px;">
                <table
                  role="presentation"
                  cellpadding="0"
                  cellspacing="0"
                  border="0"
                  style="border-collapse: collapse;"
                >
                  <tr>
                    <td
                      valign="middle"
                      style="padding: 0 13px 0 0;"
                    >
                      <img
                        src="https://aurade.vercel.app/images/logo.png"
                        alt="A.u.r.a.d.e"
                        width="38"
                        height="38"
                        style="
                          display: block;
                          width: 38px;
                          height: 38px;
                          border: 0;
                          border-radius: 8px;
                          object-fit: contain;
                        "
                      >
                    </td>


                      <td valign="middle" style="padding: 0;">
                        <div
                          style="
                            margin: 0;
                            color: #3f625b;
                            font-size: 20px;
                            font-weight: 700;
                            line-height: 24px;
                            letter-spacing: 6px;
                            white-space: nowrap;
                          "
                        >
                          U.R.A.D.E
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>


      <h1 style="margin:0 0 16px;font-size:24px;">Thank you, ${escapeHtml(order.customer.name)}.</h1>
      <p style="margin:0 0 8px;">We have received your order <strong>${escapeHtml(order.orderNumber)}</strong>.</p>
      <p style="margin:0 0 24px;color:#4d6b62;">Our team will contact you on ${escapeHtml(order.customer.phone)} to confirm payment and delivery.</p>
      <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;">
        ${itemsRows(order)}
        ${totalsRows(order)}
      </table>
    </div>
  </div>`;
}

export async function sendOrderEmails(order) {
  const config = mailConfig();
  if (!config.user || !config.pass || !config.to) {
    return {
      sent: false,
      skipped: true,
      error: "Email is not configured. Set SMTP_USER and SMTP_PASS.",
    };
  }

  try {
    const mailer = getTransport(config);
    await mailer.sendMail({
      from: config.from,
      to: config.to,
      replyTo: order.customer.email,
      subject: `New order ${order.orderNumber} — ${formatMoney(order.total)}`,
      text: orderWhatsAppText(order),
      html: ownerEmailHtml(order),
    });

    let customerSent = false;
    let customerError;
    try {
      await mailer.sendMail({
        from: config.from,
        to: order.customer.email,
        replyTo: config.to,
        subject: `Your Aurade order ${order.orderNumber}`,
        text: `Thank you, ${order.customer.name}. We have received your order ${order.orderNumber}. We will contact you on ${order.customer.phone} to confirm payment and delivery.\n\n${orderWhatsAppText(order)}`,
        html: customerEmailHtml(order),
      });
      customerSent = true;
    } catch (error) {
      customerError = error?.message || "Customer confirmation failed.";
    }

    return { sent: true, customerSent, customerError };
  } catch (error) {
    return { sent: false, error: error?.message || "Email could not be sent." };
  }
}

export async function sendOrderWhatsApp(order) {
  const phone = digitsOnly(
    process.env.WHATSAPP_PHONE || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
  );

  if (!phone) {
    return {
      sent: false,
      skipped: true,
      error: "WhatsApp is not configured. Set WHATSAPP_PHONE.",
    };
  }

  try {
    const url = new URL("https://api.callmebot.com/whatsapp.php");
    url.searchParams.set("phone", phone);
    url.searchParams.set("text", orderWhatsAppText(order));
    url.searchParams.set("apikey", apiKey);

    const response = await fetch(url, { method: "GET", cache: "no-store" });
    const body = await response.text();
    if (
      !response.ok ||
      /apikey is invalid|not registered|not allowed|maximum number|error/i.test(
        body,
      )
    ) {
      throw new Error(body.slice(0, 300) || "CallMeBot rejected the message.");
    }

    return { sent: true, provider: "callmebot", imagesSent: 0 };
  } catch (error) {
    return {
      sent: false,
      error: error?.message || "WhatsApp message could not be sent.",
    };
  }
}
