import {
  BadgeCheck,
  FlaskConical,
  HandCoins,
  MessagesSquare,
  Layers,
  Handshake,
  Check,
  X,
  ArrowUpRight,
} from "lucide-react";
import { Reveal, Eyebrow } from "@/components/Reveal";
import { useQuote } from "@/context/QuoteContext";

const PILLARS = [
  {
    icon: BadgeCheck,
    title: "Certified Partner Network",
    text: "Every manufacturer and supplier in our network is established, trusted and certified.",
  },
  {
    icon: FlaskConical,
    title: "Consistent Product Quality",
    text: "Buyer specifications are honoured lot after lot, shipment after shipment.",
  },
  {
    icon: HandCoins,
    title: "Competitive Pricing",
    text: "Direct sourcing relationships keep pricing sharp without cutting corners on grade.",
  },
  {
    icon: MessagesSquare,
    title: "Clear Communication",
    text: "One point of contact and honest updates at every step of the buying process.",
  },
  {
    icon: Layers,
    title: "Hundreds of Botanicals, One Partner",
    text: "Eight product verticals under a single roof — consolidate your sourcing with us.",
  },
  {
    icon: Handshake,
    title: "Built for Long-Term",
    text: "We grow when you grow. Partnerships, not purchase orders.",
  },
];

const COMPARISON = [
  {
    aspect: "Sourcing",
    us: "Vetted, certified manufacturers only",
    them: "Mixed, often unverified sources",
  },
  {
    aspect: "Quality",
    us: "Consistent specs on every shipment",
    them: "Varies from order to order",
  },
  {
    aspect: "Pricing",
    us: "Direct-from-source, competitive",
    them: "Layered middleman margins",
  },
  {
    aspect: "Communication",
    us: "Single contact, honest timelines",
    them: "Slow, fragmented updates",
  },
  {
    aspect: "Relationship",
    us: "Built for long-term partnership",
    them: "Transactional, order-by-order",
  },
];

export default function WhyUs() {
  const { openQuote } = useQuote();

  return (
    <main data-testid="why-us-page">
      <section className="grain relative bg-forest-deep pb-20 pt-36 text-cream sm:pt-44">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal y={20}>
            <Eyebrow light>Why Us</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 max-w-3xl font-display text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Sourcing from India, <em className="italic text-amber">minus the risk.</em>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-mist sm:text-lg">
              International buying is built on trust. Here's exactly how we earn it — and keep it.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={0.06 * (i % 3)}>
              <div
                data-testid={`pillar-card-${i}`}
                className="group h-full rounded-3xl border border-forest/10 bg-white/50 p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-terra/40 hover:shadow-[0_20px_50px_-20px_rgba(217,107,39,0.35)]"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-forest text-cream transition-colors duration-500 group-hover:bg-terra">
                  <p.icon size={20} />
                </span>
                <h3 className="mt-6 font-display text-xl font-medium sm:text-2xl">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-sage">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-sand/60 py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <Reveal>
            <Eyebrow>The honest comparison</Eyebrow>
            <h2 className="mt-5 max-w-2xl font-display text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
              RRAVI vs. the <em className="italic text-terra">typical trader.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <div data-testid="comparison-table" className="mt-12 overflow-hidden rounded-3xl border border-forest/10 bg-cream">
              <div className="grid grid-cols-[1fr_1.4fr_1.4fr] gap-px bg-forest/10 max-sm:grid-cols-[0.8fr_1.2fr_1.2fr]">
                <div className="bg-forest p-4 font-mono text-[10px] uppercase tracking-[0.2em] text-mist sm:p-5 sm:text-[11px]">
                  Aspect
                </div>
                <div className="bg-terra p-4 font-mono text-[10px] uppercase tracking-[0.2em] text-cream sm:p-5 sm:text-[11px]">
                  RRAVI Organic
                </div>
                <div className="bg-forest-deep p-4 font-mono text-[10px] uppercase tracking-[0.2em] text-mist sm:p-5 sm:text-[11px]">
                  Typical Trader
                </div>
                {COMPARISON.map((row) => (
                  <div key={row.aspect} className="contents">
                    <div className="bg-cream p-4 text-sm font-medium text-forest sm:p-5">{row.aspect}</div>
                    <div className="flex items-start gap-2 bg-cream p-4 text-sm text-ink sm:p-5">
                      <Check size={15} className="mt-0.5 shrink-0 text-terra" />
                      {row.us}
                    </div>
                    <div className="flex items-start gap-2 bg-cream p-4 text-sm text-sage sm:p-5">
                      <X size={15} className="mt-0.5 shrink-0 text-sage/60" />
                      {row.them}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <Reveal>
          <div className="grain relative overflow-hidden rounded-[2.5rem] bg-forest px-6 py-16 text-center text-cream sm:px-12 sm:py-20">
            <Eyebrow light>Put us to the test</Eyebrow>
            <h2 className="mx-auto mt-5 max-w-2xl font-display text-3xl font-medium leading-tight sm:text-4xl">
              Send one enquiry. <em className="italic text-amber">Judge us on the reply.</em>
            </h2>
            <button
              data-testid="whyus-quote-btn"
              onClick={() => openQuote("General Enquiry")}
              className="group mt-9 inline-flex items-center gap-2 rounded-full bg-terra px-7 py-3.5 text-sm font-medium text-cream transition-colors duration-300 hover:bg-amber hover:text-forest-deep"
            >
              Request a Quote
              <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
