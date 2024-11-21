import { Button } from "@/components/ui/button";
import { Cover } from "@/components/ui/cover";
import Link from "next/link";
import Header from "@/components/elements/Header";

export default function Home() {
  return (
    <>
      <Header />

      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
          <div className="mx-auto text-center">
            <div>
              <h1 className="text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto mt-6 py-6 bg-clip-text text-transparent bg-gradient-to-b from-blue-600  via-red-500 to-yellow-300">
                Transform yourself effortlessly, <br />{" "}
                <Cover>one habit at a time! </Cover>
              </h1>
            </div>

            <p className="mt-4 sm:text-xl">
              Improve your daily habits and achieve your goals effortlessly with
              BetterMe!
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button asChild size={"lg"}>
                <Link href="/home">Get Started</Link>
              </Button>
              <Button variant={"outline"} asChild size={"lg"}>
                <Link href="/home">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
