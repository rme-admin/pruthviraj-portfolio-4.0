"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, Mail } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { href: "#about", label: "About", num: "01" },
  { href: "#experience", label: "Work", num: "02" },
  { href: "#projects", label: "Projects", num: "03" },
  { href: "#education", label: "Education", num: "04" },
  { href: "#achievements", label: "Recognition", num: "05" },
  { href: "#contact", label: "Contact", num: "06" },
];

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Side drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed top-0 right-0 bottom-0 z-[70] w-[min(88vw,340px)] lg:hidden flex flex-col overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            {/* Accent edge */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--accent)]" />

            <div className="relative flex flex-col h-full bg-[var(--bg-elevated)] border-l border-[var(--border)]">
              {/* Decorative grid */}
              <div
                className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{
                  backgroundImage:
                    "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />

              {/* Header */}
              <div className="relative flex items-center justify-between px-6 pt-6 pb-4 border-b border-[var(--border-subtle)]">
                <div>
                  <p className="font-mono-label text-[10px] uppercase tracking-[0.25em] text-[var(--accent)]">
                    Navigate
                  </p>
                  <p className="font-display font-bold text-lg text-[var(--text-primary)] mt-0.5">
                    Menu
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--accent)]/40 transition-colors"
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Nav links */}
              <nav className="relative flex-1 overflow-y-auto px-4 py-6">
                <ul className="space-y-1">
                  {navLinks.map((link, i) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.08 + i * 0.05, duration: 0.35 }}
                    >
                      <a
                        href={link.href}
                        onClick={onClose}
                        className="group flex items-center gap-4 px-3 py-4 rounded-sm hover:bg-[var(--bg-muted)] transition-colors"
                      >
                        <span className="font-mono-label text-[10px] text-[var(--accent)] w-5 shrink-0">
                          {link.num}
                        </span>
                        <span className="flex-1 font-display font-semibold text-[var(--text-primary)] group-hover:accent-text transition-colors">
                          {link.label}
                        </span>
                        <ArrowUpRight
                          size={14}
                          className="text-[var(--text-muted)] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:accent-text transition-all"
                        />
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Footer */}
              <div className="relative px-6 py-5 border-t border-[var(--border-subtle)] space-y-4 bg-[var(--bg-muted)]/50">
                <div className="flex items-center justify-between">
                  <span className="font-mono-label text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                    Theme
                  </span>
                  <ThemeToggle />
                </div>

                <a
                  href="#contact"
                  onClick={onClose}
                  className="btn-primary w-full justify-center"
                >
                  <Mail size={14} />
                  Get In Touch
                </a>

                <p className="font-mono-label text-[9px] text-[var(--text-muted)] text-center tracking-widest uppercase">
                  H₂ · Clean Energy Portfolio
                </p>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
