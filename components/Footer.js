import Link from 'next/link';
import Newsletter from './Newsletter';
const groups = [
  [
    'Explore',
    [
      ['All watches', '/shop'],
      ['Collections', '/collections'],
      ['Wishlist', '/wishlist'],
      ['Shopping bag', '/cart'],
    ],
  ],
  [
    'Aurade',
    [
      ['Our story', '/about'],
      ['The journal', '/journal'],
      ['Sell / trade', '/trade'],
      ['Contact', '/contact'],
    ],
  ],
  [
    'Information',
    [
      ['Shipping', '/support/shipping'],
      ['Returns', '/support/returns'],
      ['Watch care', '/support/care'],
      ['FAQ', '/support/faq'],
    ],
  ],
];
export default function Footer() {
  return (
    <>
      <Newsletter />
      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <Link href="/" className="wordmark">
              AURADE
            </Link>
            <p>Time, with an aura.</p>
            <p className="muted footer-note">
              A thoughtfully designed watch storefront.
              <br />
              Demonstration collection, not a live retailer.
            </p>
          </div>
          {groups.map(([title, links]) => (
            <div key={title}>
              <h3>{title}</h3>
              {links.map(([label, href]) => (
                <Link key={href} href={href}>
                  {label}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} Aurade. Demo storefront.</span>
          <div>
            <Link href="/support/privacy">Privacy</Link>
            <Link href="/support/terms">Terms</Link>
            <span>USD $</span>
          </div>
        </div>
      </footer>
    </>
  );
}
