import { Phone, Mail, MessageCircle, MapPin, Clock } from "lucide-react";
import { Reveal, Eyebrow } from "@/components/Reveal";
import EnquiryForm from "@/components/EnquiryForm";
import { CONTACT, waLink, DEFAULT_WA_MESSAGE } from "@/data/catalog";

export default function Contact() {
  return (
    <main data-testid="contact-page">
      <section className="grain relative bg-forest-deep pb-20 pt-36 text-cream sm:pt-44">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal y={20}>
            <Eyebrow light>Contact</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 max-w-3xl font-display text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Let's talk about <em className="italic text-amber">your next shipment.</em>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-mist sm:text-lg">
              Form, phone or WhatsApp - whichever suits you. We reply within one business day.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="space-y-4 lg:col-span-5">
            <Reveal>
              <a
                data-testid="contact-whatsapp-card"
                href={waLink(DEFAULT_WA_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-3xl bg-terra p-7 text-cream transition-all duration-500 hover:-translate-y-1 hover:bg-forest hover:shadow-[0_20px_50px_-20px_rgba(217,107,39,0.5)]"
              >
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-cream/70">
                    Fastest response
                  </span>
                  <h2 className="mt-2 font-display text-2xl font-medium">WhatsApp us directly</h2>
                  <p className="mt-1 text-sm text-cream/80">{CONTACT.phones[0]}</p>
                </div>
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-cream/15 transition-transform duration-300 group-hover:scale-110">
                  <MessageCircle size={20} />
                </span>
              </a>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-forest/10 bg-white/50 p-7">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-forest text-cream">
                  <Phone size={16} />
                </span>
                <h3 className="mt-4 font-display text-xl font-medium">Call us</h3>
                <div className="mt-3 space-y-2 text-sm">
                  {CONTACT.phones.map((p) => (
                    <a
                      key={p}
                      data-testid={`contact-phone-${p.replace(/\s/g, "")}`}
                      href={`tel:${p.replace(/\s/g, "")}`}
                      className="block text-ink transition-colors hover:text-terra"
                    >
                      {p}
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="rounded-3xl border border-forest/10 bg-white/50 p-7">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-forest text-cream">
                  <Mail size={16} />
                </span>
                <h3 className="mt-4 font-display text-xl font-medium">Write to us</h3>
                <div className="mt-3 space-y-2 text-sm">
                  {CONTACT.emails.map((e) => (
                    <a
                      key={e}
                      data-testid={`contact-email-${e.split("@")[0]}`}
                      href={`mailto:${e}`}
                      className="block break-all text-ink transition-colors hover:text-terra"
                    >
                      {e}
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="flex flex-wrap gap-x-8 gap-y-3 rounded-3xl border border-forest/10 bg-white/50 p-7 text-sm text-sage">
                <span className="flex items-center gap-2">
                  <MapPin size={15} className="text-terra" /> {CONTACT.person} · {CONTACT.location}
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={15} className="text-terra" /> Replies within 24 hours
                </span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="lg:col-span-7">
            <div className="rounded-[1.75rem] border border-forest/10 bg-white/60 p-6 shadow-[0_24px_60px_-30px_rgba(6,21,15,0.35)] sm:p-10">
              <Eyebrow>Send an enquiry</Eyebrow>
              <h2 className="mt-4 font-display text-2xl font-medium sm:text-3xl">
                Tell us what you're <em className="italic text-terra">sourcing.</em>
              </h2>
              <div className="mt-8">
                <EnquiryForm idPrefix="contact" defaultCategory="General Enquiry" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
