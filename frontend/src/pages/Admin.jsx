import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Loader2, LogOut, RefreshCw, Trash2, Inbox, Building2, Globe2, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import Logo from "@/components/Logo";
import { Eyebrow } from "@/components/Reveal";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

function formatApiErrorDetail(detail) {
  if (detail == null) return "Something went wrong. Please try again.";
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail))
    return detail.map((e) => (e && typeof e.msg === "string" ? e.msg : JSON.stringify(e))).join(" ");
  if (detail && typeof detail.msg === "string") return detail.msg;
  return String(detail);
}

export default function Admin() {
  const [auth, setAuth] = useState(null); // null = checking, false = logged out
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const withRefresh = useCallback(async (fn) => {
    try {
      return await fn();
    } catch (e) {
      if (e.response?.status === 401) {
        await axios.post(`${API}/auth/refresh`, {}, { withCredentials: true });
        return await fn();
      }
      throw e;
    }
  }, []);

  const loadEnquiries = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await withRefresh(() =>
        axios.get(`${API}/enquiries`, { withCredentials: true })
      );
      setEnquiries(data);
    } catch {
      toast.error("Could not load enquiries");
    } finally {
      setLoading(false);
    }
  }, [withRefresh]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${API}/auth/me`, { withCredentials: true });
        setAuth(data);
      } catch {
        setAuth(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (auth) loadEnquiries();
  }, [auth, loadEnquiries]);

  const login = async (e) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      const { data } = await axios.post(`${API}/auth/login`, form, { withCredentials: true });
      setAuth(data);
      toast.success(`Welcome back, ${data.name}`);
    } catch (err) {
      setError(formatApiErrorDetail(err.response?.data?.detail));
    } finally {
      setBusy(false);
    }
  };

  const logout = async () => {
    await axios.post(`${API}/auth/logout`, {}, { withCredentials: true }).catch(() => {});
    setAuth(false);
    setEnquiries([]);
  };

  const remove = async (id) => {
    try {
      await withRefresh(() => axios.delete(`${API}/enquiries/${id}`, { withCredentials: true }));
      setEnquiries((list) => list.filter((x) => x._id !== id));
      toast.success("Enquiry deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  if (auth === null) {
    return (
      <main data-testid="admin-page" className="flex min-h-screen items-center justify-center bg-forest-deep">
        <Loader2 className="animate-spin text-amber" size={28} />
      </main>
    );
  }

  if (auth === false) {
    return (
      <main data-testid="admin-page" className="grain flex min-h-screen items-center justify-center bg-forest-deep px-5 pb-16 pt-24">
        <form
          data-testid="admin-login-form"
          onSubmit={login}
          className="w-full max-w-sm rounded-3xl border border-cream/10 bg-cream p-8 shadow-2xl"
        >
          <div className="flex justify-center">
            <Logo size={52} />
          </div>
          <h1 className="mt-5 text-center font-display text-2xl font-medium text-ink">
            Admin Dashboard
          </h1>
          <p className="mt-1 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-sage">
            RRAVI Organic Enterprises
          </p>
          <div className="mt-7 space-y-4">
            <Input
              data-testid="admin-email-input"
              type="email"
              required
              placeholder="Admin email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="h-11 rounded-xl border-forest/15 bg-white/70"
            />
            <Input
              data-testid="admin-password-input"
              type="password"
              required
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              className="h-11 rounded-xl border-forest/15 bg-white/70"
            />
            {error && (
              <p data-testid="admin-login-error" className="text-sm text-red-600">
                {error}
              </p>
            )}
            <button
              data-testid="admin-login-button"
              type="submit"
              disabled={busy}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-medium text-cream hover:bg-terra disabled:opacity-60"
            >
              {busy ? <Loader2 size={15} className="animate-spin" /> : "Sign In"}
            </button>
          </div>
        </form>
      </main>
    );
  }

  return (
    <main data-testid="admin-dashboard" className="min-h-screen bg-cream pb-20 pt-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <Eyebrow>Private</Eyebrow>
            <h1 className="mt-2 font-display text-3xl font-medium sm:text-4xl">Enquiry Inbox</h1>
            <p className="mt-1 text-sm text-sage">Signed in as {auth.email}</p>
          </div>
          <div className="flex gap-2">
            <button
              data-testid="admin-refresh-btn"
              onClick={loadEnquiries}
              className="inline-flex items-center gap-2 rounded-full border border-forest/15 px-4 py-2 text-sm hover:border-terra hover:text-terra"
            >
              <RefreshCw size={14} /> Refresh
            </button>
            <button
              data-testid="admin-logout-btn"
              onClick={logout}
              className="inline-flex items-center gap-2 rounded-full bg-forest px-4 py-2 text-sm text-cream hover:bg-terra"
            >
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-2 text-sm text-sage">
          <Inbox size={15} className="text-terra" />
          <span data-testid="admin-enquiry-count">
            {enquiries.length} enquir{enquiries.length === 1 ? "y" : "ies"}
          </span>
          {loading && <Loader2 size={14} className="animate-spin" />}
        </div>

        <div className="mt-4 space-y-4">
          {enquiries.map((q) => (
            <article
              key={q._id}
              data-testid={`enquiry-card-${q._id}`}
              className="rounded-3xl border border-forest/10 bg-white/60 p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <span className="inline-block rounded-full bg-forest px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-cream">
                    {q.category}
                  </span>
                  <h2 className="mt-3 font-display text-xl font-medium">{q.name}</h2>
                  <p className="mt-0.5 font-mono text-[11px] text-sage">
                    {q.created_at ? new Date(q.created_at).toLocaleString() : ""}
                  </p>
                </div>
                <button
                  data-testid={`enquiry-delete-${q._id}`}
                  onClick={() => remove(q._id)}
                  aria-label="Delete enquiry"
                  className="rounded-full border border-forest/15 p-2.5 text-sage transition-colors hover:border-red-500 hover:text-red-500"
                >
                  <Trash2 size={15} />
                </button>
              </div>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1.5 text-sm text-ink">
                <a
                  href={`mailto:${q.email}`}
                  className="underline decoration-terra/50 underline-offset-2 hover:text-terra"
                >
                  {q.email}
                </a>
                {q.phone && (
                  <span className="flex items-center gap-1.5">
                    <Phone size={13} className="text-terra" />
                    {q.phone}
                  </span>
                )}
                {q.company && (
                  <span className="flex items-center gap-1.5">
                    <Building2 size={13} className="text-terra" />
                    {q.company}
                  </span>
                )}
                {q.country && (
                  <span className="flex items-center gap-1.5">
                    <Globe2 size={13} className="text-terra" />
                    {q.country}
                  </span>
                )}
              </div>
              <p className="mt-4 rounded-2xl bg-cream p-4 text-sm leading-relaxed text-sage">
                {q.message}
              </p>
            </article>
          ))}
          {!loading && enquiries.length === 0 && (
            <p
              data-testid="admin-empty-state"
              className="rounded-3xl border border-dashed border-forest/20 p-12 text-center text-sm text-sage"
            >
              No enquiries yet - new submissions will appear here instantly.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
