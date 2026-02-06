import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import { TopNav } from "@/components/layout/TopNav";
import { QueryProvider } from "@/components/providers/QueryProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SanketSetu | Command Center",
  description: "Mission-Critical Crisis Response Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${roboto.variable} bg-slate-950 text-slate-50 antialiased overflow-hidden`}
      >
        <QueryProvider>
          <div className="flex h-screen flex-col">
            <TopNav />
            <main className="flex-1 overflow-hidden relative">
              {children}
            </main>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
