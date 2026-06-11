import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Truck, ShieldCheck, Clock, Star, Instagram } from "lucide-react";
import heroImg from "@/assets/hero-flowers.jpg";
import { FallingPetals } from "@/components/FallingPetals";
import { ProductCard } from "@/components/ProductCard";
import { products, occasions } from "@/lib/products";
import { WHATSAPP_URL } from "@/components/WhatsAppFloat";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rainbow Boutique — Premium Flowers & Same-Day Delivery" },
      { name: "description", content: "Luxury hand-tied bouquets, custom arrangements and same-day flower delivery. Order roses, tulips, orchids and more." },
      { property: "og:title", content: "Rainbow Boutique — Delivering Smiles Through Flowers" },
      { property: "og:description", content: "Premium bouquets, custom builder and same-day delivery." },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = products.filter((p) => p.featured);
  const best = products.filter((p) => p.bestSeller);

  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <FallingPetals />
        <div className="absolute inset-0 opacity-50 mix-blend-soft-light">
          <img src={heroImg} alt="" width={1920} height={1080} className="h-full w-full object-cover" />
        </div>
        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-20 md:grid-cols-2 md:py-32">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="flex flex-col justify-center">
            <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium">
              <Sparkles className="h-3.5 w-3.5" /> Same-day delivery across the city
            </span>
            <h1 className="font-display text-5xl leading-[1.05] md:text-7xl">
              Delivering <span className="gradient-text italic">smiles</span><br /> through flowers.
            </h1>
            <p className="mt-6 max-w-md text-lg text-foreground/70">
              Hand-tied luxury bouquets, custom arrangements and unforgettable gifts — crafted with love by Rainbow Boutique.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/shop" className="btn-hero inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold">
                Shop Now <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/custom" className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-background/60 px-7 py-3.5 text-sm font-semibold backdrop-blur transition hover:bg-background">
                Customize Bouquet
              </Link>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white" style={{ background: "linear-gradient(135deg,#25D366,#128C7E)" }}>
                WhatsApp Order
              </a>
            </div>
            <div className="mt-10 grid max-w-md grid-cols-3 gap-4">
              {[
                { v: "50K+", l: "Happy gifts" },
                { v: "4.9★", l: "Rated" },
                { v: "2hr", l: "Delivery" },
              ].map((s) => (
                <div key={s.l} className="glass rounded-2xl p-3 text-center">
                  <div className="font-display text-2xl">{s.v}</div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.2 }}
            className="relative hidden md:block"
          >
            <div className="relative aspect-square overflow-hidden rounded-[2.5rem] shadow-[var(--shadow-petal)]">
              <img src={heroImg} alt="Luxury floral arrangement" width={1200} height={1200} className="h-full w-full object-cover" />
            </div>
            <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute -left-6 top-12 glass rounded-2xl px-4 py-3">
              <div className="flex items-center gap-2 text-sm"><Star className="h-4 w-4" style={{ color: "var(--gold)" }} /> 4.9 · 2,300+ reviews</div>
            </motion.div>
            <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute -right-6 bottom-12 glass rounded-2xl px-4 py-3 text-sm">
              🌸 Free wrap on orders ₹999+
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* USP STRIP */}
      <section className="border-y bg-card">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-8 md:grid-cols-4">
          {[
            { I: Truck, t: "Same-Day Delivery", s: "Order before 4pm" },
            { I: ShieldCheck, t: "Freshness Promise", s: "7-day bloom guarantee" },
            { I: Clock, t: "2-Hour Express", s: "Available in metro" },
            { I: Sparkles, t: "Hand-Tied with Love", s: "By master florists" },
          ].map(({ I, t, s }) => (
            <div key={t} className="flex items-start gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-secondary"><I className="h-4 w-4" /></div>
              <div className="min-w-0">
                <div className="text-sm font-semibold">{t}</div>
                <div className="text-xs text-muted-foreground">{s}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* OCCASIONS */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Find the perfect bloom</p>
            <h2 className="mt-2 font-display text-4xl md:text-5xl">Shop by Occasion</h2>
          </div>
          <Link to="/occasions" className="hidden text-sm font-medium underline-offset-4 hover:underline md:inline">View all →</Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {occasions.map((o, i) => (
            <motion.div key={o.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <Link to="/occasions" className="group flex aspect-square flex-col items-center justify-center gap-3 rounded-3xl bg-card p-4 text-center transition hover:bg-secondary">
                <span className="text-4xl transition group-hover:scale-110">{o.emoji}</span>
                <span className="text-sm font-medium">{o.name}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-10 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Featured</p>
          <h2 className="mt-2 font-display text-4xl md:text-5xl">This week's bouquets</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="relative overflow-hidden py-20" style={{ background: "var(--gradient-soft)" }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Loved by thousands</p>
            <h2 className="mt-2 font-display text-4xl md:text-5xl">Best Sellers</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {best.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* CUSTOM CTA */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="relative overflow-hidden rounded-[2.5rem] p-10 md:p-16" style={{ background: "var(--gradient-primary)" }}>
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="relative grid items-center gap-8 md:grid-cols-2">
            <div className="text-primary-foreground">
              <h2 className="font-display text-4xl md:text-5xl">Build your own bouquet.</h2>
              <p className="mt-4 max-w-md opacity-90">Pick your blooms, choose a wrap, add a cake, chocolate or teddy. Crafted to order, delivered today.</p>
              <Link to="/custom" className="mt-8 inline-flex items-center gap-2 rounded-full bg-background px-7 py-3.5 text-sm font-semibold text-foreground transition hover:scale-105">
                Start Customizing <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {products.slice(0, 6).map((p) => (
                <motion.img key={p.id} whileHover={{ scale: 1.05 }} src={p.image} alt={p.name} loading="lazy" width={400} height={400} className="aspect-square rounded-2xl object-cover" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-10 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Real love letters</p>
          <h2 className="mt-2 font-display text-4xl md:text-5xl">What our customers say</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { n: "Aanya R.", t: "The peonies arrived gorgeous and on time. My mum cried happy tears. Thank you, Rainbow!", r: 5 },
            { n: "Vikram S.", t: "The custom bouquet builder is brilliant. Wife loved the chocolates add-on too.", r: 5 },
            { n: "Priya M.", t: "Best floral packaging I've ever seen. Felt like opening a luxury gift box.", r: 5 },
          ].map((t, i) => (
            <motion.blockquote key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="rounded-3xl bg-card p-7 shadow-sm">
              <div className="mb-3 flex gap-1" style={{ color: "var(--gold)" }}>
                {Array.from({ length: t.r }).map((_, k) => <Star key={k} className="h-4 w-4 fill-current" />)}
              </div>
              <p className="text-foreground/80">"{t.t}"</p>
              <footer className="mt-4 text-sm font-semibold">— {t.n}</footer>
            </motion.blockquote>
          ))}
        </div>
      </section>

      {/* INSTAGRAM */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-8 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Follow our florists</p>
          <h2 className="mt-2 flex items-center justify-center gap-3 font-display text-4xl md:text-5xl">
            <Instagram className="h-8 w-8" /> @rainbowboutique
          </h2>
        </div>
        <div className="grid grid-cols-3 gap-2 md:grid-cols-6">
          {[...products, ...products].slice(0, 6).map((p, i) => (
            <a key={i} href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="group relative block aspect-square overflow-hidden rounded-2xl">
              <img src={p.image} alt="" loading="lazy" width={400} height={400} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 grid place-items-center bg-foreground/0 transition group-hover:bg-foreground/40">
                <Instagram className="h-6 w-6 text-white opacity-0 transition group-hover:opacity-100" />
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
