import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Imperial Generals",
  description: "Community-based Historical RPG",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background text-foreground `}>
        <header>
          <NavBar />
        </header>
        <main>
          {children}
        </main>
        <footer>
        </footer>
      </body>
    </html >
  );
}
