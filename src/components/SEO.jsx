const SITE_URL = "https://www.mginstallations.co.za";
const DEFAULT_IMAGE = `${SITE_URL}/images/Raja-1200px.webp`;
const PHONE = "+27606038238";

const SERVICE_AREAS = [
  "Ladysmith", "Steadville", "Ezakheni A–E", "Watersmeet",
  "Besters", "Colenso", "Roosboom", "Waaihoek",
  "Umbulwana", "Matiwane", "Winterton", "Bergville",
  "Ekuvukeni", "Limehill", "Vaalkop", "Uitval",
];

const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "MG Installations",
  "image": DEFAULT_IMAGE,
  "url": SITE_URL,
  "telephone": PHONE,
  "email": "info@mginstallations.co.za",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Shop 19, Ladysmith Game Centre",
    "addressLocality": "Ladysmith",
    "addressRegion": "KwaZulu-Natal",
    "addressCountry": "ZA",
  },
  "areaServed": SERVICE_AREAS.map((name) => ({ "@type": "City", name })),
  "priceRange": "$$",
};

export default function SEO({ title, description, path, image = DEFAULT_IMAGE, schema }) {
  const url = `${SITE_URL}${path}`;
  const schemas = [LOCAL_BUSINESS_SCHEMA, ...(schema ? (Array.isArray(schema) ? schema : [schema]) : [])];

  // title/meta/link below are hoisted into the real <head> automatically by React 19,
  // even though SEO renders deep inside the page tree — no Helmet/portal library needed.
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="MG Installations" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(s)}</script>
      ))}
    </>
  );
}
