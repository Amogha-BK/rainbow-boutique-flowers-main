import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { toast } from "sonner";
import { WHATSAPP_URL } from "@/components/WhatsAppFloat";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Rainbow Boutique" },
      { name: "description", content: "Get in touch with Rainbow Boutique. Same-day flower delivery, custom orders and event florals." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <header className="text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">We'd love to hear from you</p>
        <h1 className="mt-2 font-display text-5xl md:text-6xl">Get in touch</h1>
      </header>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_400px]">
        <form onSubmit={(e) => { e.preventDefault(); toast.success("Message sent! We'll reply within an hour."); }} className="space-y-4 rounded-3xl bg-card p-8">
          <div className="grid gap-4 md:grid-cols-2">
            <input required placeholder="Your name" className="rounded-full border border-border bg-background px-5 py-3 text-sm" />
            <input required type="email" placeholder="Email" className="rounded-full border border-border bg-background px-5 py-3 text-sm" />
          </div>
          <input placeholder="Subject" className="w-full rounded-full border border-border bg-background px-5 py-3 text-sm" />
          <textarea required rows={6} placeholder="How can we help?" className="w-full rounded-3xl border border-border bg-background p-5 text-sm" />
          <button className="btn-hero w-full rounded-full py-3.5 text-sm font-semibold">Send message</button>
        </form>

        <aside className="space-y-4">
          {[
            { I: Phone, t: "Call us", v: "+91 98667 11901" },
            { I: Mail, t: "Email", v: "hello@rainbowboutique.in" },
            { I: MapPin, t: "Visit", v: "MG Road, Bengaluru, KA" },
            { I: Clock, t: "Hours", v: "Mon–Sun · 8am to 9pm" },
          ].map(({ I, t, v }) => (
            <div key={t} className="flex items-start gap-4 rounded-2xl bg-card p-5">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full" style={{ background: "var(--gradient-primary)" }}><I className="h-4 w-4 text-primary-foreground" /></div>
              <div><div className="text-xs uppercase tracking-wider text-muted-foreground">{t}</div><div className="font-medium">{v}</div></div>
            </div>
          ))}
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-full py-4 text-sm font-semibold text-white" style={{ background: "linear-gradient(135deg,#25D366,#128C7E)" }}>
            💬 Chat on WhatsApp
          </a>
        </aside>
      </div>
    </main>
  );
}
