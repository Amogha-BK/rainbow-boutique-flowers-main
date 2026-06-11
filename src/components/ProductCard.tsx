import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "@/lib/products";
import { useCart } from "@/context/CartContext";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { add, toggleWish, wishlist } = useCart();
  const wished = wishlist.includes(product.id);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group relative overflow-hidden rounded-3xl bg-card shadow-sm transition hover:shadow-[var(--shadow-petal)]"
    >
      <Link to="/products/$id" params={{ id: product.id }} className="block">
        <div className="relative aspect-square overflow-hidden">
          <img src={product.image} alt={product.name} loading="lazy" width={800} height={800} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
          {product.bestSeller && (
            <span className="absolute left-3 top-3 rounded-full bg-foreground/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-background">Best Seller</span>
          )}
          {product.oldPrice && (
            <span className="absolute right-3 top-3 rounded-full px-3 py-1 text-[10px] font-bold text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
              -{Math.round((1 - product.price / product.oldPrice) * 100)}%
            </span>
          )}
        </div>
        <div className="space-y-2 p-5">
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{product.category}</p>
          <h3 className="font-display text-xl leading-tight">{product.name}</h3>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="h-3 w-3 fill-current text-gold" style={{ color: "var(--gold)" }} />
            {product.rating} <span>· {product.reviews} reviews</span>
          </div>
          <div className="flex items-baseline gap-2 pt-1">
            <span className="font-display text-2xl font-semibold">₹{product.price.toLocaleString("en-IN")}</span>
            {product.oldPrice && <span className="text-sm text-muted-foreground line-through">₹{product.oldPrice.toLocaleString("en-IN")}</span>}
          </div>
        </div>
      </Link>
      <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 transition group-hover:opacity-100">
        <button
          onClick={(e) => { e.preventDefault(); toggleWish(product.id); }}
          aria-label="Wishlist"
          className="grid h-9 w-9 place-items-center rounded-full bg-background/90 backdrop-blur"
        >
          <Heart className={`h-4 w-4 ${wished ? "fill-primary text-primary" : ""}`} />
        </button>
      </div>
      <button
        onClick={(e) => { e.preventDefault(); add(product); }}
        className="absolute inset-x-5 bottom-5 flex translate-y-16 items-center justify-center gap-2 rounded-full py-2.5 text-sm font-medium text-primary-foreground opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100"
        style={{ background: "var(--gradient-primary)" }}
      >
        <ShoppingBag className="h-4 w-4" /> Add to Cart
      </button>
    </motion.article>
  );
}
