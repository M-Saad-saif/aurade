"use client";
import Link from "next/link";
import Icon from "@/components/Icon";

export default function ErrorPage({ reset }) {
  return (
    <div className="flex min-h-[70vh] w-full items-center justify-center px-6 py-2">
      <div className="flex max-w-lg flex-col items-center text-center">
        <div className=" flex h-20 w-20 items-center justify-center rounded-full bg-[#f0f5f2] text-[#123c35]">
          <Icon name="shield" size={32} />
        </div>

        <p className="mb-4 flex items-center justify-center gap-3 text-[0.68rem] font-medium uppercase tracking-[4px] text-[#5e7a70]">
          <span className="h-px w-6 bg-[#123c35]" />
          A small interruption
          <span className="h-px w-6 bg-[#123c35]" />
        </p>

        <h1 className="text-[2.5rem] font-semibold leading-[1.1] tracking-[-1px] text-[#123c35] sm:text-[3.5rem]">
          Lets try that again.
        </h1>

        <p className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-[#4d6b62]">
          Something went wrong while loading this page. It might have been a
          temporary glitch or a lost connection.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
          <button
            onClick={reset}
            className="inline-flex h-12 items-center justify-center rounded-full bg-[#123c35] px-8 text-[0.85rem] font-semibold uppercase tracking-[1.5px] text-[#f4f0e6] transition-all duration-200 hover:bg-[#0d2e28] active:scale-[0.99]"
          >
            Try again
          </button>

          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-[0.85rem] font-medium uppercase tracking-[1.5px] text-[#123c35] transition-colors hover:text-[#0d2e28]"
          >
            <span className="border-b border-transparent pb-0.5 transition-colors group-hover:border-[#123c35]">
              Return home
            </span>
            <Icon
              name="arrow"
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
