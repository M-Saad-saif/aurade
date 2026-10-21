import Link from "next/link";
import { notFound } from "next/navigation";
import { supportPages } from "@/lib/content";
import Icon from "@/components/Icon";

export function generateStaticParams() {
  return Object.keys(supportPages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return {
    title: Object.hasOwn(supportPages, slug)
      ? supportPages[slug].title
      : "Information",
  };
}

export default async function Support({ params }) {
  const { slug } = await params;
  const page = Object.hasOwn(supportPages, slug) ? supportPages[slug] : null;

  if (!page) notFound();

  return (
    <section className="mx-auto w-full max-w-7xl px-6 pb-24 pt-12 lg:px-8 lg:pt-16">
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[280px_1fr] lg:gap-20">
        {/* --- LEFT SIDEBAR NAVIGATION --- */}
        <aside className="lg:sticky lg:top-24">
          <p className="mb-6 flex items-center gap-3 text-[0.68rem] font-medium uppercase tracking-[4px] text-[#5e7a70]">
            <span className="h-px w-6 bg-[#123c35]" />
            Information
          </p>

          <nav className="flex flex-col gap-1">
            {Object.entries(supportPages).map(([key, value]) => {
              const isActive = key === slug;
              return (
                <Link
                  key={key}
                  href={`/support/${key}`}
                  aria-current={isActive ? "page" : undefined}
                  className="group flex items-center justify-between rounded-sm px-4 py-0 text-[0.9rem] font-medium text-[#4d6b62] transition-all duration-200 hover:bg-[#f0f5f2] hover:text-[#123c35]"
                >
                  {value.title.replace(/\.$/, "")}
                  {isActive && <Icon name="arrow" size={14} />}
                </Link>
              );
            })}

            <div className="my-4 border-t border-[#d8e3dd]" />

            <Link
              href="/contact"
              className="group flex items-center justify-between rounded-sm px-4 py-0 text-[0.9rem] font-medium text-[#4d6b62] transition-all duration-200 hover:bg-[#f0f5f2] hover:text-[#123c35]"
            >
              Contact Support
              <Icon
                name="arrow"
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </nav>
        </aside>

        {/* --- RIGHT CONTENT AREA --- */}
        <article className="max-w-3xl">
          <p className="mb-3 text-[0.68rem] font-medium uppercase tracking-[4px] text-[#5e7a70]">
            Aurade / Help
          </p>

          <h1 className="text-[2.5rem] font-semibold leading-[1.1] tracking-[-1px] text-[#123c35] sm:text-[3.5rem]">
            {page.title}
          </h1>

          {/* Lead Intro */}
          <p className="mt-6 text-[1.1rem] font-medium leading-relaxed text-[#4d6b62] sm:text-[1.2rem]">
            {page.intro}
          </p>

          {/* Sections */}
          <div className="mt-12 flex flex-col gap-10">
            {page.sections.map(([title, copy]) => (
              <section key={title} className="border-t border-[#d8e3dd] pt-8">
                <h2 className="mb-4 text-[1.25rem] font-semibold tracking-[-0.3px] text-[#123c35]">
                  {title}
                </h2>
                <p className="text-[0.98rem] leading-relaxed text-[#5e7a70]">
                  {copy}
                </p>
              </section>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
