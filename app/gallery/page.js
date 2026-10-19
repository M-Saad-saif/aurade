import InfiniteMenu from "@/components/DemoGallery";
import { getStoreWatches } from "@/lib/watches";

export default async function GalleryPage() {
  const watches = await getStoreWatches();
  const items = watches.flatMap((watch) =>
    watch.images
      .filter(Boolean)
      .map((image) => ({
        image,
        link: `/watches/${watch.id}`,
        title: watch.name,
        description: watch.description,
      })),
  );

  return (
    <main className="min-h-[70vh] bg-[#0a1412] p-6 sm:p-10">
      {items.length ? (
        <div className="mx-auto h-[min(70vh,600px)] max-w-7xl">
          <InfiniteMenu
            items={items}
            count={190}
            tileSize={0.63}
            roundness={0.2}
            zoom={1.75}
            pullBack={1}
            stretch={0.6}
            inertia={0.6}
            autoplay={3}
            grayscale={false}
            dim={0.5}
            intro
            showInfo
            theme="dark"
            accentColor="#ffffff"
          />
        </div>
      ) : (
        <p className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center text-center text-white/75">
          The gallery is waiting for its first watch. Check back after an item
          has been added in the admin.
        </p>
      )}
    </main>
  );
}
