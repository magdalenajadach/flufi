import { Link } from "react-router";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import flufiLogo from "@/imports/logo_flufi.png";
import pawIcon from "@/imports/ikonka__apka_przycisk.png";
import aboutIcon from "@/imports/adopcja_love_dziekuje.png";

const cards = [
  {
    path: "/find-help",
    variant: "outline",
    border: "border-[#f0a0bc]",
    title: "Znajdź sposób na pomoc",
    subtitle:
      "Dopasuj swój czas i umiejętności\ndo potrzeb zwierząt",
  },
  {
    path: "/needs",
    variant: "blob",
    fill: "#b7aff7",
    title: "Aktualne potrzeby w okolicy",
    subtitle:
      "Sprawdź, czego w tej chwili\npotrzebują schroniska",
    blobPath:
      "M 15 30 C 0 10, 35 -12, 40 15 C 30 35, 55 30, 60 8 C 140 -10, 260 -5, 350 10 C 395 18, 405 40, 392 55 C 415 75, 405 105, 380 118 C 300 145, 180 130, 95 140 C 45 146, 8 132, 15 105 C -10 90, 0 55, 15 30 Z",
  },
];

function BlobBackground({ fill, path }) {
  return (
    <svg
      viewBox="0 0 400 140"
      preserveAspectRatio="none"
      className="absolute inset-0 w-full h-full"
    >
      <path d={path} fill={fill} />
    </svg>
  );
}

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
          className="relative flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-semibold text-neutral-700 hover:text-neutral-900 transition-all motion-safe:hover:scale-[1.03] active:scale-[0.97]"
        >
          <AboutBlobBackground />
          <span className="relative z-10">
            O projekcie i pieskach
          </span>
        </Link>
      </div>

      {/* Main content, centered in remaining space */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-[890px] lg:h-[644px] bg-[#f0ebe2] flex flex-col lg:flex-row overflow-hidden">
          {/* Flufi */}
          <div className="relative w-full lg:w-[43%] flex-shrink-0 flex items-center justify-center lg:justify-start py-4 lg:py-0">
            <ImageWithFallback
              src={flufiLogo}
              alt="Flufi the dog"
              className="w-40 sm:w-56 lg:w-[95%] h-auto"
              style={{ mixBlendMode: "multiply" }}
            />
          </div>
          {/* Right column - title + cards */}
          <div className="flex-1 flex flex-col items-center lg:items-start justify-center px-1 lg:px-0 lg:pr-10 pb-8 lg:pb-0">
            {/* Title block */}
            <div className="mb-6 lg:mb-8 w-full text-center lg:text-left">
              <h1 className="text-[32px] sm:text-[38px] lg:text-[46px] font-bold text-neutral-900 leading-tight tracking-tight">
                Jak pomóc?
              </h1>
              <p className="text-[13px] font-medium text-neutral-600 mt-1 leading-snug">
                Wybierz rodzaj wsparcia, jaki chcesz zaoferować
              </p>
            </div>
            {/* Cards */}
            <div className="flex flex-col gap-4 lg:gap-8 w-full">
              {cards.map((card) => (
                <Link
                  key={card.path}
                  to={card.path}
                  className={`relative flex flex-row items-center gap-4 px-5 py-5 lg:px-7 lg:py-6 hover:opacity-90 transition-all motion-safe:hover:scale-[1.03] active:scale-[0.97] ${
                    card.variant === "outline"
                      ? `rounded-[28px] lg:rounded-full border-2 ${card.border}`
                      : ""
                  }`}
                >
                  {card.variant === "blob" && (
                    <BlobBackground
                      fill={card.fill}
                      path={card.blobPath}
                    />
                  )}
                  <ImageWithFallback
                    src={pawIcon}
                    alt="paw"
                    className="relative z-10 w-10 h-10 lg:w-12 lg:h-12 flex-shrink-0 object-contain"
                    style={{ mixBlendMode: "multiply" }}
                  />
                  <div className="relative z-10 flex flex-col text-left">
                    <span className="text-[16px] lg:text-[18px] font-bold text-neutral-900 leading-snug">
                      {card.title}
                    </span>
                    <span className="text-[12.5px] lg:text-[13px] text-neutral-700 leading-snug whitespace-pre-line mt-1">
                      {card.subtitle}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}