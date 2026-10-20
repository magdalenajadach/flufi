import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import flufiLogo from "@/imports/logo_flufi.png";
import pawIcon from "@/imports/ikonka__apka_przycisk.png";

const cards = [
  {
    path: "/find-help",
    variant: "outline",
    border: "border-[#f0a0bc]",
    title: "Znajdź sposób na pomoc",
    subtitle:
      "Nie wiesz, od czego zacząć? Odkryj różne możliwości zaangażowania i wybierz te, które pasują do Twoich możliwości.",
  },
  {
    path: "/needs",
    variant: "blob",
    fill: "#b7aff7",
    title: "Aktualne potrzeby w okolicy",
    subtitle:
      "Wiesz, że chcesz pomóc i szukasz konkretnego działania? Sprawdź, jakich rzeczy, wsparcia lub pomocy potrzebują teraz schroniska w Twojej okolicy.",
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

export default function HowToHelp() {
  return (
    <main className="min-h-screen bg-[#f0ebe2] flex items-center justify-center p-4 lg:p-0">
      <div className="w-full max-w-[890px] bg-[#f0ebe2] flex flex-col overflow-hidden">
        <nav
          aria-label="Wstecz"
          className="px-2 pt-6 pb-4 flex-shrink-0"
        >
          <Link
            to="/"
            className="w-10 h-10 flex items-center justify-center -ml-2 text-neutral-600 hover:text-neutral-900 transition-all motion-safe:hover:scale-[1.03] active:scale-[0.97] outline-none focus-visible:ring-[3px] focus-visible:ring-neutral-900 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f0ebe2] rounded-full"
          >
            <ArrowLeft size={20} strokeWidth={2} />
          </Link>
        </nav>

        <div className="px-2 pb-16 flex flex-col items-center text-center gap-6">
          <div className="w-32 sm:w-40 opacity-80 mx-auto flex justify-center">
            <ImageWithFallback
              src={flufiLogo}
              alt=""
              className="w-16 h-16 object-contain mx-auto"
              style={{ mixBlendMode: "multiply" }}
            />
          </div>

          <div className="w-full max-w-[520px] mx-auto">
            <h1 className="text-[28px] sm:text-[32px] font-bold text-neutral-900 leading-tight tracking-tight">
              Jak pomóc?
            </h1>
            <p className="text-[13px] font-medium text-neutral-600 mt-1 leading-snug">
              Wybierz rodzaj wsparcia, który najbardziej Ci
              odpowiada. Możesz dopasować pomoc do swojego czasu i
              umiejętności albo sprawdzić, czego aktualnie
              potrzebują organizacje w Twojej okolicy.
            </p>
          </div>

          <div className="flex flex-col gap-4 w-full max-w-[520px] mx-auto">
            {cards.map((card) => (
              <Link
                key={card.path}
                to={card.path}
                className={`relative flex flex-row items-start gap-4 px-5 py-5 lg:px-7 lg:py-6 hover:opacity-90 transition-all motion-safe:hover:scale-[1.03] active:scale-[0.97] outline-none focus-visible:ring-[3px] focus-visible:ring-neutral-900 focus-visible:ring-offset-4 focus-visible:ring-offset-[#f0ebe2] rounded-[28px] ${
                  card.variant === "outline"
                    ? `border-2 ${card.border}`
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
                  className="relative z-10 w-10 h-10 lg:w-12 lg:h-12 flex-shrink-0 object-contain mt-0.5"
                  style={{ mixBlendMode: "multiply" }}
                />
                <div className="relative z-10 flex flex-col text-left">
                  <span className="text-[16px] lg:text-[18px] font-bold text-neutral-900 leading-snug">
                    {card.title}
                  </span>
                  <span className="text-[12.5px] lg:text-[13px] text-neutral-700 leading-snug mt-1">
                    {card.subtitle}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
