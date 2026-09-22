import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import EnquiryForm from "@/components/EnquiryForm";

export default function QuoteDrawer({ open, category, product = "", onOpenChange }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-testid="quote-drawer"
        className="max-h-[92vh] max-w-xl gap-0 overflow-y-auto rounded-3xl border-forest/10 bg-cream p-0"
      >
        <div className="grain relative bg-forest p-6 text-cream sm:p-8">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl font-medium sm:text-3xl">
              Request a <em className="italic text-amber">Quote</em>
            </DialogTitle>
            <DialogDescription className="text-sm text-mist">
              {product
                ? `Enquiring about: ${product} — ${category}`
                : category && category !== "General Enquiry"
                  ? `Enquiring about: ${category}`
                  : "Tell us what you need — we reply within 24 hours."}
            </DialogDescription>
          </DialogHeader>
        </div>
        <div className="p-6 sm:p-8">
          <EnquiryForm
            key={`${category}|${product}`}
            idPrefix="quote"
            defaultCategory={category || "General Enquiry"}
            defaultMessage={
              product
                ? `I'd like a quote for ${product} (${category}).\nApprox. quantity: \nDestination port: `
                : ""
            }
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
