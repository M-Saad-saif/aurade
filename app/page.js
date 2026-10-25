import Link from "next/link";
import { collections, photos } from "@/lib/catalog";
import { getCatalog, getStoreWatches } from "@/lib/watches";
import ProductCard from "@/components/ProductCard";
import WatchImage from "@/components/WatchImage";
import SectionHeading from "@/components/SectionHeading";
import Icon from "@/components/Icon";
import CardSwap from "@/components/CardSwap";
import Newsletter from "@/components/Newsletter";

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default async function Home() {
  const [catalog, uploadedWatches] = await Promise.all([
    getCatalog(),
    getStoreWatches(),
  ]);

  const swapItems = uploadedWatches.flatMap((watch) =>
    watch.images.map((image, index) => ({
      title:
        watch.images.length > 1 ? `${watch.name} (${index + 1})` : watch.name,
      image,
    })),
  );

  const shuffledSwapItems1 = shuffleArray(swapItems);
  const shuffledSwapItems2 = shuffleArray(swapItems);

  return (
    <>
      <section className="relative flex min-h-[85vh] w-full items-center overflow-hidden bg-[#0a1412] lg:min-h-[90vh]">
        {/* DESKTOP IMAGE */}
        <WatchImage
          src="/images/landing-image.png"
          alt="Classic watch photographed against a mountain landscape"
          className="absolute inset-0 hidden h-full w-full object-cover object-center md:block"
          priority
        />

        {/* MOBILE IMAGE  */}
        <WatchImage
          src="/images/landingPageMobile.png"
          alt="Classic watch photographed against a mountain landscape"
          className="absolute inset-0 block h-full w-full object-cover object-center md:hidden"
          priority
        />

        <div className="absolute inset-0 bg-[#0a1412]/40 bg-linear-to-r from-[#0a1412] via-[#0a1412]/20 to-transparent sm:bg-[#0a1412]/10 sm:via-[#0a1412]/10" />

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col px-5 py-16 sm:px-9 sm:py-24 lg:px-16">
          <div className="max-w-xl">
            <p className="mb-4 text-[0.68rem] font-semibold uppercase tracking-[3px] text-[#e1c27f] sm:text-[0.7rem] sm:tracking-[4px]">
              More than time
            </p>

            <h1 className="mb-5 text-[2.75rem] font-normal leading-[1.1] tracking-[-1px] text-white min-[380px]:text-[3.25rem] sm:mb-6 sm:text-[4.5rem]">
              Time, with an{" "}
              <em className="font-serif italic text-[#e1c27f]">AURA.</em>
            </h1>

            <p className="mb-8 max-w-md text-[0.95rem] leading-relaxed text-[#d8e3dd] sm:mb-10 sm:text-[1.1rem]">
              A considered collection of watches.
              <br />A distinctive expression of you.
            </p>

            <Link
              href="/shop"
              className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-[40px] border-none bg-linear-to-r from-[#bf953f] via-[#fcf6ba] via-[#b38728] via-[#fbf5b7] to-[#aa771c] bg-size-[200%_200%] px-5 font-sans text-[13px] font-semibold text-[rgb(65,54,0)] shadow-[5px_5px_10px_rgba(0,0,0,0.144)] transition-all duration-3000 hover:scale-95 hover:bg-right disabled:pointer-events-none disabled:bg-[#dcdcdc] disabled:text-[#7e7e7e] disabled:opacity-65 disabled:shadow-none sm:h-10 sm:w-auto sm:px-8 sm:text-[14px]"
            >
              <Icon name="crown" />
              Explore the collection
            </Link>

            <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.58rem] font-medium uppercase tracking-[1.5px] text-[#a4b3ae] sm:mt-16 sm:text-[0.65rem] sm:tracking-[2px]">
              <span>The Aurade Edit / 01</span>
              <span className="h-px w-8 bg-[#a4b3ae]/40 sm:w-12" />
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

      <section className="section mx-auto w-full max-w-7xl px-6 sm:px-8">
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

      <section className="section featured mx-auto w-full max-w-7xl px-6 sm:px-8 bg-[#f0f5f2]">
        <SectionHeading
          eyebrow="THE CONSIDERED COLLECTION"
          title="Meet your next signature."
          href="/shop"
          label="Shop all watches"
        />
        <div className="product-grid max-sm:grid-cols-1">
          {catalog.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {swapItems.length > 0 && (
        <section className="bg-[#0a1412] px-5 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:gap-8 md:grid-cols-2">
            {/* CARD SWAP 1 - Uses Pre-shuffled Array */}
            <div className="flex min-h-[340px] w-full items-center justify-center overflow-hidden sm:min-h-[420px]">
              <CardSwap
                items={shuffledSwapItems1}
                height={320}
                delay={4000}
                visibleCards={4}
                autoplay={swapItems.length > 1}
                pauseOnHover
                draggable={swapItems.length > 1}
                className="w-full max-w-[420px]"
              />
            </div>

            {/* CARD SWAP 2 - Uses Pre-shuffled Array */}
            <div className="flex min-h-[340px] w-full items-center justify-center overflow-hidden sm:min-h-[420px]">
              <CardSwap
                items={shuffledSwapItems2}
                height={320}
                delay={4000}
                visibleCards={4}
                autoplay={swapItems.length > 1}
                pauseOnHover
                draggable={swapItems.length > 1}
                className="w-full max-w-[420px]"
              />
            </div>
          </div>
        </section>
      )}

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
              "Our team confirms delivery details with you after you order.",
            ],
            [
              "shield",
              "Your browser, your bag",
              "Cart and wishlist stay on this device.",
            ],
            [
              "return",
              "No surprises",
              "Transparent checkout. Every order confirmed personally.",
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

      <section className="editorial-section mx-auto w-full max-w-7xl px-6 sm:px-8 bg-[#f0f5f2]">
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
      <Newsletter />
    </>
  );
}
