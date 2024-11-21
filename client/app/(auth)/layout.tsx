import BackButton from "@/components/elements/BackButton";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex justify-center w-full h-screen items-center">
      {" "}
      {children} <BackButton />
    </main>
  );
}
