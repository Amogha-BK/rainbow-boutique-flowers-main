import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Trash2, Minus, Plus, Tag, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your Cart — Rainbow Boutique" }] }),
  component: Cart,
});

function Cart() {
  const { items, setQty, remove, subtotal, clear } = useCart();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const delivery = subtotal > 999 ? 0 : 99;
  const tax = Math.round((subtotal - discount) * 0.05);
  const total = Math.max(0, subtotal - discount) + delivery + tax;

  function applyCoupon() {
    const c = coupon.trim().toUpperCase();
    if (c === "BLOOM10") setDiscount(Math.round(subtotal * 0.1));
    else if (c === "RAINBOW20") setDiscount(Math.round(subtotal * 0.2));
    else setDiscount(0);
  }

  if (items.length === 0) {
    return (
      <main className="mx-auto grid min-h-[60vh] max-w-md place-items-center px-6 py-20 text-center">
        <div>
          <div className="text-6xl">🌸</div>
          <h1 className="mt-4 font-display text-3xl">Your cart is empty</h1>
          <p className="mt-2 text-muted-foreground">Let's find something beautiful.</p>
          <Link to="/shop" className="btn-hero mt-6 inline-flex rounded-full px-6 py-3 text-sm font-semibold">Browse bouquets</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="mb-10 font-display text-4xl md:text-5xl">Your Cart</h1>
      <div className="grid gap-10 lg:grid-cols-[1fr_400px]">
        <ul className="space-y-4">
          {items.map((i) => (
            <li key={i.product.id} className="grid grid-cols-[80px_1fr_auto] items-center gap-4 rounded-2xl bg-card p-4 md:grid-cols-[100px_1fr_auto_auto]">
              {i.product.image ? <img src={i.product.image} alt={i.product.name} className="aspect-square w-20 rounded-xl object-cover md:w-24" /> : <div className="grid aspect-square w-20 place-items-center rounded-xl bg-secondary text-3xl md:w-24">🌸</div>}
              <div className="min-w-0">
                <h3 className="font-display text-lg leading-tight">{i.product.name}</h3>
                <p className="text-xs text-muted-foreground">{i.product.category}</p>
                <p className="mt-1 text-sm font-semibold md:hidden">₹{(i.product.price * i.qty).toLocaleString("en-IN")}</p>
              </div>
              <div className="col-span-3 flex items-center justify-between md:col-span-1 md:gap-4">
                <div className="flex items-center rounded-full border border-border">
                  <button onClick={() => setQty(i.product.id, i.qty - 1)} className="grid h-9 w-9 place-items-center"><Minus className="h-3 w-3" /></button>
                  <span className="w-8 text-center text-sm font-semibold">{i.qty}</span>
                  <button onClick={() => setQty(i.product.id, i.qty + 1)} className="grid h-9 w-9 place-items-center"><Plus className="h-3 w-3" /></button>
                </div>
                <button onClick={() => remove(i.product.id)} aria-label="Remove" className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
              </div>
              <div className="hidden text-right md:block"><span className="font-display text-xl">₹{(i.product.price * i.qty).toLocaleString("en-IN")}</span></div>
            </li>
          ))}
          <button onClick={clear} className="text-xs text-muted-foreground underline">Clear cart</button>
        </ul>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl bg-card p-6 shadow-sm">
            <h3 className="font-display text-2xl">Order Summary</h3>
            <dl className="mt-5 space-y-2 text-sm">
              <div className="flex justify-between"><dt>Subtotal</dt><dd>₹{subtotal.toLocaleString("en-IN")}</dd></div>
              {discount > 0 && <div className="flex justify-between text-primary"><dt>Discount</dt><dd>−₹{discount}</dd></div>}
              <div className="flex justify-between"><dt>Delivery</dt><dd>{delivery === 0 ? "Free" : `₹${delivery}`}</dd></div>
              <div className="flex justify-between text-muted-foreground"><dt>Tax (5%)</dt><dd>₹{tax}</dd></div>
              <div className="mt-3 flex justify-between border-t pt-3 font-display text-2xl"><dt>Total</dt><dd>₹{total.toLocaleString("en-IN")}</dd></div>
            </dl>
            <div className="mt-5 flex gap-2">
              <div className="relative flex-1">
                <Tag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="BLOOM10" className="w-full rounded-full border border-border bg-background py-2.5 pl-10 pr-3 text-sm uppercase outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <button onClick={applyCoupon} className="rounded-full bg-secondary px-4 py-2.5 text-sm font-medium">Apply</button>
            </div>
            <Link to="/checkout" className="btn-hero mt-5 flex items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold">
              Proceed to Checkout <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="mt-3 text-center text-[11px] text-muted-foreground">Razorpay · Stripe · PayPal · UPI · COD</p>
          </div>
        </aside>
      </div>
    </main>
  );
}
