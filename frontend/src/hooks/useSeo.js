import { useEffect } from "react";

const SITE = "RRAVI ORGANIC ENTERPRISES";
const OG_IMAGE =
  "https://res.cloudinary.com/dcf0cpuqf/image/upload/IMG-20260922-WA0016_viwkpg.jpg";

function upsertMeta(attr, key, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * Keeps per-route SEO metadata in sync (title, description, canonical, Open
 * Graph and Twitter tags). Optional JSON-LD structured data is injected while
 * the page is mounted and removed on unmount.
 */
export function useSeo({ title, description, path = "", image = OG_IMAGE, jsonLd }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE}` : `${SITE} - Botanical & Organic Exports from India`;
    const url = `${window.location.origin}${path}`;

    document.title = fullTitle;
    upsertMeta("name", "description", description);
    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:image", image);
    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", image);
    upsertCanonical(url);

    let script;
    if (jsonLd) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-seo", "route");
      script.text = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
    return () => {
      if (script) script.remove();
    };
  }, [title, description, path, image, jsonLd]);
}
