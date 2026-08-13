import type { Metadata } from "next";
import { Inter, Noto_Sans_Devanagari, Yatra_One, Bodoni_Moda, Cinzel } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const notoSansDevanagari = Noto_Sans_Devanagari({
  weight: ["400", "500", "700"],
  subsets: ["devanagari", "latin"],
  variable: "--font-devanagari",
});

const yatraOne = Yatra_One({
  weight: "400",
  subsets: ["devanagari", "latin"],
  variable: "--font-yatra",
});

const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-didoska",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  variable: "--font-cinzel",
});

export const metadata: Metadata = {
  title: "भाई के गाने | Bhai Ke Gaane",
  description: "Personal music player",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${notoSansDevanagari.variable} ${yatraOne.variable} ${bodoniModa.variable} ${cinzel.variable} antialiased font-sans bg-black text-white overflow-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
