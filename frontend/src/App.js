import "@/App.css";
import { useCallback, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Lenis from "lenis";
import { Toaster } from "sonner";
import { QuoteContext } from "@/context/QuoteContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteDrawer from "@/components/QuoteDrawer";
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import About from "@/pages/About";
import WhyUs from "@/pages/WhyUs";
import Contact from "@/pages/Contact";

function Shell() {
  const { pathname } = useLocation();
  const [quote, setQuote] = useState({ open: false, category: "General Enquiry" });
  const openQuote = useCallback(
    (category = "General Enquiry") => setQuote({ open: true, category }),
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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/why-us" element={<WhyUs />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
        <QuoteDrawer
          open={quote.open}
          category={quote.category}
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
