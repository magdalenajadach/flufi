import { Link } from "react-router";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import flufiLogo from "@/imports/logo_flufi.png";
import pawIcon from "@/imports/ikonka__apka_przycisk.png";

// Subtler, flatter blob for the top-right "About" button — pale pink fill
function AboutBlobBackground() {
  return (
    <svg
      viewBox="0 0 300 60"
      preserveAspectRatio="none"
      className="absolute inset-0 w-full h-full"
    >
      <path
        d="M 10 15 C 0 5, 20 -5, 60 3 C 120 -6, 200 4, 270 8 C 295 10, 296 30, 288 38 C 296 48, 290 58, 260 58 C 180 62, 90 56, 40 58 C 15 59, 2 48, 6 32 C -4 24, 2 18, 10 15 Z"
        fill="#f4d9e6"
      />
    </svg>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f0ebe2] flex flex-col p-4 lg:p-0">
      {/* Top nav */}
      <div className="w-full max-w-[810px] mx-auto flex justify-end pt-4 lg:pt-6 flex-shrink-0">
        <Link
          to="/about"
          className="relative flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-semibold text-neutral-700 hover:text-neutral-900 transition-all motion-safe:hover:scale-[1.03] active:scale-[0.97] outline-none focus-visible:ring-[3px] focus-visible:ring-neutral-900 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f0ebe2]"
        >
          <AboutBlobBackground />
          <span className="relative z-10">
            O projekcie i pieskach
          </span>
        </Link>
      </div>

      {/* Main content, centered in remaining space */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-[890px] flex flex-col lg:flex-row overflow-hidden">
          {/* Flufi */}
          <div className="relative w-full lg:w-[43%] flex-shrink-0 flex items-center justify-center lg:justify-start py-4 lg:py-0">
            <ImageWithFallback
              src={flufiLogo}
              alt="Flufi the dog"
              className="w-40 sm:w-56 lg:w-[95%] h-auto"
              style={{ mixBlendMode: "multiply" }}
            />
          </div>
          {/* Right column - hero + CTA */}
          <div className="flex-1 flex flex-col justify-center px-2 lg:px-0 lg:pr-10 pb-8 lg:pb-0">
            <div className="w-full text-center lg:text-left">
              <h1 className="text-[26px] sm:text-[30px] lg:text-[34px] font-bold text-neutral-900 leading-tight tracking-tight">
                Znajdź prosty sposób, by pomóc zwierzętom
              </h1>
              <p className="text-[16px] sm:text-[18px] lg:text-[20px] font-medium text-neutral-500 leading-snug mt-3">
                Wybierz jak chcesz pomóc
              </p>
              <p className="text-[13px] font-medium text-neutral-600 mt-5 leading-snug">
                Flufi pomaga znaleźć konkretne możliwości
                zaangażowania — nie zastępuje procedur adopcyjnych
                ani zasad organizacji.
              </p>
              <div className="flex flex-col gap-5 mt-8 w-full max-w-[420px] mx-auto lg:mx-0">
                <Link
                  to="/before-you-help"
                  className="w-full inline-flex items-center justify-center text-center px-6 py-4 lg:px-7 lg:py-5 rounded-full border-2 border-neutral-900 text-neutral-900 font-bold text-[15px] lg:text-[16px] hover:bg-neutral-900 hover:text-white transition-all motion-safe:hover:scale-[1.03] active:scale-[0.97] outline-none focus-visible:ring-[3px] focus-visible:ring-neutral-900 focus-visible:ring-offset-4 focus-visible:ring-offset-[#f0ebe2]"
                >
                  Na czym polega zaangażowanie dla zwierząt
                </Link>

                <Link
                  to="/how-to-help"
                  className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 lg:px-7 lg:py-5 rounded-full bg-[#b7aff7] text-neutral-900 font-bold text-[15px] lg:text-[16px] hover:opacity-90 transition-all motion-safe:hover:scale-[1.03] active:scale-[0.97] outline-none focus-visible:ring-[3px] focus-visible:ring-neutral-900 focus-visible:ring-offset-4 focus-visible:ring-offset-[#f0ebe2]"
                >
                  <ImageWithFallback
                    src={pawIcon}
                    alt=""
                    className="w-7 h-7 object-contain"
                    style={{ mixBlendMode: "multiply" }}
                  />
                  Zobacz, jak możesz pomóc
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
