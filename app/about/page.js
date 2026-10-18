import Link from 'next/link';
import WatchImage from '@/components/WatchImage';
import { photos } from '@/lib/catalog';
export const metadata = { title: 'Our story' };
export default function About() {
  return (
    <>
      <section className="container section about-grid">
        <div>
          <p className="eyebrow">AURA + TRADE</p>
          <h1>
            A personal
            <br />
            perspective
            <br />
            on time.
          </h1>
          <p className="lead">
            Some things do more than serve a purpose. They become part of your presence.
          </p>
          <p>
            Aurade began with a simple idea: finding a watch should feel considered, personal and
            inspiring. Aura is what you bring. Trade is the discovery of something that belongs in
            your world.
          </p>
          <p>
            This storefront brings that idea to life through a small illustrative collection, quiet
            design and a shopping experience that gives the details room to speak.
          </p>
          <Link href="/shop" className="button">
            Explore the collection
          </Link>
        </div>
        <WatchImage src={photos.wrist} alt="Minimal watch photographed on a wrist" priority />
      </section>
      <section className="manifesto">
        <div className="container">
          <p className="eyebrow">OUR POINT OF VIEW</p>
          <h2>
            Less noise.
            <br />
            More meaning.
          </h2>
          <p>Considered choices. Distinctive details. Your own sense of time.</p>
        </div>
      </section>
    </>
  );
}
