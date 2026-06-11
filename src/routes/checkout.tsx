import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — Rainbow Boutique" }] }),
  component: Checkout,
});

const methods = [
  { id: "razorpay", name: "Razorpay", desc: "Cards · UPI · NetBanking", emoji: "💳" },
  { id: "stripe", name: "Stripe", desc: "International cards", emoji: "🌍" },
  { id: "paypal", name: "PayPal", desc: "Pay with PayPal balance", emoji: "🅿️" },
  { id: "upi", name: "UPI", desc: "PhonePe · GPay · Paytm", emoji: "📱" },
  { id: "cod", name: "Cash on Delivery", desc: "Pay when you receive", emoji: "💵" },
];

function Checkout() {
  const { items, subtotal, clear } = useCart();
  const [pay, setPay] = useState("razorpay");
  const [done, setDone] = useState(false);
  const total = subtotal + (subtotal > 999 ? 0 : 99) + Math.round(subtotal * 0.05);

  function place(e: React.FormEvent) {
    e.preventDefault();
    setDone(true);
    clear();
    toast.success("Order placed! Thank you for choosing Rainbow Boutique 🌸");
  }

  if (done) {
    return (
      <main className="mx-auto grid min-h-[60vh] max-w-md place-items-center px-6 py-20 text-center">
        <div>
          <CheckCircle2 className="mx-auto h-16 w-16 text-primary" />
          <h1 className="mt-4 font-display text-3xl">Order Confirmed 🌸</h1>
          <p className="mt-2 text-muted-foreground">A confirmation has been sent to your email. We're hand-tying your bouquet now.</p>
          <Link to="/" className="btn-hero mt-6 inline-flex rounded-full px-6 py-3 text-sm font-semibold">Back to Home</Link>
        </div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="mx-auto grid min-h-[50vh] max-w-md place-items-center text-center"><div>
        <p>Your cart is empty.</p><Link to="/shop" className="mt-2 inline-block underline">Browse bouquets</Link>
      </div></main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="mb-10 font-display text-4xl md:text-5xl">Checkout</h1>
      <form onSubmit={place} className="grid gap-10 lg:grid-cols-[1fr_400px]">
        <div className="space-y-8">
          <section className="rounded-3xl bg-card p-6">
            <h2 className="mb-4 font-display text-xl">Delivery Details</h2>
            <div className="grid gap-3 md:grid-cols-2">
              <input required placeholder="Full name" className="rounded-full border border-border bg-background px-4 py-3 text-sm" />
              <input required type="tel" placeholder="Phone" className="rounded-full border border-border bg-background px-4 py-3 text-sm" />
              <input required type="email" placeholder="Email" className="rounded-full border border-border bg-background px-4 py-3 text-sm md:col-span-2" />
              <input required placeholder="Address" className="rounded-full border border-border bg-background px-4 py-3 text-sm md:col-span-2" />
              <input required placeholder="City" className="rounded-full border border-border bg-background px-4 py-3 text-sm" />
              <input required placeholder="PIN code" className="rounded-full border border-border bg-background px-4 py-3 text-sm" />
              <input type="date" min={new Date().toISOString().slice(0, 10)} className="rounded-full border border-border bg-background px-4 py-3 text-sm md:col-span-2" />
            </div>
          </section>

          <section className="rounded-3xl bg-card p-6">
            <h2 className="mb-4 font-display text-xl">Payment Method</h2>
            <div className="grid gap-3 md:grid-cols-2">
              {methods.map((m) => (
                <label key={m.id} className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-4 transition ${pay === m.id ? "border-primary bg-secondary" : "border-border"}`}>
                  <input type="radio" name="pay" checked={pay === m.id} onChange={() => setPay(m.id)} className="sr-only" />
                  <span className="text-2xl">{m.emoji}</span>
                  <div><div className="text-sm font-semibold">{m.name}</div><div className="text-xs text-muted-foreground">{m.desc}</div></div>
                </label>
              ))}
            </div>
          </section>
        </div>

        <aside className="rounded-3xl bg-card p-6 lg:sticky lg:top-24 lg:h-fit">
          <h3 className="mb-4 font-display text-xl">Order ({items.length})</h3>
          <ul className="space-y-2 text-sm">
            {items.map((i) => (
              <li key={i.product.id} className="flex justify-between"><span className="truncate pr-2">{i.qty} × {i.product.name}</span><span>₹{(i.qty * i.product.price).toLocaleString("en-IN")}</span></li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between border-t pt-4 font-display text-2xl"><span>Total</span><span>₹{total.toLocaleString("en-IN")}</span></div>
          <button type="submit" className="btn-hero mt-5 flex w-full items-center justify-center rounded-full py-3.5 text-sm font-semibold">Place Order</button>
        </aside>
      </form>
    </main>
  );
}
