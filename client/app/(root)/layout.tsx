import Header from "@/components/elements/Header";
import Navbar from "@/components/elements/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main suppressHydrationWarning className="flex md:px-6 py-3 md:mb-10 flex-col w-full">
        {children}
        <Navbar />
      </main>
    </>
  );
}
