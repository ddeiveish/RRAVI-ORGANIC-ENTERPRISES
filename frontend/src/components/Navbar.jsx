import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, Menu, X, ArrowUpRight } from "lucide-react";
import { useQuote } from "@/context/QuoteContext";

const LINKS = [
  { name: "Home", path: "/", id: "home" },
  { name: "Products", path: "/products", id: "products" },
  { name: "About Us", path: "/about", id: "about" },
  { name: "Why Us", path: "/why-us", id: "why-us" },
  { name: "Contact", path: "/contact", id: "contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { openQuote } = useQuote();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <>
      <header
        data-testid="main-navbar"
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-500 glass-dark border-b border-cream/10 ${
          scrolled ? "shadow-[0_12px_40px_-16px_rgba(6,21,15,0.7)]" : ""
        }`}
      >
        <div className="mx-auto flex h-16 md:h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link to="/" data-testid="nav-logo" className="group flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-terra text-cream transition-transform duration-500 group-hover:rotate-[20deg]">
              <Leaf className="h-4.5 w-4.5" size={18} />
            </span>
            <span className="leading-none">
              <span className="block font-display text-lg font-semibold tracking-wide text-cream">
                RRAVI
              </span>
              <span className="block font-mono text-[9px] uppercase tracking-[0.28em] text-mist">
                Organic Enterprises
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {LINKS.map((l) => (
              <NavLink
                key={l.path}
                to={l.path}
                data-testid={`nav-link-${l.id}`}
                className={({ isActive }) =>
                  `relative rounded-full px-4 py-2 text-sm transition-colors duration-300 ${
                    isActive ? "text-amber" : "text-cream/75 hover:text-cream"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {l.name}
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-cream/10"
                        transition={{ type: "spring", stiffness: 350, damping: 32 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              data-testid="nav-quote-btn"
              onClick={() => openQuote("General Enquiry")}
              className="group hidden items-center gap-1.5 rounded-full bg-terra px-5 py-2.5 text-sm font-medium text-cream transition-colors duration-300 hover:bg-amber hover:text-forest-deep sm:inline-flex"
            >
              Request Quote
              <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            <button
              data-testid="nav-mobile-toggle"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/15 text-cream lg:hidden"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            data-testid="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-forest-deep/95 px-8 backdrop-blur-xl lg:hidden"
          >
            <nav className="flex flex-col gap-2" aria-label="Mobile">
              {LINKS.map((l, i) => (
                <motion.div
                  key={l.path}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i + 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  <NavLink
                    to={l.path}
                    data-testid={`mobile-nav-link-${l.id}`}
                    className={({ isActive }) =>
                      `block font-display text-4xl font-medium ${
                        isActive ? "text-amber" : "text-cream"
                      }`
                    }
                  >
                    {l.name}
                  </NavLink>
                </motion.div>
              ))}
              <motion.button
                data-testid="mobile-nav-quote-btn"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.55 }}
                onClick={() => {
                  setOpen(false);
                  openQuote("General Enquiry");
                }}
                className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-terra px-7 py-3.5 font-medium text-cream"
              >
                Request Quote <ArrowUpRight size={16} />
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
