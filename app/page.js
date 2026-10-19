import Link from "next/link";
import { collections, photos } from "@/lib/catalog";
import { getCatalog } from "@/lib/watches";
import ProductCard from "@/components/ProductCard";
import WatchImage from "@/components/WatchImage";
import SectionHeading from "@/components/SectionHeading";
import Icon from "@/components/Icon";

export default async function Home() {
  const catalog = await getCatalog();
  return (
    <>
      <section className="relative flex min-h-[85vh] w-full items-center overflow-hidden bg-[#0a1412] lg:min-h-[90vh]">
        <WatchImage
          src="/images/landing-image.png"
          alt="Classic watch photographed against a mountain landscape"
          className="absolute inset-0 h-full w-full object-cover object-center"
          priority
        />

        <div className="absolute inset-0 bg-[#0a1412]/10 bg-linear-to-r from-[#0a1412]/100 via-[#0a1412]/10 to-transparent" />

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col px-9 py-24 lg:px-16">
          <div className="max-w-xl">
            <p className="mb-4 text-[0.7rem] font-semibold uppercase tracking-[4px] text-[#e1c27f]">
              More than time
            </p>

            <h1 className="mb-6 text-[3.5rem] font-normal leading-[1.05] tracking-[-1px] text-white sm:text-[4.5rem]">
              Time, with an{" "}
              <em className="font-serif italic text-[#e1c27f]">AURA.</em>
            </h1>

            <p className="mb-10 max-w-md text-[1rem] leading-relaxed text-[#d8e3dd] sm:text-[1.1rem]">
              A considered collection of watches.
              <br />A distinctive expression of you.
            </p>

            <Link
              href="/shop"
              className="group inline-flex items-center justify-center gap-2 bg-[#e1c27f] px-8 py-4 text-[0.8rem] font-semibold uppercase tracking-[1.5px] text-[#0a1412] transition-all duration-300 hover:bg-[#d4af37]"
            >
              Explore the collection
              <Icon
                name="arrow"
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <div className="mt-16 flex items-center gap-4 text-[0.65rem] font-medium uppercase tracking-[2px] text-[#a4b3ae]">
              <span>The Aurade Edit / 01</span>
              <span className="h-[1px] w-12 bg-[#a4b3ae]/40" />
              <span>Every moment, considered.</span>
            </div>
          </div>
        </div>

        <span className="absolute bottom-12 right-12 z-10 hidden text-[0.65rem] font-medium uppercase tracking-[2px] text-[#a4b3ae] lg:block [writing-mode:vertical-rl]">
          A new perspective on time
        </span>
      </section>

      <div className="brand-strip">
        <span>Considered design</span>
        <span>Distinctive details</span>
        <span>Your everyday signature</span>
      </div>

      <section className="section container mx-auto max-w-7xl px-8   ">
        <SectionHeading
          eyebrow="FIND YOUR SIGNATURE"
          title="A style for every moment."
          href="/collections"
          label="All collections"
        />
        <div className="collection-grid">
          {collections.map((collection) => (
            <Link
              className="collection-card"
              key={collection.slug}
              href={`/collections/${collection.slug}`}
            >
              <div className="collection-image">
                <WatchImage
                  src={collection.image}
                  alt={`${collection.name} watch collection`}
                />
                <span className="round-arrow">
                  <Icon name="arrow" />
                </span>
              </div>
              <h3>{collection.name}</h3>
              <p>{collection.subtitle}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="section container featured mx-auto max-w-7xl px-8 ">
        <SectionHeading
          eyebrow="THE CONSIDERED COLLECTION"
          title="Meet your next signature."
          href="/shop"
          label="Shop all watches"
        />
        <div className="product-grid">
          {catalog.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="story-banner">
        <div className="story-photo">
          <WatchImage
            src={photos.wrist}
            alt="A minimalist watch worn on a wrist"
          />
        </div>
        <div className="story-copy">
          <p className="eyebrow">THE IDEA BEHIND AURADE</p>
          <h2>
            Not just a watch.
            <br />A personal presence.
          </h2>
          <p>
            Aura is the feeling you carry. Trade is the discovery that brings
            something new into your world. Aurade lives where the two meet.
          </p>
          <Link href="/about" className="text-link light">
            Our story <Icon name="arrow" />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8">
        {/* Centered Heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 text-[0.68rem] font-medium uppercase tracking-[4px] text-[#5e7a70]">
            THE DETAILS MATTER
          </p>
          <h2 className="text-[2rem] font-semibold leading-[1.1] tracking-[-0.5px] text-[#123c35] sm:text-[2.5rem]">
            A more considered experience.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {[
            [
              "diamond",
              "Curated perspective",
              "A small collection. A clear point of view.",
            ],
            [
              "truck",
              "Clear delivery",
              "Review demo shipping costs before checkout.",
            ],
            [
              "shield",
              "Your browser, your bag",
              "Cart and wishlist stay on this device.",
            ],
            [
              "return",
              "No surprises",
              "Illustrative products. Transparent demo checkout.",
            ],
          ].map(([icon, title, copy]) => (
            <div
              key={title}
              className="group flex flex-col items-center text-center"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#f0f5f2] text-[#123c35] transition-all duration-300 group-hover:bg-[#123c35] group-hover:text-[#e1c27f]">
                <Icon name={icon} size={26} />
              </div>

              <h3 className="mb-2 text-[1rem] font-semibold tracking-[-0.2px] text-[#123c35]">
                {title}
              </h3>
              <p className="max-w-[240px] text-[0.85rem] leading-relaxed text-[#5e7a70]">
                {copy}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="editorial-section container mx-auto max-w-7xl px-8 ">
        <div>
          <p className="eyebrow">FROM THE JOURNAL</p>
          <h2>
            The art of
            <br />
            choosing well.
          </h2>
          <p>
            A few thoughts on proportion, personal style and finding a watch
            that feels like you.
          </p>
          <Link href="/journal" className="text-link">
            Read the journal <Icon name="arrow" />
          </Link>
        </div>
        <Link
          href="/journal/finding-your-signature"
          className="editorial-image"
        >
          <WatchImage
            src={photos.blue}
            alt="Blue-dial watch with a leather strap"
          />
          <span>
            01 / Finding your signature <Icon name="arrow" />
          </span>
        </Link>
      </section>
    </>
  );
}
