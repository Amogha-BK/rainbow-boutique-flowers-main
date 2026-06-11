import { createFileRoute } from "@tanstack/react-router";
import { Package, Users, ShoppingBag, Tag, TrendingUp, Boxes } from "lucide-react";
import { products } from "@/lib/products";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin Dashboard — Rainbow Boutique" }, { name: "robots", content: "noindex" }] }),
  component: Admin,
});

function Admin() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <header className="mb-8">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Admin</p>
        <h1 className="mt-1 font-display text-3xl">Dashboard</h1>
      </header>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { I: ShoppingBag, l: "Orders Today", v: 47, d: "+12%" },
          { I: TrendingUp, l: "Revenue", v: "₹68,420", d: "+8%" },
          { I: Users, l: "Customers", v: 1284, d: "+34" },
          { I: Boxes, l: "In Stock", v: 142, d: "low: 3" },
        ].map(({ I, l, v, d }) => (
          <div key={l} className="rounded-3xl bg-card p-6">
            <div className="flex items-center justify-between"><I className="h-5 w-5 text-muted-foreground" /><span className="text-xs text-primary">{d}</span></div>
            <div className="mt-3 font-display text-3xl">{v}</div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">{l}</div>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl bg-card p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between"><h2 className="font-display text-xl">Products</h2><button className="rounded-full px-4 py-2 text-xs font-semibold text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>+ Add product</button></div>
          <ul className="divide-y">
            {products.map((p) => (
              <li key={p.id} className="grid grid-cols-[48px_1fr_auto_auto] items-center gap-4 py-3 text-sm">
                <img src={p.image} alt="" className="h-12 w-12 rounded-lg object-cover" />
                <div><div className="font-medium">{p.name}</div><div className="text-xs text-muted-foreground">{p.category}</div></div>
                <div>₹{p.price}</div>
                <span className="rounded-full bg-secondary px-2 py-1 text-[10px]">In Stock</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-6">
          <div className="rounded-3xl bg-card p-6">
            <h2 className="mb-4 flex items-center gap-2 font-display text-xl"><Tag className="h-4 w-4" /> Active Coupons</h2>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between rounded-xl bg-secondary p-3"><span className="font-mono font-semibold">BLOOM10</span><span className="text-muted-foreground">10% off</span></li>
              <li className="flex justify-between rounded-xl bg-secondary p-3"><span className="font-mono font-semibold">RAINBOW20</span><span className="text-muted-foreground">20% off</span></li>
            </ul>
          </div>
          <div className="rounded-3xl bg-card p-6">
            <h2 className="mb-4 flex items-center gap-2 font-display text-xl"><Package className="h-4 w-4" /> Recent Orders</h2>
            <ul className="space-y-2 text-sm">
              {[{ id: "RB-3458", n: "Priya M.", t: "₹1,799" }, { id: "RB-3457", n: "Vikram S.", t: "₹2,499" }, { id: "RB-3456", n: "Rohit K.", t: "₹1,299" }].map((o) => (
                <li key={o.id} className="flex justify-between"><span><span className="font-mono">{o.id}</span> · {o.n}</span><span className="font-semibold">{o.t}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
