import "@/App.css";
import { useCallback, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Lenis from "lenis";
import { Toaster } from "sonner";
import { AnimatePresence, motion } from "framer-motion";
import { QuoteContext } from "@/context/QuoteContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteDrawer from "@/components/QuoteDrawer";
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import About from "@/pages/About";
import WhyUs from "@/pages/WhyUs";
import Contact from "@/pages/Contact";
import Admin from "@/pages/Admin";

function Shell() {
  const location = useLocation();
  const { pathname } = location;
  const [quote, setQuote] = useState({ open: false, category: "General Enquiry", product: "" });
  const openQuote = useCallback(
    (category = "General Enquiry", product = "") => setQuote({ open: true, category, product }),
    []
  );

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    window.lenis = lenis;
    let rafId;
    const loop = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.lenis = undefined;
    };
  }, []);

  useEffect(() => {
    if (window.lenis) window.lenis.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <QuoteContext.Provider value={{ openQuote }}>
      <div className="min-h-screen bg-cream font-sans text-ink">
        <Navbar />
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/about" element={<About />} />
              <Route path="/why-us" element={<WhyUs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
        <Footer />
        <QuoteDrawer
          open={quote.open}
          category={quote.category}
          product={quote.product}
          onOpenChange={(o) => setQuote((s) => ({ ...s, open: o }))}
        />
      </div>
    </QuoteContext.Provider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Shell />
      <Toaster position="top-center" richColors />
    </BrowserRouter>
  );
}
