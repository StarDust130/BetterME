import type { Metadata } from "next";
import { Patua_One } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/elements/Header";

const font = Patua_One({
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
      <body className={` ${font.className} antialiased`}>
        <ClerkProvider>
          <div className="w-full h-screen flex flex-col">
            <Header />
            {children}
          </div>
        </ClerkProvider>
      </body>
    </html>
  );
}
