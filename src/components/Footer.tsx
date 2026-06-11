import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Youtube, Linkedin } from "lucide-react";

const SocialLink = ({ href, label, children }: { href: string; label: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="grid h-10 w-10 place-items-center rounded-full border border-border transition hover:bg-primary hover:text-primary-foreground">
    {children}
  </a>
);

export function Footer() {
  return (
    <footer className="mt-24 border-t" style={{ background: "var(--gradient-soft)" }}>
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-full" style={{ background: "var(--gradient-primary)" }}>🌸</span>
            <span className="font-display text-xl">Rainbow Boutique</span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">Delivering Smiles Through Flowers 🌸</p>
          <p className="mt-4 text-xs text-muted-foreground">Hand-tied, hand-delivered with love. Same-day delivery across the city.</p>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">Shop</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/shop">All Bouquets</Link></li>
            <li><Link to="/occasions">By Occasion</Link></li>
            <li><Link to="/custom">Custom Bouquet</Link></li>
            <li><Link to="/shop">Best Sellers</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/dashboard">My Account</Link></li>
            <li><Link to="/admin">Admin</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">Stay in bloom</h4>
          <p className="mb-3 text-sm text-muted-foreground">Get 10% off your first order.</p>
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="you@email.com" className="flex-1 rounded-full border border-border bg-background px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
            <button className="rounded-full px-4 py-2 text-sm font-medium text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>Join</button>
          </form>
          <div className="mt-6 flex flex-wrap gap-2">
            <SocialLink href="https://instagram.com" label="Instagram"><Instagram className="h-4 w-4" /></SocialLink>
            <SocialLink href="https://facebook.com" label="Facebook"><Facebook className="h-4 w-4" /></SocialLink>
            <SocialLink href="https://pinterest.com" label="Pinterest"><span className="text-sm font-bold">P</span></SocialLink>
            <SocialLink href="https://youtube.com" label="YouTube"><Youtube className="h-4 w-4" /></SocialLink>
            <SocialLink href="https://x.com" label="X"><span className="text-sm font-bold">𝕏</span></SocialLink>
            <SocialLink href="https://linkedin.com" label="LinkedIn"><Linkedin className="h-4 w-4" /></SocialLink>
          </div>
        </div>
      </div>
      <div className="border-t">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-6 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} Rainbow Boutique. All rights reserved.</p>
          <p>Razorpay · Stripe · PayPal · UPI · COD</p>
        </div>
      </div>
    </footer>
  );
}
