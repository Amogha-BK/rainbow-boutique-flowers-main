import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Star, Heart, ShoppingBag, Truck, ShieldCheck, Calendar, Gift, Minus, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { findProduct, products, addOns } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/products/$id")({
  loader: ({ params }) => {
    const product = findProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.product.name} — Rainbow Boutique` },
      { name: "description", content: loaderData?.product.description },
      { property: "og:title", content: `${loaderData?.product.name} — Rainbow Boutique` },
      { property: "og:description", content: loaderData?.product.description },
      { property: "og:image", content: loaderData?.product.image },
    ],
  }),
  notFoundComponent: () => (
    <div className="grid min-h-[50vh] place-items-center text-center">
      <div><h1 className="font-display text-3xl">Bouquet not found</h1><Link to="/shop" className="mt-4 inline-block underline">Back to shop</Link></div>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add, toggleWish, wishlist } = useCart();
  const [qty, setQty] = useState(1);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [date, setDate] = useState("");
  const wished = wishlist.includes(product.id);

  const related = products.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <nav className="mb-6 text-xs text-muted-foreground"><Link to="/shop">Shop</Link> / {product.category} / {product.name}</nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative overflow-hidden rounded-[2rem]">
          <img src={product.image} alt={product.name} width={1000} height={1000} className="aspect-square w-full object-cover" />
        </motion.div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{product.category}</p>
          <h1 className="mt-2 font-display text-4xl md:text-5xl">{product.name}</h1>
          <div className="mt-3 flex items-center gap-2 text-sm">
            <div className="flex" style={{ color: "var(--gold)" }}>
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className={`h-4 w-4 ${i < Math.round(product.rating) ? "fill-current" : ""}`} />)}
            </div>
            <span className="text-muted-foreground">{product.rating} · {product.reviews} reviews</span>
          </div>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-display text-4xl">₹{product.price.toLocaleString("en-IN")}</span>
            {product.oldPrice && <span className="text-muted-foreground line-through">₹{product.oldPrice.toLocaleString("en-IN")}</span>}
          </div>

          <p className="mt-6 text-foreground/80">{product.description}</p>

          {/* ADD-ONS */}
          <div className="mt-8">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider"><Gift className="mr-1 inline h-4 w-4" /> Add-ons</h3>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
              {addOns.map((a) => {
                const on = selectedAddOns.includes(a.id);
                return (
                  <button key={a.id} onClick={() => setSelectedAddOns((p) => on ? p.filter((x) => x !== a.id) : [...p, a.id])}
                    className={`rounded-2xl border p-3 text-left text-xs transition ${on ? "border-primary bg-secondary" : "border-border bg-card hover:bg-secondary"}`}>
                    <div className="text-lg">{a.emoji}</div>
                    <div className="mt-1 font-medium">{a.name}</div>
                    <div className="text-muted-foreground">+₹{a.price}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* DELIVERY */}
          <div className="mt-6">
            <label className="mb-2 block text-sm font-semibold uppercase tracking-wider"><Calendar className="mr-1 inline h-4 w-4" /> Delivery Date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} min={new Date().toISOString().slice(0, 10)} className="rounded-full border border-border bg-card px-4 py-3 text-sm" />
            <p className="mt-2 text-xs text-muted-foreground">✨ Same-day delivery available if ordered before 4pm.</p>
          </div>

          {/* QTY + CTA */}
          <div className="mt-8 grid grid-cols-[auto_1fr_auto] gap-3">
            <div className="flex items-center rounded-full border border-border">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid h-12 w-12 place-items-center"><Minus className="h-4 w-4" /></button>
              <span className="w-10 text-center font-semibold">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="grid h-12 w-12 place-items-center"><Plus className="h-4 w-4" /></button>
            </div>
            <button onClick={() => add(product, qty, selectedAddOns)} className="btn-hero flex items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold">
              <ShoppingBag className="h-4 w-4" /> Add to Cart
            </button>
            <button onClick={() => toggleWish(product.id)} aria-label="Wishlist" className="grid h-12 w-12 place-items-center rounded-full border border-border">
              <Heart className={`h-5 w-5 ${wished ? "fill-primary text-primary" : ""}`} />
            </button>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-2 rounded-2xl bg-secondary px-4 py-3"><Truck className="h-4 w-4" /> Same-day delivery</div>
            <div className="flex items-center gap-2 rounded-2xl bg-secondary px-4 py-3"><ShieldCheck className="h-4 w-4" /> 7-day freshness</div>
          </div>
        </div>
      </div>

      {/* STICKY MOBILE CTA */}
      <div className="fixed inset-x-0 bottom-16 z-30 border-t glass p-3 md:hidden">
        <button onClick={() => add(product, qty, selectedAddOns)} className="btn-hero flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold">
          Add to Cart · ₹{(product.price * qty).toLocaleString("en-IN")}
        </button>
      </div>

      <section className="mt-20">
        <h2 className="mb-8 font-display text-3xl">You may also love</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>
    </main>
  );
}
