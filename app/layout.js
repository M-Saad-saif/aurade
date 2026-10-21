import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { StoreProvider } from "@/components/StoreProvider";
import { getCatalog } from "@/lib/watches";
import Sociallinks from "@/components/Sociallinks";

export const dynamic = "force-dynamic";

const SITE_URL = "https://aurade.vercel.app";

export const metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Aurade | Premium Watches for Every Moment",
    template: "%s | Aurade",
  },

  description:
    "Discover Aurade watches, where timeless design meets everyday style. Explore our curated collection of elegant watches and find a timepiece that reflects your personality.",

  applicationName: "Aurade",

  keywords: [
    "Aurade",
    "Aurade watches",
    "watches online",
    "premium watches",
    "stylish watches",
    "men's watches",
    "women's watches",
    "elegant wristwatches",
    "classic watches",
    "modern watches",
    "fashion watches",
  ],

  authors: [{ name: "Aurade" }],
  creator: "Aurade",
  publisher: "Aurade",


  icons: {
    icon: [
      { url: "/images/logo.png", type: "image/png" },
    ],
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },

  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Aurade",
    title: "Aurade | Premium Watches for Every Moment",
    description:
      "Explore elegant, timeless watches designed to complement your personal style. Find your next favorite timepiece with Aurade.",
    locale: "en_US",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Aurade — timeless watches and refined style",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Aurade | Premium Watches for Every Moment",
    description:
      "Discover elegant watches and timeless designs for every moment with Aurade.",
    images: ["/images/logo.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  category: "shopping",
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
          <Sociallinks />
        </StoreProvider>
      </body>
    </html>
  );
}
