import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop All Bouquets — Rainbow Boutique" },
      { name: "description", content: "Browse our full collection of premium bouquets — roses, tulips, orchids, peonies and more." },
      { property: "og:title", content: "Shop — Rainbow Boutique" },
      { property: "og:description", content: "Luxury bouquets with same-day delivery." },
    ],
  }),
  component: Shop,
});

const categories = ["All", "Roses", "Tulips", "Orchids", "Peonies", "Lilies", "Mixed"];
const sorts = ["Featured", "Price: Low → High", "Price: High → Low", "Top Rated"] as const;

function Shop() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [sort, setSort] = useState<(typeof sorts)[number]>("Featured");
  const [max, setMax] = useState(3000);

  const filtered = useMemo(() => {
    let list = products.filter((p) =>
      (cat === "All" || p.category === cat) &&
      p.price <= max &&
      (q === "" || p.name.toLowerCase().includes(q.toLowerCase()))
    );
    if (sort === "Price: Low → High") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "Price: High → Low") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "Top Rated") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [q, cat, sort, max]);

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <header className="mb-10 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">The Shop</p>
        <h1 className="mt-2 font-display text-5xl md:text-6xl">All Bouquets</h1>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">Crafted by hand, delivered the same day. Find your perfect bloom below.</p>
      </header>

      <div className="mb-8 grid gap-3 md:grid-cols-[1fr_auto_auto]">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search bouquets…" className="w-full rounded-full border border-border bg-card py-3 pl-11 pr-4 text-sm outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <select value={sort} onChange={(e) => setSort(e.target.value as any)} className="rounded-full border border-border bg-card px-4 py-3 text-sm">
          {sorts.map((s) => <option key={s}>{s}</option>)}
        </select>
        <div className="flex items-center gap-3 rounded-full border border-border bg-card px-4 py-3 text-sm">
          <SlidersHorizontal className="h-4 w-4" />
          <label>Max ₹{max}</label>
          <input type="range" min={500} max={3000} step={100} value={max} onChange={(e) => setMax(+e.target.value)} className="w-28 accent-[color:var(--primary)]" />
        </div>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button key={c} onClick={() => setCat(c)} className={`rounded-full px-4 py-2 text-sm transition ${cat === c ? "text-primary-foreground" : "bg-card hover:bg-secondary"}`} style={cat === c ? { background: "var(--gradient-primary)" } : undefined}>
            {c}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="py-20 text-center text-muted-foreground">No bouquets match your filters.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      )}
    </main>
  );
}
