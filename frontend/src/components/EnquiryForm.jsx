import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CATEGORIES } from "@/data/catalog";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const inputCls =
  "h-11 rounded-xl border-forest/15 bg-white/70 px-4 text-sm text-ink placeholder:text-sage focus-visible:ring-terra";

const Label = ({ htmlFor, children }) => (
  <label
    htmlFor={htmlFor}
    className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.22em] text-sage"
  >
    {children}
  </label>
);

export default function EnquiryForm({ idPrefix = "enquiry", defaultCategory = "General Enquiry", onSuccess }) {
  const empty = {
    name: "",
    email: "",
    company: "",
    country: "",
    phone: "",
    category: defaultCategory || "General Enquiry",
    message: "",
  };
  const [form, setForm] = useState(empty);
  const [sending, setSending] = useState(false);

  const set = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e && e.target ? e.target.value : e }));

  const submit = async (e) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    try {
      await axios.post(`${API}/enquiries`, form);
      toast.success("Enquiry received — we'll get back to you within 24 hours.");
      setForm({ ...empty });
      onSuccess?.();
    } catch (err) {
      toast.error("Could not send your enquiry. Please try WhatsApp instead.");
    } finally {
      setSending(false);
    }
  };

  return (
    <form data-testid={`${idPrefix}-form`} onSubmit={submit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor={`${idPrefix}-name`}>Full Name *</Label>
          <Input
            id={`${idPrefix}-name`}
            data-testid={`${idPrefix}-name-input`}
            required
            value={form.name}
            onChange={set("name")}
            placeholder="Jane Cooper"
            className={inputCls}
          />
        </div>
        <div>
          <Label htmlFor={`${idPrefix}-email`}>Business Email *</Label>
          <Input
            id={`${idPrefix}-email`}
            data-testid={`${idPrefix}-email-input`}
            required
            type="email"
            value={form.email}
            onChange={set("email")}
            placeholder="jane@company.com"
            className={inputCls}
          />
        </div>
        <div>
          <Label htmlFor={`${idPrefix}-company`}>Company</Label>
          <Input
            id={`${idPrefix}-company`}
            data-testid={`${idPrefix}-company-input`}
            value={form.company}
            onChange={set("company")}
            placeholder="Company Ltd."
            className={inputCls}
          />
        </div>
        <div>
          <Label htmlFor={`${idPrefix}-country`}>Country</Label>
          <Input
            id={`${idPrefix}-country`}
            data-testid={`${idPrefix}-country-input`}
            value={form.country}
            onChange={set("country")}
            placeholder="United States"
            className={inputCls}
          />
        </div>
        <div>
          <Label htmlFor={`${idPrefix}-phone`}>Phone / WhatsApp</Label>
          <Input
            id={`${idPrefix}-phone`}
            data-testid={`${idPrefix}-phone-input`}
            value={form.phone}
            onChange={set("phone")}
            placeholder="+1 555 000 0000"
            className={inputCls}
          />
        </div>
        <div>
          <Label htmlFor={`${idPrefix}-category`}>Product Category</Label>
          <Select value={form.category} onValueChange={set("category")}>
            <SelectTrigger
              id={`${idPrefix}-category`}
              data-testid={`${idPrefix}-category-select`}
              className="h-11 rounded-xl border-forest/15 bg-white/70 px-4 text-sm text-ink focus:ring-terra"
            >
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent className="bg-cream">
              <SelectItem data-testid={`${idPrefix}-category-general`} value="General Enquiry">
                General Enquiry
              </SelectItem>
              {CATEGORIES.map((c) => (
                <SelectItem
                  key={c.id}
                  data-testid={`${idPrefix}-category-${c.id}`}
                  value={c.name}
                >
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Label htmlFor={`${idPrefix}-message`}>Your Requirement *</Label>
        <Textarea
          id={`${idPrefix}-message`}
          data-testid={`${idPrefix}-message-input`}
          required
          rows={4}
          value={form.message}
          onChange={set("message")}
          placeholder="Tell us the products, grades, quantities and destination port you have in mind…"
          className="rounded-xl border-forest/15 bg-white/70 px-4 py-3 text-sm text-ink placeholder:text-sage focus-visible:ring-terra"
        />
      </div>
      <button
        data-testid={`${idPrefix}-submit-button`}
        type="submit"
        disabled={sending}
        className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-forest px-8 py-3.5 text-sm font-medium text-cream transition-colors duration-300 hover:bg-terra disabled:opacity-60"
      >
        {sending ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Sending…
          </>
        ) : (
          <>
            Send Enquiry
            <Send size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
          </>
        )}
      </button>
    </form>
  );
}
