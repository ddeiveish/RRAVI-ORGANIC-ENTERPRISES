import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ArrowUpRight, Plus } from "lucide-react";
import { Reveal, Eyebrow, EASE } from "@/components/Reveal";
import { motion } from "framer-motion";
import { CATEGORIES } from "@/data/catalog";
import { useQuote } from "@/context/QuoteContext";

const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.lenis) window.lenis.scrollTo(el, { offset: -120 });
  else el.scrollIntoView({ behavior: "smooth", block: "start" });
};

export default function Products() {
  const { openQuote } = useQuote();
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const t = setTimeout(() => scrollToId(location.hash.slice(1)), 400);
    return () => clearTimeout(t);
  }, [location.hash]);

  return (
    <main data-testid="products-page">
      {/* ————— HEADER ————— */}
      <section className="grain relative bg-forest-deep pb-20 pt-36 text-cream sm:pt-44">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal y={20}>
            <Eyebrow light>Export Catalogue</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 max-w-3xl font-display text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Eight verticals, <em className="italic text-amber">hundreds</em> of botanicals.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-mist sm:text-lg">
              Every category below ships with buyer-matched specifications, grades and packaging.
              Don't see a product? Ask — our sourcing network goes well beyond this list.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ————— STICKY CATEGORY NAV ————— */}
      <div className="glass-light sticky top-16 z-30 border-b border-forest/10 md:top-20">
        <div className="no-scrollbar mx-auto flex max-w-7xl gap-2 overflow-x-auto px-5 py-3 sm:px-8">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              data-testid={`catnav-${c.id}`}
              onClick={() => scrollToId(c.id)}
              className="whitespace-nowrap rounded-full border border-forest/15 px-4 py-1.5 text-xs font-medium text-forest transition-colors duration-300 hover:border-terra hover:bg-terra hover:text-cream"
            >
              <span className="mr-1.5 font-mono text-[10px] text-terra">{c.num}</span>
              {c.short}
            </button>
          ))}
        </div>
      </div>

      {/* ————— CATEGORY SECTIONS ————— */}
      {CATEGORIES.map((c, i) => {
        const count = c.groups.reduce((s, g) => s + g.items.length, 0);
        const flip = i % 2 === 1;
        return (
          <section
            key={c.id}
            id={c.id}
            data-testid={`category-section-${c.id}`}
            className={`py-16 sm:py-24 ${i % 2 ? "bg-sand/50" : "bg-cream"}`}
          >
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
              <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
                <Reveal className={`lg:col-span-5 ${flip ? "lg:order-2" : ""}`}>
                  <div className="group relative overflow-hidden rounded-[1.75rem] shadow-[0_24px_60px_-24px_rgba(6,21,15,0.45)]">
                    <img
                      src={c.image}
                      alt={c.name}
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/70 via-transparent to-transparent" />
                    <span className="absolute bottom-5 left-5 font-display text-6xl font-medium text-cream/90 sm:text-7xl">
                      {c.num}
                    </span>
                    <span className="glass-dark absolute right-5 top-5 rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-cream/90">
                      {count} products
                    </span>
                  </div>
                </Reveal>

                <div className={`lg:col-span-7 ${flip ? "lg:order-1" : ""}`}>
                  <Reveal>
                    <span className="font-mono text-xs tracking-[0.25em] text-terra">
                      Category {c.num} / 08
                    </span>
                    <h2 className="mt-4 font-display text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
                      {c.name}
                    </h2>
                    <p className="mt-4 max-w-xl text-sm leading-relaxed text-sage sm:text-base">
                      {c.tagline}
                    </p>
                  </Reveal>

                  <div className="mt-8 space-y-7">
                    {c.groups.map((g, gi) => (
                      <Reveal key={g.title} delay={0.06 * gi}>
                        <h3 className="font-mono text-[11px] uppercase tracking-[0.24em] text-terra">
                          {g.title}
                        </h3>
                        <motion.div
                          className="mt-3 flex flex-wrap gap-2"
                          initial="hidden"
                          whileInView="show"
                          viewport={{ once: true, margin: "-30px" }}
                          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.022 } } }}
                        >
                          {g.items.map((item) => (
                            <motion.button
                              type="button"
                              key={item}
                              data-testid={`chip-${c.id}-${item.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                              onClick={() => openQuote(c.name, item)}
                              title={`Enquire about ${item}`}
                              variants={{
                                hidden: { opacity: 0, y: 14, scale: 0.9 },
                                show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: EASE } },
                              }}
                              className="chip-press group/chip inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-forest/15 bg-white/60 px-3.5 py-1.5 text-[13px] text-ink hover:border-terra hover:bg-terra hover:text-cream"
                            >
                              {item}
                              <Plus
                                size={11}
                                className="opacity-0 transition-opacity duration-300 group-hover/chip:opacity-100"
                              />
                            </motion.button>
                          ))}
                        </motion.div>
                      </Reveal>
                    ))}
                  </div>

                  <Reveal delay={0.1}>
                    <button
                      data-testid={`quote-btn-${c.id}`}
                      onClick={() => openQuote(c.name)}
                      className="group mt-9 inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-medium text-cream transition-colors duration-300 hover:bg-terra"
                    >
                      Request Quote — {c.short}
                      <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  </Reveal>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* ————— CLOSING NOTE ————— */}
      <section className="grain bg-forest-deep py-20 text-center text-cream sm:py-28">
        <Reveal>
          <div className="mx-auto max-w-2xl px-5">
            <Eyebrow light>Custom sourcing</Eyebrow>
            <h2 className="mt-5 font-display text-3xl font-medium leading-tight sm:text-4xl">
              Need something <em className="italic text-amber">not on this list?</em>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-mist sm:text-base">
              Our network of certified growers and processors spans the length of India. Send us
              your specification and we'll source it.
            </p>
            <button
              data-testid="products-custom-quote-btn"
              onClick={() => openQuote("General Enquiry")}
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-terra px-7 py-3.5 text-sm font-medium text-cream transition-colors duration-300 hover:bg-amber hover:text-forest-deep"
            >
              Send a Custom Requirement
              <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
