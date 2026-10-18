import Link from 'next/link';
import { collections } from '@/lib/catalog';
import WatchImage from '@/components/WatchImage';
import Icon from '@/components/Icon';
export const metadata = { title: 'Collections' };
export default function Collections() {
  return (
    <div className="container section">
      <div className="page-intro compact">
        <p className="eyebrow">FOUR WAYS TO FIND YOUR AURA</p>
        <h1>The collections.</h1>
        <p>Different expressions. The same considered perspective.</p>
      </div>
      <div className="collection-grid collection-large">
        {collections.map((item) => (
          <Link href={`/collections/${item.slug}`} className="collection-card" key={item.slug}>
            <div className="collection-image">
              <WatchImage src={item.image} alt={`${item.name} collection`} />
              <span className="round-arrow">
                <Icon name="arrow" />
              </span>
            </div>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
