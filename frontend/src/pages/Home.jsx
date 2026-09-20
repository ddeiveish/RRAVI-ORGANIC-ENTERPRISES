import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, ArrowDown, MessageCircle } from "lucide-react";
import { Reveal, MaskedLine, Eyebrow } from "@/components/Reveal";
import Marquee from "@/components/Marquee";
import {
  CATEGORIES,
  HERO_IMAGES,
  MANIFESTO,
  MARQUEE_ITEMS,
  TOTAL_PRODUCTS,
  waLink,
  DEFAULT_WA_MESSAGE,
} from "@/data/catalog";
import { useQuote } from "@/context/QuoteContext";

const STATS = [
  { value: "08", label: "Product Verticals" },
  { value: `${TOTAL_PRODUCTS}+`, label: "Botanical Products" },
  { value: "100%", label: "Certified Partners" },
  { value: "24h", label: "Response Time" },
];

export default function Home() {
  const { openQuote } = useQuote();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <main data-testid="home-page">
      {/* ————— HERO ————— */}
      <section ref={heroRef} className="grain relative flex min-h-screen items-center overflow-hidden bg-forest-deep text-cream">
        <motion.div style={{ y: bgY }} className="absolute inset-0 scale-110">
          <img
            src={HERO_IMAGES.farm}
            alt="Organic farmland in India"
            className="h-full w-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/80 via-forest/55 to-forest-deep" />
        </motion.div>

        <motion.div style={{ opacity: contentOpacity }} className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-24 pt-36 sm:px-8">
          <Reveal delay={0.05} y={20}>
            <Eyebrow light>Agro · Herbal · Organic — Exports from India</Eyebrow>
          </Reveal>
          <h1 className="mt-6 font-display text-5xl font-medium leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl">
            <MaskedLine delay={0.15}>India's finest</MaskedLine>
            <MaskedLine delay={0.3}>
              <em className="italic text-amber">botanicals,</em>
            </MaskedLine>
            <MaskedLine delay={0.45}>shipped worldwide.</MaskedLine>
          </h1>
          <Reveal delay={0.65} className="mt-8 max-w-xl">
            <p className="text-base leading-relaxed text-mist sm:text-lg">
              Herbal extracts, cold-pressed oils, botanical powders and more — sourced from
              certified Indian growers and delivered to importers, distributors and businesses
              across the globe.
            </p>
          </Reveal>
          <Reveal delay={0.8} className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              to="/products"
              data-testid="hero-explore-btn"
              className="group inline-flex items-center gap-2 rounded-full bg-terra px-7 py-3.5 text-sm font-medium text-cream transition-colors duration-300 hover:bg-amber hover:text-forest-deep"
            >
              Explore the Catalogue
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <button
              data-testid="hero-quote-btn"
              onClick={() => openQuote("General Enquiry")}
              className="group inline-flex items-center gap-2 rounded-full border border-cream/25 px-7 py-3.5 text-sm font-medium text-cream transition-colors duration-300 hover:border-amber hover:text-amber"
            >
              Request a Quote
              <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </Reveal>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-mist"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <ArrowDown size={14} className="animate-floaty" />
        </motion.div>
      </section>

      {/* ————— MARQUEE ————— */}
      <Marquee
        items={MARQUEE_ITEMS}
        speed={70}
        className="border-y border-forest-deep/20 bg-terra py-5 text-cream"
        textClassName="font-display text-xl sm:text-2xl italic"
      />

      {/* ————— INTRO + STATS ————— */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>Who we are</Eyebrow>
              <h2 className="mt-5 font-display text-3xl font-medium leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                An India-based export house for <em className="italic text-terra">agro, herbal and natural</em> products.
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-sage sm:text-lg">
                We work with trusted, established and certified manufacturers and suppliers to
                source products that meet the standards of our overseas buyers — with dependable
                sourcing, consistent quality and clear communication throughout.
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <Link
                to="/about"
                data-testid="intro-about-link"
                className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-terra"
              >
                Our story
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-forest/10 bg-forest/10 lg:col-span-5">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={0.1 + i * 0.08} className="bg-cream">
                <div className="flex h-full flex-col justify-center p-6 sm:p-8" data-testid={`stat-${i}`}>
                  <span className="font-display text-4xl font-medium text-forest sm:text-5xl">{s.value}</span>
                  <span className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-sage">
                    {s.label}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ————— MANIFESTO CHAPTERS ————— */}
      <section className="bg-sand/60 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <Eyebrow>The way we work</Eyebrow>
            <h2 className="mt-5 max-w-2xl font-display text-3xl font-medium leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Four promises, kept on <em className="italic text-terra">every shipment.</em>
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-x-12 gap-y-14 md:grid-cols-2">
            {MANIFESTO.map((m, i) => (
              <Reveal key={m.num} delay={0.08 * i}>
                <div data-testid={`manifesto-chapter-${m.num}`} className="group border-t-2 border-forest/15 pt-8 transition-colors duration-500 hover:border-terra">
                  <span className="font-mono text-sm tracking-[0.2em] text-terra">{m.num}</span>
                  <h3 className="mt-4 font-display text-2xl font-medium sm:text-3xl">{m.title}</h3>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-sage sm:text-base">{m.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ————— CATEGORY BENTO ————— */}
      <section className="grain relative bg-forest py-24 text-cream sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <Reveal>
              <Eyebrow light>The catalogue</Eyebrow>
              <h2 className="mt-5 max-w-xl font-display text-3xl font-medium leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                Eight verticals. <em className="italic text-amber">One standard of purity.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <Link
                to="/products"
                data-testid="bento-view-all-btn"
                className="group inline-flex items-center gap-2 rounded-full border border-cream/20 px-6 py-3 text-sm font-medium transition-colors duration-300 hover:border-amber hover:text-amber"
              >
                View full catalogue
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((c, i) => {
              const count = c.groups.reduce((s, g) => s + g.items.length, 0);
              return (
                <Reveal
                  key={c.id}
                  delay={0.05 * (i % 3)}
                  className={i === 0 ? "sm:col-span-2" : ""}
                >
                  <Link
                    to={`/products#${c.id}`}
                    data-testid={`home-cat-card-${c.id}`}
                    className="group relative block overflow-hidden rounded-3xl"
                  >
                    <img
                      src={c.image}
                      alt={c.name}
                      loading="lazy"
                      className={`w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
                        i === 0 ? "aspect-[2/1] sm:aspect-[2.35/1]" : "aspect-[4/3]"
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/90 via-forest-deep/25 to-transparent transition-opacity duration-500" />
                    <span className="absolute left-5 top-5 font-mono text-xs tracking-[0.25em] text-amber">
                      {c.num}
                    </span>
                    <span className="glass-dark absolute right-5 top-5 rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-cream/90">
                      {count} products
                    </span>
                    <div className="absolute inset-x-5 bottom-5">
                      <h3 className="font-display text-xl font-medium sm:text-2xl">{c.name}</h3>
                      <span className="mt-2 inline-flex items-center gap-1.5 text-xs text-mist transition-colors duration-300 group-hover:text-amber">
                        Explore category
                        <ArrowUpRight size={13} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ————— IMAGE STATEMENT ————— */}
      <section className="relative overflow-hidden">
        <img
          src={HERO_IMAGES.sorting}
          alt="Traditional herb sorting in India"
          loading="lazy"
          className="h-[70vh] w-full object-cover"
        />
        <div className="absolute inset-0 bg-forest-deep/55" />
        <div className="absolute inset-0 flex items-center justify-center px-5">
          <Reveal>
            <p className="mx-auto max-w-3xl text-center font-display text-2xl font-medium leading-snug text-cream sm:text-3xl lg:text-4xl">
              "Making sourcing from India <em className="italic text-amber">simple, reliable and transparent</em> — for every buyer we serve."
            </p>
          </Reveal>
        </div>
      </section>

      {/* ————— CTA ————— */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <div className="grain relative overflow-hidden rounded-[2.5rem] bg-forest px-6 py-16 text-center text-cream sm:px-12 sm:py-24">
            <Eyebrow light>Ready when you are</Eyebrow>
            <h2 className="mx-auto mt-5 max-w-2xl font-display text-3xl font-medium leading-tight sm:text-4xl lg:text-5xl">
              Tell us what you need. <em className="italic text-amber">We'll source it.</em>
            </h2>
            <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-mist sm:text-base">
              Share your product list, grades and destination — we'll come back with pricing and
              lead times within one business day.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <button
                data-testid="cta-quote-btn"
                onClick={() => openQuote("General Enquiry")}
                className="group inline-flex items-center gap-2 rounded-full bg-terra px-7 py-3.5 text-sm font-medium text-cream transition-colors duration-300 hover:bg-amber hover:text-forest-deep"
              >
                Request a Quote
                <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
              <a
                data-testid="cta-whatsapp-btn"
                href={waLink(DEFAULT_WA_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-cream/25 px-7 py-3.5 text-sm font-medium transition-colors duration-300 hover:border-amber hover:text-amber"
              >
                <MessageCircle size={16} /> Chat on WhatsApp
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
