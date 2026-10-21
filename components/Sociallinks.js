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
];

const Sociallinks = () => {
  return (
   
    <div className="flex w-55 flex-col gap-1 border-l border-[#d8e3dd] pl-1 fixed left-0 top-1/2 z-50 -translate-y-1/2">
      {accounts.map((account) => (
        <Link
          key={account.name}
          href={account.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between text-[0.85rem] font-semibold text-[#4d6b62] transition-colors hover:text-[#123c35]"
        >
          <li className="group w-9 overflow-hidden rounded-lg border-l border-transparent bg-white transition-all duration-500 hover:w-64 hover:border-[#d8e3dd] hover:shadow-[0_8px_30px_-12px_rgba(18,60,53,0.15)] has-focus:shadow-[0_8px_30px_-12px_rgba(18,60,53,0.15)]">
            <button className="peer flex w-full cursor-pointer items-center gap-2.5 px-1 py-2 text-left text-[#123c35] transition-all active:scale-95">
              <div className="rounded-lg border-2 border-[#c8d6d0] bg-[#f0f5f2] p-1 transition-colors duration-300 group-hover:border-[#123c35] group-hover:bg-[#123c35] group-hover:text-[#e1c27f]">
                <Icon name={account.icon} size={12} />
              </div>

              {/* Title Text */}
              <div className="whitespace-nowrap font-semibold uppercase tracking-[1px]">
                {account.name}
              </div>
            </button>
          </li>
        </Link>
      ))}
    </div>
  );
};

export default Sociallinks;
