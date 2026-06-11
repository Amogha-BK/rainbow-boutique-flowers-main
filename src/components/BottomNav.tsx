import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Search, Heart, ShoppingBag, User } from "lucide-react";
import { useCart } from "@/context/CartContext";

const items = [
  { to: "/", label: "Home", icon: Home },
  { to: "/shop", label: "Shop", icon: Search },
  { to: "/dashboard", label: "Wish", icon: Heart },
  { to: "/cart", label: "Cart", icon: ShoppingBag },
  { to: "/dashboard", label: "Me", icon: User },
] as const;

export function BottomNav() {
  const { count } = useCart();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 glass border-t md:hidden">
      <ul className="mx-auto grid max-w-md grid-cols-5">
        {items.map((it, idx) => {
          const active = pathname === it.to;
          const Icon = it.icon;
          return (
            <li key={idx}>
              <Link to={it.to} className="flex flex-col items-center gap-0.5 py-2.5 text-[10px]">
                <span className={`relative grid h-9 w-9 place-items-center rounded-full transition ${active ? "text-primary-foreground" : "text-foreground/70"}`} style={active ? { background: "var(--gradient-primary)" } : undefined}>
                  <Icon className="h-4 w-4" />
                  {it.label === "Cart" && count > 0 && <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[9px] font-bold text-primary-foreground">{count}</span>}
                </span>
                <span className={active ? "font-semibold" : ""}>{it.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
