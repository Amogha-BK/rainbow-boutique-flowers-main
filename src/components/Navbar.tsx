import { Link, useRouterState } from "@tanstack/react-router";
import { Heart, Search, ShoppingBag, User, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/occasions", label: "Occasions" },
  { to: "/custom", label: "Custom Bouquet" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const { count, wishlist } = useCart();
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-40 glass">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-10 w-10 place-items-center rounded-full text-lg" style={{ background: "var(--gradient-primary)" }}>🌸</span>
          <div className="leading-tight">
            <div className="font-display text-lg font-semibold tracking-tight">Rainbow Boutique</div>
            <div className="hidden text-[10px] uppercase tracking-[0.2em] text-muted-foreground md:block">Delivering Smiles Through Flowers</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="relative text-sm font-medium text-foreground/80 transition hover:text-foreground">
              {l.label}
              {pathname === l.to && (
                <motion.span layoutId="nav-underline" className="absolute -bottom-1 left-0 right-0 h-px" style={{ background: "var(--gradient-primary)" }} />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <button aria-label="Search" className="grid h-10 w-10 place-items-center rounded-full hover:bg-secondary"><Search className="h-4 w-4" /></button>
          <Link to="/dashboard" aria-label="Wishlist" className="relative grid h-10 w-10 place-items-center rounded-full hover:bg-secondary">
            <Heart className="h-4 w-4" />
            {wishlist.length > 0 && <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">{wishlist.length}</span>}
          </Link>
          <Link to="/dashboard" aria-label="Account" className="hidden h-10 w-10 place-items-center rounded-full hover:bg-secondary md:grid"><User className="h-4 w-4" /></Link>
          <Link to="/cart" aria-label="Cart" className="relative grid h-10 w-10 place-items-center rounded-full hover:bg-secondary">
            <ShoppingBag className="h-4 w-4" />
            {count > 0 && <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">{count}</span>}
          </Link>
          <button aria-label="Menu" onClick={() => setOpen(true)} className="grid h-10 w-10 place-items-center rounded-full hover:bg-secondary lg:hidden"><Menu className="h-5 w-5" /></button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/40 lg:hidden" onClick={() => setOpen(false)}>
            <motion.aside
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="absolute right-0 top-0 h-full w-72 bg-background p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="font-display text-xl">Menu</span>
                <button onClick={() => setOpen(false)} className="grid h-9 w-9 place-items-center rounded-full hover:bg-secondary"><X className="h-5 w-5" /></button>
              </div>
              <nav className="flex flex-col gap-1">
                {links.map((l) => (
                  <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-base font-medium hover:bg-secondary">{l.label}</Link>
                ))}
                <Link to="/admin" onClick={() => setOpen(false)} className="mt-4 rounded-lg px-3 py-3 text-sm text-muted-foreground hover:bg-secondary">Admin</Link>
              </nav>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
