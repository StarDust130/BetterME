import type { Metadata } from "next";
import { Caveat } from "next/font/google";
import "./globals.css";

const font = Caveat({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "BetterME",
  description: "A better way to manage your daily habits.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${font.className} antialiased`}>{children}</body>
    </html>
  );
}
