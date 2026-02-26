import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://wethinkdesign.github.io"),
  title: "WeThink 維想室內裝修設計工作室 — Wethink Design Studio",
  description:
    "WeThink 維想室內裝修設計工作室，以人為本的空間設計，打造有溫度的生活場域。提供住宅設計、商業空間、辦公空間規劃服務。",
  keywords: "室內設計, interior design, 維想, WeThink, 空間設計, 住宅設計, 商業空間",
  openGraph: {
    title: "WeThink 維想 — Wethink Design Studio",
    description: "以人為本的空間設計，打造有溫度的生活場域",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "name": "WeThink 維想室內裝修設計工作室",
    "image": "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80",
    "description": "以人為本的空間設計，打造有溫度的生活場域。提供住宅設計、商業空間、辦公空間規劃服務。",
    "url": "https://wethinkdesign.github.io",
    "telephone": "+886-2-2700-1234",
    "email": "hello@wethink-design.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "敦化南路一段 168 號 5F",
      "addressLocality": "大安區",
      "addressRegion": "台北市",
      "addressCountry": "TW"
    },
    "sameAs": [
      "https://www.instagram.com/wethink__design/",
      "https://line.me/"
    ]
  };

  return (
    <html lang="zh-Hant">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
