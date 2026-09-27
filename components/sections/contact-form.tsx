"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { contactFormSchema, ContactFormValues } from "@/lib/validations/contact";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const fieldClasses =
  "w-full rounded-lg border border-white/15 bg-ink-900 px-4 py-3 text-sm text-white placeholder:text-steel-500 focus:border-blaze-500";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (values: ContactFormValues) => {
    // No backend is wired up yet — simulate a network request so the
    // form's success state can be demonstrated end to end.
    await new Promise((resolve) => setTimeout(resolve, 600));
    console.log("Contact form submitted:", values);
    setSubmitted(true);
    reset();
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-10 text-center">
        <CheckCircle2 size={32} className="text-emerald-400" aria-hidden />
        <h3 className="font-display text-xl uppercase tracking-wide text-white">
          Message Sent
        </h3>
        <p className="max-w-sm text-sm text-steel-400">
          Our lab will get back to you shortly. For urgent fitting questions, reach us
          directly on WhatsApp.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="text-sm font-semibold text-blaze-400 hover:text-blaze-300"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-5 rounded-xl border border-white/10 bg-ink-850 p-7"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wide text-steel-400">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Your name"
            className={fieldClasses}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            {...register("name")}
          />
          {errors.name && (
            <p id="name-error" className="text-xs text-blaze-400">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wide text-steel-400">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            className={fieldClasses}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email")}
          />
          {errors.email && (
            <p id="email-error" className="text-xs text-blaze-400">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="discipline" className="text-xs font-semibold uppercase tracking-wide text-steel-400">
          Sport / Discipline
        </label>
        <input
          id="discipline"
          type="text"
          placeholder="e.g. Karate, MMA, Boxing"
          className={fieldClasses}
          aria-invalid={!!errors.discipline}
          aria-describedby={errors.discipline ? "discipline-error" : undefined}
          {...register("discipline")}
        />
        {errors.discipline && (
          <p id="discipline-error" className="text-xs text-blaze-400">
            {errors.discipline.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wide text-steel-400">
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          placeholder="Tell us about the fit, design, or timeline you need."
          className={cn(fieldClasses, "resize-none")}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          {...register("message")}
        />
        {errors.message && (
          <p id="message-error" className="text-xs text-blaze-400">
            {errors.message.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        icon={<Send size={16} aria-hidden />}
        className="self-start"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
