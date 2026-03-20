import type { Metadata } from "next";
import { Manrope, Outfit } from "next/font/google";
import "./globals.css";
import Nav from "@/components/nav";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit", 
  weight: ["300", "400", "500", "600"],
})

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["300", "400", "500"],
})

export const metadata: Metadata = {
  title: "Scopus",
  description: "Build your own optical instrument. A Hack Club YSWS program.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${manrope.variable}`}>
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}