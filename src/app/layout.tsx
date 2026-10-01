import type { Metadata } from "next";
import { Luxurious_Roman, Faustina, Didact_Gothic } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const faustina = Faustina({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-faustina",
  display: "swap",
});

const didactGothic = Didact_Gothic({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-didact-gothic",
  display: "swap",
});

const luxuriousRoman = Luxurious_Roman({
  subsets: ["latin"],
  variable: "--font-luxurious-roman",
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
      className={`${luxuriousRoman.variable} ${didactGothic.variable} ${faustina.variable} antialiased `}
    >
      <body className="font-body bg-background text-foreground flex flex-col justify-stretch h-screen overflow-auto relative w-screen overflow-x-hidden">
        <Header />
        <div className="p-8 flex-grow max-w-4xl mx-auto ">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
