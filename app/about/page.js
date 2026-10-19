import Link from "next/link";
import Image from "next/image";
import Icon from "@/components/Icon";
import WatchImage from "@/components/WatchImage";

export const metadata = {
  title: "Our Story | Aurade",
  description:
    "Discover the philosophy behind Aurade. A considered collection of timepieces.",
};

export default function About() {
  return (
    <div className="flex w-full flex-col overflow-hidden">
      <section className="relative flex min-h-[70vh] w-full items-center justify-center overflow-hidden bg-[#0a1412] lg:min-h-[80vh]">
        <WatchImage
          src="/images/aboutpageimage.png"
          alt="Watchmaking details"
          className="absolute inset-0 h-full w-full object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#0a1412] via-[#0a1412]/40 to-transparent" />

        <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-6 text-center">
          <p className="mb-6 flex items-center gap-3 text-[0.68rem] font-medium uppercase tracking-[4px] text-[#e1c27f]">
            <span className="h-px w-6 bg-[#e1c27f]" />
            The Aurade Philosophy
            <span className="h-px w-6 bg-[#e1c27f]" />
          </p>
          <h1 className="text-[3rem] font-normal leading-[1.05] tracking-[-1px] text-white sm:text-[4.5rem] lg:text-[5rem]">
            Time, with{" "}
            <em className="font-serif italic text-[#e1c27f]">intention.</em>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-[#d8e3dd] sm:text-[1.2rem]">
            We believe a watch is more than a tool for telling time. It is a
            personal signature, a physical anchor to the present moment, and a
            piece of art you carry with you.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 mt-12 lg:px-8">
        <div className="flex flex-col items-center gap-12 rounded-sm border border-[#d8e3dd] bg-white p-8 shadow-[0_8px_30px_-12px_rgba(18,60,53,0.08)] sm:p-12 lg:flex-row lg:gap-20 lg:p-16">
          <div className="relative aspect-square w-full max-w-70 shrink-0 overflow-hidden rounded-full border-4 border-[#f0f5f2] lg:max-w-[320px]">
            <Image
              src="/images/founderImage.png"
              alt="Muhammad Saad Saif - Founder of Aurade"
              fill
              className="object-cover "
            />
          </div>

          <div className="flex flex-1 flex-col text-center lg:text-left">
            <p className="mb-3 flex items-center justify-center gap-3 text-[0.68rem] font-medium uppercase tracking-[4px] text-[#5e7a70] lg:justify-start">
              <span className="h-px w-6 bg-[#123c35]" />
              Behind the Brand
            </p>
            <h2 className="text-[2rem] font-semibold leading-[1.1] tracking-[-0.5px] text-[#123c35] sm:text-[2.5rem]">
              Meet the Founder
            </h2>
            <div className="mt-8 flex flex-col items-center justify-between gap-6 border-t border-[#d8e3dd] pt-6 sm:flex-row">
              <div>
                <p className="text-[1.1rem] font-semibold text-[#123c35]">
                  Muhammad Saad Saif
                </p>
                <p className="text-[0.8rem] uppercase tracking-[1.5px] text-[#5e7a70]">
                  Founder
                </p>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="https://instagram.com/saadsaifsheikh"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Founder's Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f0f5f2] text-[#123c35] transition-all hover:-translate-y-0.5 hover:bg-[#123c35] hover:text-[#e1c27f]"
                >
                  <Icon name="instagram" size={15} />
                </a>
                <a
                  href="https://tiktok.com/@saadsaifsheikh"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Founder's TikTok"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f0f5f2] text-[#123c35] transition-all hover:-translate-y-0.5 hover:bg-[#123c35] hover:text-[#e1c27f]"
                >
                  <Icon name="tiktok" size={15} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-sm border border-[#d8e3dd] bg-[#f0f5f2] px-8 py-6 sm:flex-row">
          <div className="text-center sm:text-left">
            <h3 className="text-[0.95rem] font-semibold text-[#123c35]">
              Follow Aurade
            </h3>
            <p className="text-[0.8rem] text-[#5e7a70]">
              Join our community for new releases and styling.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://instagram.com/aurade"
              target="_blank"
              rel="noreferrer"
              aria-label="Aurade's Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#123c35] transition-all hover:-translate-y-0.5 hover:bg-[#123c35] hover:text-[#e1c27f]"
            >
              <Icon name="instagram" size={16} />
            </a>
            <a
              href="https://tiktok.com/@aurade"
              target="_blank"
              rel="noreferrer"
              aria-label="Aurade's TikTok"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#123c35] transition-all hover:-translate-y-0.5 hover:bg-[#123c35] hover:text-[#e1c27f]"
            >
              <Icon name="tiktok" size={16} />
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-8 lg:py-15">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <div className="relative aspect-4/5 w-full overflow-hidden rounded-sm border border-[#d8e3dd]">
            <WatchImage
              src="/images/lifestyle.png"
              alt="Crafting the collection"
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-6 left-6 right-6 rounded-sm bg-white/90 p-6 backdrop-blur-md">
              <p className="mt-2 text-[0.9rem] leading-relaxed text-[#4d6b62]">
                Born from a desire to strip away the noise and focus on what
                truly matters: exceptional design and quiet confidence.
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <h2 className="text-[2rem] font-semibold leading-[1.1] tracking-[-0.5px] text-[#123c35] sm:text-[2.75rem]">
              A reaction against <br />
              <em className="font-serif italic text-[#5e7a70]">
                the ordinary.
              </em>
            </h2>
            <div className="mt-8 space-y-6 text-[1rem] leading-relaxed text-[#4d6b62]">
              <p>
                At Aurade, we believe a watch is more than something you wear to
                tell time. Its part of how you present yourself, the moments you
                make time for, and the life youre building.
              </p>
              <p>
                Inspired by the art of understated living, Aurade brings
                together timeless design and everyday versatility. Our watches
                are made for those who appreciate the finer details without
                needing to make a statement. From early mornings and ambitious
                days to spontaneous journeys and quiet evenings, each piece
                moves effortlessly with you.
              </p>
              <p>
                We believe true style isnt about following trends or seeking
                attention. Its about knowing who you are and choosing pieces
                that reflect it. Thats why we focus on thoughtful design,
                balanced proportions, and enduring aesthetics—creating
                timepieces that feel just as right today as they will years from
                now.
              </p>
              <p className="font-semibold text-[#123c35]">
                Aurade is for the moments that matter, the journeys that shape
                you, and the quiet confidence of living life on your own terms.
              </p>
            </div>

            <div className="mt-10 flex items-center gap-4">
              <div className="h-px w-12 bg-[#123c35]" />
              <div>
                <p className="text-[0.9rem] font-semibold text-[#123c35]">
                  The Aurade Team
                </p>
                <p className="text-[0.75rem] uppercase tracking-[1.5px] text-[#5e7a70]">
                  Curators of Time
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE VALUES */}
      <section className="border-y border-[#d8e3dd] bg-[#eef3f0] py-24">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="text-[0.68rem] font-medium uppercase tracking-[4px] text-[#5e7a70]">
              Our Core Values
            </h2>
            <p className="mt-4 text-[2rem] font-semibold leading-tight tracking-[-0.5px] text-[#123c35]">
              Three pillars guide everything we do.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#123c35] shadow-sm">
                <Icon name="diamond" size={24} />
              </div>
              <h3 className="mb-3 text-[1.1rem] font-semibold text-[#123c35]">
                Curated Perspective
              </h3>
              <p className="max-w-xs text-[0.9rem] leading-relaxed text-[#5e7a70]">
                Less, but better. We reject the endless carousel of new releases
                in favor of a tight, intentional edit.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#123c35] shadow-sm">
                <Icon name="shield" size={24} />
              </div>
              <h3 className="mb-3 text-[1.1rem] font-semibold text-[#123c35]">
                Quiet Confidence
              </h3>
              <p className="max-w-xs text-[0.9rem] leading-relaxed text-[#5e7a70]">
                True luxury doesnt need to shout. Our pieces are designed to be
                recognized by those who know, not by everyone.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#123c35] shadow-sm">
                <Icon name="truck" size={24} />
              </div>
              <h3 className="mb-3 text-[1.1rem] font-semibold text-[#123c35]">
                Everyday Presence
              </h3>
              <p className="max-w-xs text-[0.9rem] leading-relaxed text-[#5e7a70]">
                A watch should be worn, not kept in a safe. We build durable,
                versatile timepieces meant for daily life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE MANIFESTO */}
      <section className="mx-auto w-full max-w-4xl px-6 py-24 text-center lg:py-32">
        <Icon name="quote" size={40} className="mx-auto mb-8 text-[#e1c27f]" />
        <blockquote className="text-[1.75rem] font-serif leading-relaxed text-[#123c35] sm:text-[2.25rem]">
          We dont just sell watches. We offer a perspective on how you spend
          your most valuable asset.
        </blockquote>
        <p className="mt-8 text-[0.75rem] font-semibold uppercase tracking-[2px] text-[#5e7a70]">
          — The Aurade Manifesto
        </p>
      </section>

      {/* 6. FINAL CTA */}
      <section className="mx-auto w-full max-w-7xl px-6 pb-24 lg:px-8">
        <div className="relative overflow-hidden rounded-sm bg-[#123c35] px-6 py-20 text-center text-white sm:px-12">
          <div className="absolute inset-0 bg-[url('/images/pattern-bg.png')] opacity-10 mix-blend-overlay" />

          <div className="relative z-10 mx-auto max-w-2xl">
            <h2 className="text-[2rem] font-semibold tracking-[-0.5px] sm:text-[2.5rem]">
              Find your signature.
            </h2>
            <p className="mt-4 text-[1rem] leading-relaxed text-[#d8e3dd]">
              Explore the collection and discover the timepiece that speaks to
              your personal style.
            </p>
            <Link
              href="/shop"
              className="group mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#e1c27f] px-8 text-[0.85rem] font-semibold uppercase tracking-[1.5px] text-[#0a1412] transition-all duration-300 hover:bg-[#d4af37] hover:shadow-lg"
            >
              Shop the collection
              <Icon
                name="arrow"
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
