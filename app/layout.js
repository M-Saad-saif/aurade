import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { StoreProvider } from '@/components/StoreProvider';
import { getCatalog } from '@/lib/watches';
export const dynamic = 'force-dynamic';
export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: { default: 'Aurade | Time, with an aura.', template: '%s | Aurade' },
  description:
    'Explore a considered collection of watches. A premium demonstration storefront with a personal sense of time.',
};
export default async function RootLayout({ children }) {
  const catalog = await getCatalog();
  return (
    <html lang="en">
      <body>
        <StoreProvider catalog={catalog}>
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
