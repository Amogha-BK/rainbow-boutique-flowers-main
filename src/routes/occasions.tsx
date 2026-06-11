import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { occasions, products } from "@/lib/products";

export const Route = createFileRoute("/occasions")({
  head: () => ({
    meta: [
      { title: "Shop by Occasion — Rainbow Boutique" },
      { name: "description", content: "Find the perfect flowers for every moment — birthdays, anniversaries, weddings, and more." },
    ],
  }),
  component: Occasions,
});

function Occasions() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <header className="mb-12 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Every moment matters</p>
        <h1 className="mt-2 font-display text-5xl md:text-6xl">Shop by Occasion</h1>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {occasions.map((o, i) => {
          const sample = products[i % products.length];
          return (
            <motion.div key={o.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <Link to="/shop" className="group relative block aspect-[4/5] overflow-hidden rounded-3xl">
                <img src={sample.image} alt={o.name} loading="lazy" width={800} height={1000} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7 text-background">
                  <div className="text-4xl">{o.emoji}</div>
                  <h2 className="mt-2 font-display text-3xl">{o.name}</h2>
                  <p className="mt-1 text-sm opacity-90">Shop {o.name.toLowerCase()} bouquets →</p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </main>
  );
}
