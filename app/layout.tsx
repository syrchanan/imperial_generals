import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import SiteFooter from "@/components/SiteFooter";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Imperial Generals",
  description: "Community-based Historical RPG",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background text-foreground flex flex-col min-h-screen`}>
        <header>
          <NavBar />
        </header>
        <main className="flex-grow">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
