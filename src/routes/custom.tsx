import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Check, ShoppingBag } from "lucide-react";
import { addOns } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

export const Route = createFileRoute("/custom")({
  head: () => ({
    meta: [
      { title: "Build Your Bouquet — Rainbow Boutique" },
      { name: "description", content: "Design a custom bouquet — pick blooms, colors, wrap and add-ons. Delivered same-day." },
    ],
  }),
  component: Custom,
});

const flowers = [
  { id: "rose", name: "Roses", emoji: "🌹", price: 80 },
  { id: "tulip", name: "Tulips", emoji: "🌷", price: 100 },
  { id: "lily", name: "Lilies", emoji: "🌼", price: 120 },
  { id: "orchid", name: "Orchids", emoji: "🪷", price: 180 },
  { id: "peony", name: "Peonies", emoji: "🌸", price: 150 },
  { id: "sunflower", name: "Sunflowers", emoji: "🌻", price: 70 },
];
const colors = [
  { id: "blush", name: "Blush Pink", hex: "#F8C3CD" },
  { id: "ivory", name: "Ivory", hex: "#F4E9D8" },
  { id: "lavender", name: "Lavender", hex: "#C9B6E4" },
  { id: "peach", name: "Peach", hex: "#FFCBA4" },
  { id: "red", name: "Crimson", hex: "#B33A3A" },
  { id: "mixed", name: "Mixed", hex: "linear-gradient(135deg,#F8C3CD,#C9B6E4,#FFCBA4)" },
];
const wraps = [
  { id: "kraft", name: "Kraft Paper", price: 0 },
  { id: "satin", name: "Satin Ribbon", price: 99 },
  { id: "gift-box", name: "Premium Gift Box", price: 249 },
];

function Custom() {
  const { add } = useCart();
  const [flower, setFlower] = useState("rose");
  const [color, setColor] = useState("blush");
  const [count, setCount] = useState(12);
  const [wrap, setWrap] = useState("kraft");
  const [extras, setExtras] = useState<string[]>([]);
  const [note, setNote] = useState("");

  const total = useMemo(() => {
    const f = flowers.find((x) => x.id === flower)!;
    const w = wraps.find((x) => x.id === wrap)!;
    const e = extras.reduce((s, id) => s + (addOns.find((a) => a.id === id)?.price ?? 0), 0);
    return f.price * count + w.price + e + 199; // craft fee
  }, [flower, count, wrap, extras]);

  function addToCart() {
    const f = flowers.find((x) => x.id === flower)!;
    const c = colors.find((x) => x.id === color)!;
    add(
      {
        id: `custom-${Date.now()}`,
        name: `Custom ${c.name} ${f.name} (${count} stems)`,
        price: total,
        image: "",
        category: "Custom",
        occasion: [],
        rating: 5,
        reviews: 0,
        description: `Custom bouquet · ${count} ${f.name.toLowerCase()} · ${c.name} · ${wraps.find((w) => w.id === wrap)?.name}${note ? ` · "${note}"` : ""}`,
      },
      1,
      extras,
    );
    toast.success("Custom bouquet added to cart 🌸");
  }

  const f = flowers.find((x) => x.id === flower)!;
  const c = colors.find((x) => x.id === color)!;

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <header className="mb-12 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Custom Bouquet Builder</p>
        <h1 className="mt-2 font-display text-5xl md:text-6xl">Design your bouquet</h1>
      </header>

      <div className="grid gap-10 lg:grid-cols-[1fr_400px]">
        <div className="space-y-10">
          <section>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider">1 · Choose Flower</h2>
            <div className="grid grid-cols-3 gap-3 md:grid-cols-6">
              {flowers.map((x) => (
                <button key={x.id} onClick={() => setFlower(x.id)} className={`relative rounded-2xl border p-4 text-center transition ${flower === x.id ? "border-primary bg-secondary" : "border-border bg-card hover:bg-secondary"}`}>
                  <div className="text-3xl">{x.emoji}</div>
                  <div className="mt-2 text-xs font-medium">{x.name}</div>
                  <div className="text-[10px] text-muted-foreground">₹{x.price}/stem</div>
                  {flower === x.id && <Check className="absolute right-1 top-1 h-4 w-4 text-primary" />}
                </button>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider">2 · Color Palette</h2>
            <div className="flex flex-wrap gap-3">
              {colors.map((x) => (
                <button key={x.id} onClick={() => setColor(x.id)} className={`flex items-center gap-2 rounded-full border px-3 py-2 text-xs transition ${color === x.id ? "border-primary bg-secondary" : "border-border bg-card"}`}>
                  <span className="h-5 w-5 rounded-full border border-border" style={{ background: x.hex }} />
                  {x.name}
                </button>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider">3 · Number of Stems</h2>
            <input type="range" min={6} max={36} step={3} value={count} onChange={(e) => setCount(+e.target.value)} className="w-full accent-[color:var(--primary)]" />
            <div className="mt-2 flex justify-between text-xs text-muted-foreground"><span>6</span><span className="font-display text-2xl text-foreground">{count} stems</span><span>36</span></div>
          </section>

          <section>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider">4 · Wrap</h2>
            <div className="grid grid-cols-3 gap-3">
              {wraps.map((x) => (
                <button key={x.id} onClick={() => setWrap(x.id)} className={`rounded-2xl border p-4 text-sm transition ${wrap === x.id ? "border-primary bg-secondary" : "border-border bg-card hover:bg-secondary"}`}>
                  <div className="font-medium">{x.name}</div>
                  <div className="text-xs text-muted-foreground">{x.price === 0 ? "Included" : `+₹${x.price}`}</div>
                </button>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider">5 · Add-ons</h2>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
              {addOns.map((a) => {
                const on = extras.includes(a.id);
                return (
                  <button key={a.id} onClick={() => setExtras((p) => on ? p.filter((x) => x !== a.id) : [...p, a.id])}
                    className={`rounded-2xl border p-3 text-left text-xs transition ${on ? "border-primary bg-secondary" : "border-border bg-card hover:bg-secondary"}`}>
                    <div className="text-2xl">{a.emoji}</div>
                    <div className="mt-1 font-medium">{a.name}</div>
                    <div className="text-muted-foreground">+₹{a.price}</div>
                  </button>
                );
              })}
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider">6 · Personal Note</h2>
            <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Write a sweet message…" rows={3} className="w-full rounded-2xl border border-border bg-card p-4 text-sm" />
          </section>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <motion.div layout className="rounded-3xl bg-card p-8 shadow-[var(--shadow-petal)]">
            <div className="mb-6 grid aspect-square place-items-center rounded-2xl" style={{ background: `radial-gradient(circle at 30% 30%, ${c.hex.startsWith("linear") ? "#F8C3CD" : c.hex}, oklch(0.97 0.02 80))` }}>
              <motion.div key={flower + color + count} initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring" }} className="text-8xl">{f.emoji}</motion.div>
            </div>
            <h3 className="font-display text-2xl">Your Bouquet</h3>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>{count} × {f.name}</li>
              <li>Color: {c.name}</li>
              <li>Wrap: {wraps.find((w) => w.id === wrap)?.name}</li>
              {extras.length > 0 && <li>Extras: {extras.map((id) => addOns.find((a) => a.id === id)?.name).join(", ")}</li>}
            </ul>
            <div className="mt-6 border-t pt-4">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-muted-foreground">Total</span>
                <span className="font-display text-3xl">₹{total.toLocaleString("en-IN")}</span>
              </div>
              <button onClick={addToCart} className="btn-hero mt-4 flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold">
                <ShoppingBag className="h-4 w-4" /> Add to Cart
              </button>
            </div>
          </motion.div>
        </aside>
      </div>
    </main>
  );
}
