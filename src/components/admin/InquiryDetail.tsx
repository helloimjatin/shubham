"use client";

import { updateInquiryStatus } from "@/actions/inquiries";
import { formatDate } from "@/lib/utils";
import type { Inquiry, InquiryStatus } from "@prisma/client";
import { useRouter } from "next/navigation";

interface InquiryDetailProps {
  inquiry: Inquiry;
}

export function InquiryDetail({ inquiry }: InquiryDetailProps) {
  const router = useRouter();

  const handleStatus = async (status: InquiryStatus) => {
    await updateInquiryStatus(inquiry.id, status);
    router.refresh();
  };

  return (
    <div className="max-w-2xl">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="font-display text-3xl">{inquiry.name}</h1>
          <p className="text-text-secondary text-sm mt-2">
            Received {formatDate(inquiry.createdAt)}
          </p>
        </div>
        <span className="text-xs tracking-widest uppercase border border-border px-3 py-1">
          {inquiry.status}
        </span>
      </div>

      <dl className="space-y-4 bg-surface border border-border p-6">
        <div>
          <dt className="text-xs text-text-secondary uppercase tracking-widest">Email</dt>
          <dd className="mt-1">
            <a href={`mailto:${inquiry.email}`} className="hover:text-accent">
              {inquiry.email}
            </a>
          </dd>
        </div>
        {inquiry.phone && (
          <div>
            <dt className="text-xs text-text-secondary uppercase tracking-widest">Phone</dt>
            <dd className="mt-1">{inquiry.phone}</dd>
          </div>
        )}
        {inquiry.eventDate && (
          <div>
            <dt className="text-xs text-text-secondary uppercase tracking-widest">Event Date</dt>
            <dd className="mt-1">{formatDate(inquiry.eventDate)}</dd>
          </div>
        )}
        {inquiry.eventType && (
          <div>
            <dt className="text-xs text-text-secondary uppercase tracking-widest">Event Type</dt>
            <dd className="mt-1">{inquiry.eventType}</dd>
          </div>
        )}
        <div>
          <dt className="text-xs text-text-secondary uppercase tracking-widest">Message</dt>
          <dd className="mt-1 whitespace-pre-wrap">{inquiry.message}</dd>
        </div>
      </dl>

      <div className="flex gap-3 mt-6">
        {inquiry.status !== "RESPONDED" && (
          <button
            type="button"
            onClick={() => handleStatus("RESPONDED")}
            className="bg-text-primary text-white px-6 py-2 text-sm"
          >
            Mark Responded
          </button>
        )}
        {inquiry.status !== "ARCHIVED" && (
          <button
            type="button"
            onClick={() => handleStatus("ARCHIVED")}
            className="border border-border px-6 py-2 text-sm"
          >
            Archive
          </button>
        )}
        {inquiry.status !== "NEW" && (
          <button
            type="button"
            onClick={() => handleStatus("NEW")}
            className="border border-border px-6 py-2 text-sm"
          >
            Mark New
          </button>
        )}
      </div>
    </div>
  );
}
