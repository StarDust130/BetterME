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
      <main className="flex md:px-6 py-3 flex-col w-full">
        {children}
        <Navbar />
      </main>
    </>
  );
}
