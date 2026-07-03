"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const inquirySchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  eventDate: z.string().optional(),
  eventType: z.string().optional(),
  message: z.string().min(10, "Please share a bit more about your event"),
});

type InquiryFormData = z.infer<typeof inquirySchema>;

interface ContactPageClientProps {
  contactEmail?: string;
  contactPhone?: string;
}

const inputClass =
  "w-full border-b border-border bg-transparent px-0 py-3 text-sm focus:outline-none focus:border-text-primary";

export function ContactPageClient({
  contactEmail,
  contactPhone,
}: ContactPageClientProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
  });

  const onSubmit = async (data: InquiryFormData) => {
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error ?? "Something went wrong");
      }

      setStatus("success");
      reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Failed to send");
    }
  };

  return (
    <div className="section-padding pt-8">
      <div className="narrow-container">
        <div className="text-center mb-12">
          <h1 className="display-heading">Contact</h1>
          <p className="mt-6 prose-editorial">
            We take on a limited number of weddings each year. Share your vision
            and we&apos;ll be in touch.
          </p>
          <div className="mt-6 text-sm text-text-secondary space-y-1">
            {contactPhone && <p>{contactPhone}</p>}
            {contactEmail && (
              <p>
                <a href={`mailto:${contactEmail}`} className="hover:text-text-primary">
                  {contactEmail}
                </a>
              </p>
            )}
          </div>
        </div>

        {status === "success" ? (
          <div className="text-center py-12">
            <p className="font-display text-2xl text-text-primary mb-3">Thank you.</p>
            <p className="text-text-secondary">
              Your message has been received. We&apos;ll be in touch soon.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-md mx-auto" noValidate>
            <div>
              <input
                placeholder="Name *"
                {...register("name")}
                className={inputClass}
              />
              {errors.name && (
                <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <input
                type="email"
                placeholder="Email *"
                {...register("email")}
                className={inputClass}
              />
              {errors.email && (
                <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <input
                type="tel"
                placeholder="Phone"
                {...register("phone")}
                className={inputClass}
              />
            </div>

            <div>
              <input
                type="date"
                {...register("eventDate")}
                className={inputClass}
              />
            </div>

            <div>
              <select {...register("eventType")} className={inputClass}>
                <option value="">Event Type</option>
                <option value="Wedding">Wedding</option>
                <option value="Engagement">Engagement</option>
                <option value="Editorial">Editorial</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <textarea
                rows={4}
                placeholder="Message *"
                {...register("message")}
                className={`${inputClass} resize-none`}
              />
              {errors.message && (
                <p className="text-red-600 text-xs mt-1">{errors.message.message}</p>
              )}
            </div>

            {status === "error" && (
              <p className="text-red-600 text-sm text-center">{errorMessage}</p>
            )}

            <div className="text-center pt-4">
              <button
                type="submit"
                disabled={status === "loading"}
                className="text-sm text-text-secondary hover:text-text-primary transition-colors disabled:opacity-50"
              >
                {status === "loading" ? "Sending..." : "Send Inquiry"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
