import type { Metadata } from "next";
import { Doto, Luxurious_Roman, Faustina, Coiny } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Menu from "@/components/Menu";
import Head from "next/head";

const faustina = Faustina({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-faustina",
  display: "swap",
});

const luxuriousRoman = Luxurious_Roman({
  subsets: ["latin"],
  variable: "--font-luxurious-roman",
  weight: ["400"],
  display: "swap",
});

const coiny = Coiny({
  subsets: ["latin"],
  variable: "--font-coiny",
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "KritOWo",
  description: "Design me to the moon and let me code among the stars",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${luxuriousRoman.variable} ${coiny.variable} ${faustina.variable} antialiased `}
    >
      <body className="font-body bg-background text-foreground flex flex-col justify-stretch h-screen overflow-auto relative w-screen overflow-x-hidden">
        <Header />
        <div className="p-8 flex-grow max-w-4xl mx-auto ">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
