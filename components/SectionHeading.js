import Link from 'next/link';
import Icon from './Icon';
export default function SectionHeading({ eyebrow, title, href, label = 'Explore all' }) {
  return (
    <div className="section-heading">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2>{title}</h2>
      </div>
      {href && (
        <Link href={href} className="text-link">
          {label}
          <Icon name="arrow" size={18} />
        </Link>
      )}
    </div>
  );
}
