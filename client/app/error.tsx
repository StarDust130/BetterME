"use client";
import { Button } from "@/components/ui/button";

// Error boundaries must be Client Components

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div
      suppressHydrationWarning
      className="flex justify-center items-center w-full h-screen flex-col"
    >
      <h1 className="text-2xl mb-2 md:text-4xl">
        {" "}
        Oops! Something went wrong. 🛠️
      </h1>
      <p className="text-gray-500  text-center mx-3">{error?.message}😿</p>
      <div className="main_wrapper">
        <div className="main">
          <div className="antenna">
            <div className="antenna_shadow"></div>
            <div className="a1"></div>
            <div className="a1d"></div>
            <div className="a2"></div>
            <div className="a2d"></div>
            <div className="a_base"></div>
          </div>
          <div className="tv">
            <div className="cruve">
              <svg
                className="curve_svg"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 189.929 189.929"
                xmlSpace="preserve"
              >
                <path
                  d="M70.343,70.343c-30.554,30.553-44.806,72.7-39.102,115.635l-29.738,3.951C-5.442,137.659,11.917,86.34,49.129,49.13
        C86.34,11.918,137.664-5.445,189.928,1.502l-3.95,29.738C143.041,25.54,100.895,39.789,70.343,70.343z"
                ></path>
              </svg>
            </div>
            <div className="display_div">
              <div className="screen_out">
                <div className="screen_out1">
                  <div className="screen">
                    <span className="notfound_text">Error :(</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="lines">
              <div className="line1"></div>
              <div className="line2"></div>
              <div className="line3"></div>
            </div>
            <div className="buttons_div">
              <div className="b1">
                <div></div>
              </div>
              <div className="b2"></div>
              <div className="speakers">
                <div className="g1">
                  <div className="g11"></div>
                  <div className="g12"></div>
                  <div className="g13"></div>
                </div>
                <div className="g"></div>
                <div className="g"></div>
              </div>
            </div>
          </div>
          <div className="bottom">
            <div className="base1"></div>
            <div className="base2"></div>
            <div className="base3"></div>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center gap-3 w-full">
        <Button onClick={reset} size={"lg"}>
          Try Again
        </Button>
        <Button
          size={"lg"}
          onClick={() => {
            window.location.href = "/home";
          }}
          variant={"outline"}
        >
          Go Home
        </Button>
      </div>
    </div>
  );
}
