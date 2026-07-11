"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Mail, Phone, MapPin } from "lucide-react";
import type { SiteSettings } from "@/types";
import Panel from "./Panel";
import SectionHeading from "./SectionHeading";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const initialForm: FormData = { name: "", email: "", subject: "", message: "" };

const inputCls =
  "w-full px-4 py-3 bg-[var(--bg-muted)] border border-[var(--border)] text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)]/50 transition-colors";

export default function Contact({ contact }: { contact: SiteSettings["contact"] }) {
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sendError, setSendError] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!form.name.trim()) newErrors.name = "Required";
    if (!form.email.trim()) {
      newErrors.email = "Required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Invalid email";
    }
    if (!form.subject.trim()) newErrors.subject = "Required";
    if (!form.message.trim()) newErrors.message = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setSendError(false);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          name: form.name,
          email: form.email,
          subject: `[Portfolio] ${form.subject}`,
          message: form.message,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
        setForm(initialForm);
      } else {
        setSendError(true);
      }
    } catch {
      setSendError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-28 border-t border-[var(--border)] bg-[var(--bg-muted)]/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <SectionHeading
              number="08 — Contact"
              title="Let's build something meaningful"
              subtitle="Research collaborations, project inquiries, or a simple hello — I'd love to hear from you."
            />

            <div className="space-y-5 mt-10">
              {[
                { icon: Mail, label: "Email", value: contact.email, href: `mailto:${contact.email}` },
                { icon: Phone, label: "Phone", value: contact.phone, href: `tel:${contact.phone.replace(/\s/g, "")}` },
                { icon: MapPin, label: "Based in", value: contact.location },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-[var(--border)] flex items-center justify-center shrink-0">
                    <Icon size={16} className="accent-text" />
                  </div>
                  <div>
                    <p className="font-mono-label text-[10px] uppercase tracking-widest text-[var(--text-muted)]">{label}</p>
                    {href ? (
                      <a href={href} className="text-sm text-[var(--text-primary)] hover:accent-text transition-colors mt-1 block">
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm text-[var(--text-primary)] mt-1">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Panel hover={false} className="p-8">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <CheckCircle size={40} className="accent-text mb-4" />
                  <h3 className="font-display font-bold text-xl text-[var(--text-primary)] mb-2">
                    Message received
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] mb-6">
                    I&apos;ll respond as soon as possible.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-sm accent-text hover:underline"
                  >
                    Send another
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-mono-label text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-2 block">Name</label>
                      <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} placeholder="Your name" />
                      {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="font-mono-label text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-2 block">Email</label>
                      <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputCls} placeholder="you@email.com" />
                      {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="font-mono-label text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-2 block">Subject</label>
                    <input type="text" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className={inputCls} placeholder="What's this about?" />
                    {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject}</p>}
                  </div>
                  <div>
                    <label className="font-mono-label text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-2 block">Message</label>
                    <textarea rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={inputCls + " resize-none"} placeholder="Your message..." />
                    {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                  </div>

                  {sendError && (
                    <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 border border-red-400/20 px-4 py-3">
                      <AlertCircle size={16} />
                      Failed to send. Please try again or email directly.
                    </div>
                  )}

                  <button type="submit" disabled={loading} className="btn-primary w-full justify-center disabled:opacity-60">
                    {loading ? (
                      <span className="w-4 h-4 border-2 border-[#052e16]/30 border-t-[#052e16] rounded-full animate-spin" />
                    ) : (
                      <>
                        Send Message <Send size={14} />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </Panel>
        </div>
      </div>
    </section>
  );
}
