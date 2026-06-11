import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const PHONE = "919866711901";
const MESSAGE = "Hello Rainbow Boutique 🌸, I would like to place a flower order. Please share available bouquets and pricing.";

export const WHATSAPP_URL = `https://wa.me/${PHONE}?text=${encodeURIComponent(MESSAGE)}`;

export function WhatsAppFloat() {
  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Order on WhatsApp"
      className="fixed bottom-24 right-5 z-50 grid h-14 w-14 place-items-center rounded-full text-white shadow-2xl md:bottom-6"
      style={{ background: "linear-gradient(135deg, #25D366, #128C7E)" }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.5 }}
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-green-400 opacity-30" />
      <MessageCircle className="relative h-7 w-7" />
    </motion.a>
  );
}
