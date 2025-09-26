import type { Metadata } from "next";
import { Doto, Faustina } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Menu from "@/components/Menu";

const faustina = Faustina({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-faustina",
  display: "swap",
});

const doto = Doto({
  subsets: ["latin"],
  variable: "--font-doto",
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
      className={`${doto.variable} ${faustina.variable} antialiased `}
    >
      <body className="font-body bg-background text-foreground flex flex-col justify-stretch h-screen overflow-auto">
        <Header />
        <div className="p-8 flex-grow max-w-4xl mx-auto">{children}</div>
        <Footer />
        <div className="fixed bottom-0 left-0 right-0 backdrop-blur-md z-15">
          <Menu showOnMobile />
        </div>
      </body>
    </html>
  );
}
