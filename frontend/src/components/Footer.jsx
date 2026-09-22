import { Link } from "react-router-dom";
import { Phone, Mail, MessageCircle, ArrowUp, ArrowUpRight } from "lucide-react";
import Logo from "@/components/Logo";
import { CONTACT, CATEGORIES, waLink, DEFAULT_WA_MESSAGE } from "@/data/catalog";
import { useQuote } from "@/context/QuoteContext";

export default function Footer() {
  const { openQuote } = useQuote();
  const year = new Date().getFullYear();

  const toTop = () => {
    if (window.lenis) window.lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer data-testid="site-footer" className="grain relative overflow-hidden bg-forest-deep text-cream">
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-20 sm:px-8 sm:pt-28">
        <div className="mb-16 flex flex-col gap-8 border-b border-cream/10 pb-16 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-xl font-display text-3xl font-medium leading-tight sm:text-4xl lg:text-5xl">
            Let's build your <em className="italic text-amber">supply chain</em>, from the soil up.
          </h2>
          <div className="flex flex-wrap gap-3">
            <button
              data-testid="footer-quote-btn"
              onClick={() => openQuote("General Enquiry")}
              className="group inline-flex items-center gap-2 rounded-full bg-terra px-6 py-3 text-sm font-medium text-cream transition-colors duration-300 hover:bg-amber hover:text-forest-deep"
            >
              Request a Quote
              <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            <a
              data-testid="footer-whatsapp-link"
              href={waLink(DEFAULT_WA_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-cream/20 px-6 py-3 text-sm font-medium text-cream transition-colors duration-300 hover:border-amber hover:text-amber"
            >
              <MessageCircle size={16} /> WhatsApp Us
            </a>
          </div>
        </div>

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2.5">
              <Logo size={38} />
              <span className="leading-none">
                <span className="block font-display text-lg font-semibold tracking-wide">RRAVI</span>
                <span className="block font-mono text-[9px] uppercase tracking-[0.28em] text-mist">
                  Organic Enterprises
                </span>
              </span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-mist">
              Making sourcing from India simple, reliable and transparent — for importers,
              distributors and businesses worldwide.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-amber">Explore</h3>
            <ul className="space-y-2.5 text-sm text-cream/80">
              <li><Link data-testid="footer-link-home" className="transition-colors hover:text-amber" to="/">Home</Link></li>
              <li><Link data-testid="footer-link-products" className="transition-colors hover:text-amber" to="/products">Products</Link></li>
              <li><Link data-testid="footer-link-about" className="transition-colors hover:text-amber" to="/about">About Us</Link></li>
              <li><Link data-testid="footer-link-why-us" className="transition-colors hover:text-amber" to="/why-us">Why Us</Link></li>
              <li><Link data-testid="footer-link-contact" className="transition-colors hover:text-amber" to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-amber">Verticals</h3>
            <ul className="space-y-2.5 text-sm text-cream/80">
              {CATEGORIES.slice(0, 4).map((c) => (
                <li key={c.id}>
                  <Link
                    data-testid={`footer-cat-${c.id}`}
                    className="transition-colors hover:text-amber"
                    to={`/products#${c.id}`}
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link data-testid="footer-cat-all" className="text-amber transition-colors hover:text-cream" to="/products">
                  View all eight →
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-amber">Contact</h3>
            <ul className="space-y-3 text-sm text-cream/80">
              <li className="text-cream">{CONTACT.person} — {CONTACT.location}</li>
              {CONTACT.phones.map((p) => (
                <li key={p}>
                  <a data-testid={`footer-phone-${p.replace(/\s/g, "")}`} href={`tel:${p.replace(/\s/g, "")}`} className="flex items-center gap-2 transition-colors hover:text-amber">
                    <Phone size={14} className="text-terra" /> {p}
                  </a>
                </li>
              ))}
              <li>
                <a data-testid="footer-email" href={`mailto:${CONTACT.emails[0]}`} className="flex items-center gap-2 break-all transition-colors hover:text-amber">
                  <Mail size={14} className="shrink-0 text-terra" /> {CONTACT.emails[0]}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-8 sm:flex-row">
          <p className="text-xs text-mist">
            © {year} RRAVI ORGANIC ENTERPRISES · Sourced in India, delivered worldwide.
          </p>
          <button
            data-testid="back-to-top-btn"
            onClick={toTop}
            className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-mist transition-colors hover:text-amber"
          >
            Back to top <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
