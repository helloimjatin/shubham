import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSiteSettings } from "@/lib/site-settings";
import { Resend } from "resend";

const inquirySchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  eventDate: z.string().optional(),
  eventType: z.string().optional(),
  message: z.string().min(10),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = inquirySchema.parse(body);

    const inquiry = await prisma.inquiry.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        eventDate: data.eventDate ? new Date(data.eventDate) : null,
        eventType: data.eventType,
        message: data.message,
      },
    });

    const settings = await getSiteSettings();
    const resendKey = process.env.RESEND_API_KEY;

    if (resendKey && settings.contactEmail) {
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev",
        to: settings.contactEmail,
        subject: `New inquiry from ${data.name}`,
        html: `
          <h2>New Contact Inquiry</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ""}
          ${data.eventDate ? `<p><strong>Event Date:</strong> ${data.eventDate}</p>` : ""}
          ${data.eventType ? `<p><strong>Event Type:</strong> ${data.eventType}</p>` : ""}
          <p><strong>Message:</strong></p>
          <p>${data.message}</p>
        `,
      });
    }

    return NextResponse.json({ success: true, id: inquiry.id });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid form data", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to submit inquiry" },
      { status: 500 }
    );
  }
}
