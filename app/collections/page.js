import Link from "next/link";
import { collections } from "@/lib/catalog";
import WatchImage from "@/components/WatchImage";
import Icon from "@/components/Icon";

export const metadata = { title: "Collections" };

export default function Collections() {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 pb-24 pt-12 lg:px-8 lg:pt-16">
      <div className="mx-auto mb-16 max-w-3xl text-center sm:mb-20">
        <p className="mb-4 flex items-center justify-center gap-3 text-[0.68rem] font-medium uppercase tracking-[4px] text-[#5e7a70]">
          <span className="h-px w-6 bg-[#123c35]" />
          Four ways to find your aura
          <span className="h-px w-6 bg-[#123c35]" />
        </p>

        <h1 className="text-[2.5rem] font-semibold leading-[1.1] tracking-[-1px] text-[#123c35] sm:text-[3.5rem] lg:text-[4rem]">
          The collections.
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-[1rem] leading-relaxed text-[#4d6b62] sm:text-[1.1rem]">
          Different expressions. The same considered perspective.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
        {collections.map((item) => {
          const href = `/collections/${item.slug}`;
          return (
            <Link
              key={item.slug}
              href={href}
              className="group flex flex-col overflow-hidden rounded-sm border border-[#d8e3dd] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#123c35]/30 hover:shadow-[0_16px_40px_-16px_rgba(18,60,53,0.25)]"
            >
              <div className="relative aspect-4/3 w-full overflow-hidden bg-[#f0f5f2] sm:aspect-3/2">
                <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.05]">
                  <WatchImage
                    src={item.image}
                    alt={`${item.name} collection`}
                  />
                </div>

                <span
                  aria-hidden="true"
                  className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/60 bg-white/90 text-[#123c35] backdrop-blur-sm transition-all duration-300 group-hover:border-[#123c35] group-hover:bg-[#123c35] group-hover:text-[#e1c27f]"
                >
                  <Icon name="arrow" size={18} />
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <h2 className="text-[1.5rem] font-semibold leading-tight tracking-[-0.5px] text-[#123c35]">
                  {item.name}
                </h2>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-[#5e7a70]">
                  {item.description}
                </p>

                <span className="mt-6 inline-flex items-center gap-2 self-start border-b border-transparent pb-1 text-[0.75rem] font-medium uppercase tracking-[1.5px] text-[#123c35] transition-colors group-hover:border-[#123c35]">
                  Explore Collection
                  <Icon
                    name="arrow"
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
