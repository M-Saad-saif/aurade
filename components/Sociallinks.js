import React from "react";
import Link from "next/link";
import Icon from "@/components/Icon";

const accounts = [
  {
    icon: "instagram",
    name: "Instagram",
    title: "Instagram",
    href: "https://instagram.com/a.u.r.a.d.e",
  },
  {
    icon: "tiktok",
    name: "Tiktok",
    title: "Tiktok",
    href: "https://tiktok.com/@a.u.r.a.d.e",
  },
  {
    icon: "whatsapp",
    name: "Whatsapp",
    title: "Whatsapp",
    href: "https://wa.me/923318168843",
  },
];

const Sociallinks = () => {
  return (
    <div className="fixed left-0 top-1/2 z-50 flex w-50 -translate-y-1/2 flex-col gap-1 border-l border-[#d8e3dd] pl-1">
      {accounts.map((account) => (
        <li
          key={account.name}
          className="group list-none w-7 overflow-hidden rounded-lg border-l border-transparent bg-white transition-all duration-500 hover:w-64 hover:border-[#d8e3dd] hover:shadow-[0_8px_30px_-12px_rgba(18,60,53,0.15)] focus-within:w-64 focus-within:shadow-[0_8px_30px_-12px_rgba(18,60,53,0.15)]"
        >
          <Link
            href={account.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full cursor-pointer items-center gap-2.5  py-0.5 text-left text-[#123c35] transition-all active:scale-95"
          >
            <div className="shrink-0 rounded-lg border-2 border-[#c8d6d0] bg-[#f0f5f2] p-1 transition-colors duration-300 group-hover:border-[#123c35] group-hover:bg-[#123c35] group-hover:text-[#e1c27f] group-focus-within:border-[#123c35] group-focus-within:bg-[#123c35] group-focus-within:text-[#e1c27f]">
              <Icon name={account.icon} size={14} />
            </div>

            <div className="flex flex-1 items-center justify-between whitespace-nowrap text-[0.85rem] font-semibold uppercase tracking-[1px] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
              <span className="underline">{account.name}</span>
              <Icon name="arrow" size={14} />
            </div>
          </Link>
        </li>
      ))}
    </div>
  );
};

export default Sociallinks;
