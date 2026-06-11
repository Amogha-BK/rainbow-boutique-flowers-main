import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import heroImg from "@/assets/hero-flowers.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Rainbow Boutique" },
      { name: "description", content: "Our story: a family-run floral boutique delivering smiles through flowers since 2015." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <motion.header initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Our Story</p>
        <h1 className="mt-2 font-display text-5xl md:text-7xl">A boutique built on <span className="gradient-text italic">love</span>.</h1>
      </motion.header>

      <div className="my-12 overflow-hidden rounded-[2.5rem]"><img src={heroImg} alt="" className="aspect-[16/9] w-full object-cover" width={1920} height={1080} /></div>

      <div className="prose prose-lg mx-auto max-w-2xl space-y-6 text-foreground/80">
        <p className="font-display text-2xl italic leading-relaxed">"Every bouquet we tie is a love letter — written in petals."</p>
        <p>Rainbow Boutique began in 2015 with a tiny stall, a passion for fresh blooms, and a simple promise: to deliver smiles, never just flowers. Today, our atelier of florists hand-ties thousands of arrangements every week, each one personally checked before it leaves our studio.</p>
        <p>We source from local growers within 24 hours of cutting, wrap with sustainable materials, and deliver in temperature-controlled vehicles. Because the moment a bouquet is opened should feel like the garden bloomed in your living room.</p>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {[{ n: "50K+", l: "Bouquets delivered" }, { n: "4.9★", l: "Average rating" }, { n: "100%", l: "Freshness promise" }].map((s) => (
          <div key={s.l} className="rounded-3xl bg-card p-8 text-center">
            <div className="font-display text-5xl gradient-text">{s.n}</div>
            <div className="mt-2 text-sm text-muted-foreground">{s.l}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
