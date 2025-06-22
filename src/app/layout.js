import { Inter, Montserrat, Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";
import Loader from "../components/Loader";
import SmoothScroll from "../components/SmoothScroll";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Studio Devstag | Digital Entertainment Studio",
  description: "Premium digital entertainment services with VR-first design, interactive experiences, and artistic curation.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${montserrat.variable} ${playfair.variable} ${outfit.variable} antialiased bg-black font-outfit`}
      >
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
