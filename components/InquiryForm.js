"use client";
import { useState } from "react";
import Icon from "./Icon";

export default function InquiryForm() {
  const [link, setLink] = useState("");

  function onSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const url = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
    setLink(url);
    window.open(url, "_blank", "noopener,noreferrer");
    form.reset();
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2 sm:col-span-2">
          <span className="text-[0.75rem] font-semibold uppercase tracking-[1px] text-[#123c35]">
            Name
          </span>
          <input
            name="name"
            required
            maxLength={100}
            placeholder="Your full name"
            className="h-12 w-full rounded-sm border border-[#c8d6d0] bg-white px-4 text-[0.95rem] text-[#123c35] placeholder-[#5e7a70]/50 transition-colors focus:border-[#123c35] focus:outline-none focus:ring-1 focus:ring-[#123c35]"
          />
        </label>

        <label className="flex flex-col gap-2 sm:col-span-2">
          <textarea
            name="message"
            rows={5}
            required
            minLength={10}
            maxLength={1000}
            className="w-full resize-none rounded-sm border border-[#c8d6d0] bg-white p-4 text-[0.95rem] text-[#123c35] placeholder-[#5e7a70]/50 transition-colors focus:border-[#123c35] focus:outline-none focus:ring-1 focus:ring-[#123c35]"
          />
        </label>
      </div>

      <div className="mt-2 flex flex-col gap-4 border-t border-[#d8e3dd] pt-6">
        <p className="text-[0.8rem] leading-relaxed text-[#5e7a70]">
          Clicking send will open WhatsApp with your message ready. You will
          need to tap send inside WhatsApp to deliver it.
        </p>

        <button
          type="submit"
          className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 text-[0.85rem] font-semibold uppercase tracking-[1.5px] text-white transition-all duration-200 hover:bg-[#1EBE57] active:scale-[0.99] sm:w-auto sm:self-start"
        >
          <Icon name="whatsapp" />
          Send on WhatsApp
        </button>

       
      </div>
    </form>
  );
}
