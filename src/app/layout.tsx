import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Amaan Khan — Data Analyst",
  description: "Portfolio of Amaan Khan — Data Analyst based in Bengaluru.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${GeistMono.variable} dark`}>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
