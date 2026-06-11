import rose from "@/assets/bouquet-rose.jpg";
import tulip from "@/assets/bouquet-tulip.jpg";
import orchid from "@/assets/bouquet-orchid.jpg";
import peony from "@/assets/bouquet-peony.jpg";
import lily from "@/assets/bouquet-lily.jpg";
import mixed from "@/assets/bouquet-mixed.jpg";

export type Product = {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  category: string;
  occasion: string[];
  bestSeller?: boolean;
  featured?: boolean;
  rating: number;
  reviews: number;
  description: string;
};

export const products: Product[] = [
  { id: "blush-romance", name: "Blush Romance Roses", price: 1499, oldPrice: 1899, image: rose, category: "Roses", occasion: ["Anniversary", "Love", "Birthday"], bestSeller: true, featured: true, rating: 4.9, reviews: 218, description: "A dozen of the freshest pastel-pink roses, hand-tied in soft cream paper. The classic gesture, reimagined." },
  { id: "lavender-dreams", name: "Lavender Dreams Tulips", price: 1299, image: tulip, category: "Tulips", occasion: ["Birthday", "Thank You"], featured: true, rating: 4.8, reviews: 142, description: "Ivory tulips paired with fragrant lavender stems — calm, fresh, and unmistakably elegant." },
  { id: "snow-orchid", name: "Snow Orchid Arrangement", price: 2499, oldPrice: 2999, image: orchid, category: "Orchids", occasion: ["Congratulations", "Sympathy"], bestSeller: true, rating: 5.0, reviews: 96, description: "A statement phalaenopsis in a hand-thrown ceramic vase. Long-lasting and quietly luxurious." },
  { id: "peach-peony", name: "Peach Peony Cloud", price: 1799, image: peony, category: "Peonies", occasion: ["Anniversary", "Wedding"], featured: true, rating: 4.9, reviews: 187, description: "Lush ruffled peonies with sprigs of eucalyptus. A romantic, garden-fresh bloom." },
  { id: "white-lily", name: "White Lily Bouquet", price: 1599, image: lily, category: "Lilies", occasion: ["Sympathy", "Thank You"], rating: 4.7, reviews: 73, description: "Pure white lilies in artisanal kraft wrap — a timeless gesture of grace." },
  { id: "sunlit-mix", name: "Sunlit Garden Mix", price: 1399, oldPrice: 1699, image: mixed, category: "Mixed", occasion: ["Birthday", "Get Well"], bestSeller: true, rating: 4.8, reviews: 204, description: "Sunflowers, blush roses and seasonal blooms — pure joy in a bouquet." },
];

export const occasions = [
  { slug: "anniversary", name: "Anniversary", emoji: "💕" },
  { slug: "birthday", name: "Birthday", emoji: "🎂" },
  { slug: "wedding", name: "Wedding", emoji: "💍" },
  { slug: "sympathy", name: "Sympathy", emoji: "🕊️" },
  { slug: "congratulations", name: "Congratulations", emoji: "🎉" },
  { slug: "get-well", name: "Get Well", emoji: "🌿" },
];

export const addOns = [
  { id: "cake", name: "Chocolate Cake (500g)", price: 599, emoji: "🍰" },
  { id: "chocolates", name: "Belgian Chocolates", price: 449, emoji: "🍫" },
  { id: "teddy", name: "Plush Teddy Bear", price: 399, emoji: "🧸" },
  { id: "card", name: "Handwritten Card", price: 99, emoji: "💌" },
  { id: "wrap", name: "Premium Gift Wrap", price: 149, emoji: "🎁" },
];

export function findProduct(id: string) {
  return products.find((p) => p.id === id);
}
