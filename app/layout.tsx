import TestBanner from './test-banner';
import CookieBanner from './cookies-banner';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mom&Baby - Platforma pentru mame si copii",
  description: "Cumpara si vinde obiecte pentru mame si copii, simplu si sigur.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ro"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body>
        <TestBanner />
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}