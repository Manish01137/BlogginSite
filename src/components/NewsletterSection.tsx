"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Loader2, Mail } from "lucide-react";
import { useId, useState, type FormEvent } from "react";
import { FadeIn } from "@/components/motion/FadeIn";
import { EASE } from "@/lib/motion";
import { buttonClasses } from "@/lib/ui";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(email: string): string | null {
  if (!email) return "Please enter your email address.";
  if (!EMAIL_PATTERN.test(email)) return "That email doesn't look quite right — please check it.";
  return null;
}

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const inputId = useId();
  const errorId = `${inputId}-error`;
  const noteId = `${inputId}-note`;

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = email.trim();
    const problem = validate(value);
    if (problem) {
      setError(problem);
      return;
    }
    setError(null);
    setStatus("loading");
    try {
      // TODO: connect the real newsletter API here, e.g.
      // await fetch("/api/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: value }) });
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setStatus("success");
    } catch {
      setStatus("idle");
      setError("Something went wrong. Please try again in a moment.");
    }
  };

  return (
    <section aria-labelledby="newsletter-heading" className="bg-paper py-24 sm:py-28">
      <div className="container-page">
        <FadeIn>
          <div className="relative overflow-hidden rounded-[1.75rem] border border-line bg-white p-8 shadow-soft sm:p-12 lg:p-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-gold-100 blur-3xl"
            />
            <div className="relative grid gap-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-6">
                <span className="grid size-12 place-items-center rounded-full bg-navy-800 text-gold-500">
                  <Mail aria-hidden="true" className="size-5" />
                </span>
                <h2
                  id="newsletter-heading"
                  className="mt-6 font-serif text-3xl font-normal tracking-[-0.02em] text-navy-800 sm:text-[2.6rem] sm:leading-tight"
                >
                  Get visa updates in your inbox
                </h2>
                <p className="mt-4 max-w-md text-lg leading-relaxed text-muted">
                  One short email when rules change or a new guide goes live. Written for students and professionals
                  planning their move abroad.
                </p>
              </div>

              <div className="lg:col-span-6">
                <AnimatePresence mode="wait" initial={false}>
                  {status === "success" ? (
                    <motion.div
                      key="success"
                      role="status"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: EASE }}
                      className="flex items-start gap-5 rounded-2xl border border-gold-500/40 bg-gold-50 p-6"
                    >
                      <AnimatedCheck />
                      <div>
                        <p className="font-serif text-2xl text-navy-800">You&rsquo;re on the list</p>
                        <p className="mt-1 text-muted">
                          Thanks for subscribing. We&rsquo;ll send updates to{" "}
                          <span className="font-medium text-ink-soft">{email.trim()}</span>.
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            setStatus("idle");
                            setEmail("");
                          }}
                          className="mt-3 rounded text-sm font-medium text-navy-800 underline underline-offset-4 hover:text-gold-700"
                        >
                          Use a different email
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      noValidate
                      onSubmit={onSubmit}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.4, ease: EASE }}
                    >
                      <label htmlFor={inputId} className="mb-2 block text-sm font-medium text-ink-soft">
                        Email address
                      </label>
                      <div className="flex flex-col gap-3 sm:flex-row">
                        <input
                          id={inputId}
                          type="email"
                          inputMode="email"
                          autoComplete="email"
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (error) setError(null);
                          }}
                          aria-invalid={error ? true : undefined}
                          aria-describedby={error ? `${errorId} ${noteId}` : noteId}
                          disabled={status === "loading"}
                          className={cn(
                            "h-14 w-full flex-1 rounded-full border bg-paper px-6 text-base text-ink placeholder:text-muted/70",
                            "transition-[border-color,box-shadow] duration-300 outline-none",
                            "focus:border-navy-800 focus:shadow-[0_0_0_4px_rgb(11_31_58/0.08)]",
                            error ? "border-red-700" : "border-line hover:border-navy-800/30",
                          )}
                        />
                        <button
                          type="submit"
                          disabled={status === "loading"}
                          className={buttonClasses("navy", "lg", "sm:w-44")}
                        >
                          {status === "loading" ? (
                            <>
                              <Loader2 aria-hidden="true" className="size-4 animate-spin" />
                              Subscribing…
                            </>
                          ) : (
                            <>
                              Subscribe
                              <ArrowRight
                                aria-hidden="true"
                                className="size-4 transition-transform duration-300 ease-premium group-hover/btn:translate-x-0.5"
                              />
                            </>
                          )}
                        </button>
                      </div>
                      <AnimatePresence initial={false}>
                        {error && (
                          <motion.p
                            id={errorId}
                            role="alert"
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3, ease: EASE }}
                            className="mt-3 pl-6 text-sm font-medium text-red-700"
                          >
                            {error}
                          </motion.p>
                        )}
                      </AnimatePresence>
                      <p id={noteId} className="mt-3 pl-6 text-sm text-muted">
                        No spam. Unsubscribe anytime.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/** Circle + checkmark that draw themselves in. */
function AnimatedCheck() {
  return (
    <svg viewBox="0 0 52 52" className="size-12 shrink-0" aria-hidden="true">
      <motion.circle
        cx="26"
        cy="26"
        r="24"
        fill="#0B1F3A"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: EASE }}
        style={{ originX: "50%", originY: "50%" }}
      />
      <motion.path
        d="M15 27.5 22.5 35 37.5 18"
        fill="none"
        stroke="#C9A227"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
      />
    </svg>
  );
}
