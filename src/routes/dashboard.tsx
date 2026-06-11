import { createFileRoute, Link } from "@tanstack/react-router";
import { Package, Heart, MapPin, Settings, User } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "My Account — Rainbow Boutique" }] }),
  component: Dashboard,
});

const mockOrders = [
  { id: "RB-3421", date: "Jun 02, 2026", status: "Delivered", total: 1499, items: "Blush Romance Roses" },
  { id: "RB-3287", date: "May 18, 2026", status: "Delivered", total: 2499, items: "Snow Orchid Arrangement" },
  { id: "RB-3105", date: "Apr 22, 2026", status: "Delivered", total: 1399, items: "Sunlit Garden Mix" },
];

function Dashboard() {
  const { wishlist } = useCart();
  const wished = products.filter((p) => wishlist.includes(p.id));

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <header className="mb-10 flex items-center gap-5">
        <div className="grid h-16 w-16 place-items-center rounded-full text-2xl text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>A</div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Welcome back</p>
          <h1 className="font-display text-3xl">Aanya 🌸</h1>
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-4">
        {[
          { I: Package, l: "Orders", v: mockOrders.length },
          { I: Heart, l: "Wishlist", v: wishlist.length },
          { I: MapPin, l: "Addresses", v: 2 },
          { I: User, l: "Reward Points", v: 320 },
        ].map(({ I, l, v }) => (
          <div key={l} className="rounded-3xl bg-card p-6">
            <I className="h-5 w-5 text-muted-foreground" />
            <div className="mt-3 font-display text-3xl">{v}</div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">{l}</div>
          </div>
        ))}
      </div>

      <section className="mt-12">
        <h2 className="mb-5 font-display text-2xl">Recent Orders</h2>
        <div className="overflow-hidden rounded-3xl bg-card">
          <table className="w-full text-left text-sm">
            <thead className="bg-secondary text-xs uppercase tracking-wider"><tr>
              <th className="p-4">Order</th><th className="p-4">Date</th><th className="p-4 hidden md:table-cell">Items</th><th className="p-4">Total</th><th className="p-4">Status</th>
            </tr></thead>
            <tbody>
              {mockOrders.map((o) => (
                <tr key={o.id} className="border-t">
                  <td className="p-4 font-medium">{o.id}</td>
                  <td className="p-4 text-muted-foreground">{o.date}</td>
                  <td className="p-4 hidden md:table-cell">{o.items}</td>
                  <td className="p-4">₹{o.total}</td>
                  <td className="p-4"><span className="rounded-full bg-secondary px-3 py-1 text-xs">{o.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-display text-2xl">Your Wishlist</h2>
          <Link to="/shop" className="text-sm underline-offset-4 hover:underline">Browse more →</Link>
        </div>
        {wished.length === 0 ? (
          <p className="rounded-3xl bg-card p-10 text-center text-muted-foreground">Your wishlist is empty. Heart a bouquet to save it here.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {wished.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        )}
      </section>
    </main>
  );
}
