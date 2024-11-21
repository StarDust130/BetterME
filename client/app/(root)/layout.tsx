import Header from "@/components/elements/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="flex md:px-6 py-3 flex-col  h-full w-full">
        {children}
      </main>
    </>
  );
}
