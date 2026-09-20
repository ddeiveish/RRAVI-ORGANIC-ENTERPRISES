import { Sprout, ShieldCheck, Handshake, Eye, Phone, Mail, MessageCircle } from "lucide-react";
import { Reveal, Eyebrow } from "@/components/Reveal";
import { CONTACT, HERO_IMAGES, waLink, DEFAULT_WA_MESSAGE } from "@/data/catalog";
import { useQuote } from "@/context/QuoteContext";

const VALUES = [
  {
    icon: Sprout,
    title: "Sourcing with Integrity",
    text: "Only trusted, established and certified manufacturers and suppliers make it into our network.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Without Compromise",
    text: "Every product is sourced against the standards of our overseas buyers — and held to them.",
  },
  {
    icon: Handshake,
    title: "Relationships First",
    text: "We build long-term partnerships with importers and distributors, not one-off transactions.",
  },
  {
    icon: Eye,
    title: "Radical Transparency",
    text: "Clear communication throughout the buying process — from first quote to final delivery.",
  },
];

export default function About() {
  const { openQuote } = useQuote();

  return (
    <main data-testid="about-page">
      <section className="grain relative bg-forest-deep pb-20 pt-36 text-cream sm:pt-44">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal y={20}>
            <Eyebrow light>About Us</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 max-w-3xl font-display text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Rooted in India. <em className="italic text-amber">Trusted worldwide.</em>
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Reveal>
              <Eyebrow>Our story</Eyebrow>
              <h2 className="mt-5 font-display text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
                An export house built on <em className="italic text-terra">dependability.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="mt-6 space-y-5 text-sm leading-relaxed text-sage sm:text-base">
                <p>
                  RRAVI ORGANIC ENTERPRISES is an India-based export and sourcing company offering
                  a range of agro, food, organic, herbal and natural products for international
                  markets.
                </p>
                <p>
                  We work with trusted, established and certified manufacturers and suppliers to
                  source products that meet the standards of our overseas buyers. Our focus is on
                  dependable sourcing, consistent product quality, competitive pricing and clear
                  communication throughout the buying process.
                </p>
                <p>
                  We aim to build long-term relationships with our importers, distributors and
                  businesses worldwide by making sourcing from India simple, reliable and
                  transparent.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <button
                data-testid="about-quote-btn"
                onClick={() => openQuote("General Enquiry")}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-medium text-cream transition-colors duration-300 hover:bg-terra"
              >
                Start a Conversation
              </button>
            </Reveal>
          </div>
          <Reveal delay={0.15} className="lg:col-span-6">
            <div className="group relative overflow-hidden rounded-[1.75rem] shadow-[0_24px_60px_-24px_rgba(6,21,15,0.45)]">
              <img
                src={HERO_IMAGES.sorting}
                alt="Careful sorting of botanical produce"
                loading="lazy"
                className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 sm:aspect-[5/5]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/60 via-transparent to-transparent" />
              <span className="glass-dark absolute bottom-5 left-5 rounded-full px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-cream/90">
                Origin · India
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-sand/60 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <Eyebrow>What we stand for</Eyebrow>
            <h2 className="mt-5 max-w-2xl font-display text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
              Values that travel with <em className="italic text-terra">every consignment.</em>
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={0.08 * i}>
                <div
                  data-testid={`value-card-${i}`}
                  className="group h-full rounded-3xl border border-forest/10 bg-cream p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-terra/40 hover:shadow-[0_20px_50px_-20px_rgba(217,107,39,0.35)]"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-forest text-cream transition-colors duration-500 group-hover:bg-terra">
                    <v.icon size={19} />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-medium">{v.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-sage">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <Reveal>
          <div className="grain relative overflow-hidden rounded-[2.5rem] bg-forest px-6 py-14 text-cream sm:px-12 sm:py-16">
            <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-lg">
                <Eyebrow light>The person behind it</Eyebrow>
                <h2 className="mt-4 font-display text-3xl font-medium leading-tight sm:text-4xl">
                  {CONTACT.person}
                </h2>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.25em] text-mist">
                  Founder · {CONTACT.location}
                </p>
                <p className="mt-5 text-sm leading-relaxed text-mist sm:text-base">
                  One point of contact from your first enquiry to your final delivery. Reach out
                  directly — no call centres, no runaround.
                </p>
              </div>
              <div className="space-y-3 text-sm">
                {CONTACT.phones.map((p) => (
                  <a
                    key={p}
                    data-testid={`about-phone-${p.replace(/\s/g, "")}`}
                    href={`tel:${p.replace(/\s/g, "")}`}
                    className="flex items-center gap-3 text-cream/85 transition-colors hover:text-amber"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/15">
                      <Phone size={14} className="text-amber" />
                    </span>
                    {p}
                  </a>
                ))}
                <a
                  data-testid="about-email"
                  href={`mailto:${CONTACT.emails[0]}`}
                  className="flex items-center gap-3 break-all text-cream/85 transition-colors hover:text-amber"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cream/15">
                    <Mail size={14} className="text-amber" />
                  </span>
                  {CONTACT.emails[0]}
                </a>
                <a
                  data-testid="about-whatsapp"
                  href={waLink(DEFAULT_WA_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-cream/85 transition-colors hover:text-amber"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/15">
                    <MessageCircle size={14} className="text-amber" />
                  </span>
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
