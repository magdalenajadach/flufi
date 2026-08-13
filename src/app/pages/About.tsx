import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import flufiLogo from "@/imports/logo_flufi.png";
import livingLabLogo from "@/imports/living_lab.png";
import uczelniaBadawczaLogo from "@/imports/uczelnia.png";
import pawIcon from "@/imports/ikonka__apka_przycisk.png";

const team = [
  "Anna Bednarczyk",
  "Rio Furgał",
  "Magdalena Jadach",
  "Jagoda Cierniak",
  "Joanna Grzymała-Moszczyńska",
  "Karolina Sikora",
];

const teamPawColors = [
  "#ef4444", // red
  "#f97316", // orange
  "#eab308", // yellow
  "#22c55e", // green
  "#3b82f6", // blue
  "#a855f7", // purple
];

export default function About() {
  return (
    <main className="min-h-screen bg-[#f0ebe2] flex items-center justify-center p-4 lg:p-0">
      <div className="w-full max-w-[890px] bg-[#f0ebe2] flex flex-col overflow-hidden">
        <nav
          aria-label="Wstecz"
          className="px-2 pt-6 pb-4 flex-shrink-0"
        >
          <Link
            to="/"
            className="w-10 h-10 flex items-center justify-center -ml-2 text-neutral-600 hover:text-neutral-900 transition-all motion-safe:hover:scale-[1.03] active:scale-[0.97]"
          >
            <ArrowLeft size={20} strokeWidth={2} />
          </Link>
        </nav>

        <div className="px-2 pb-16 flex flex-col items-center text-center gap-6">
          <div className="w-full">
            <h1 className="text-[32px] sm:text-[38px] font-bold text-neutral-900 leading-tight tracking-tight">
              O nas
            </h1>
          </div>

          <div className="w-32 sm:w-40 opacity-80 mx-auto flex justify-center">
            <ImageWithFallback
              src={flufiLogo}
              alt=""
              className="w-16 h-16 object-contain mx-auto"
              style={{ mixBlendMode: "multiply" }}
            />
          </div>

          <div className="text-left max-w-[600px] mx-auto text-[14px] text-neutral-700 leading-relaxed space-y-4">
            <p>
              Flufi to proste narzędzie cyfrowe, które łączy
              osoby chcące pomagać zwierzętom z konkretnymi
              możliwościami zaangażowania oferowanymi przez
              schroniska, fundacje i organizacje społeczne.
              Można tu znaleźć informacje o aktualnych
              potrzebach organizacji, wydarzeniach i lokalnych
              inicjatywach, a także wybrać sposób pomagania
              dopasowany do własnego czasu i możliwości.
              Narzędzie powstało w ramach procesu Living Lab, w
              którym wspólnie z różnymi osobami i organizacjami
              pracowaliśmy nad rozwiązaniem odpowiadającym na
              rzeczywiste potrzeby.
            </p>

            <p>
              Więcej informacji o projekcie można znaleźć na stronie
              {' '}
              <a
                href="https://calila.id.uj.edu.pl/nabor-na-minigranty-projekty-2026-zaangazowanie-dla-zwierzat"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:no-underline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                projektu „Zaangażowanie dla zwierząt”
                <span className="sr-only"> (otwiera się w nowej karcie)</span>
              </a>.
            </p>


            <div>
              <h2 className="text-[15px] font-bold text-neutral-900 mb-1">
                Zespół projektu
              </h2>
              <ul className="list-none pl-0 space-y-1.5">
                {team.map((name, index) => (
                  <li key={name} className="flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className="inline-block w-4 h-4 shrink-0"
                      style={{
                        backgroundColor:
                          teamPawColors[index % teamPawColors.length],
                        WebkitMaskImage: `url(${pawIcon})`,
                        maskImage: `url(${pawIcon})`,
                        WebkitMaskSize: "contain",
                        maskSize: "contain",
                        WebkitMaskRepeat: "no-repeat",
                        maskRepeat: "no-repeat",
                        WebkitMaskPosition: "center",
                        maskPosition: "center",
                      }}
                    />
                    {name}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-[15px] font-bold text-neutral-900 mb-1">
                Kontakt
              </h2>
              <a
                href="mailto:anna.bednarczyk@uj.edu.pl"
                className="text-amber-700 underline"
              >
                anna.bednarczyk@uj.edu.pl
              </a>
            </div>

            <div>
              <h2 className="text-[15px] font-bold text-neutral-900 mb-1">
                Finansowanie
              </h2>
              <p>
                Działanie finansowane jest ze środków Programu
                Flagowego Living Lab Useful Research HUB w
                ramach Programu Strategicznego Inicjatywa
                Doskonałości w Uniwersytecie Jagiellońskim.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-8 pt-8 pb-4 opacity-90">
            <ImageWithFallback
              src={livingLabLogo}
              alt="Campus Living Lab"
              className="h-24 w-auto object-contain"
            />
            <ImageWithFallback
              src={uczelniaBadawczaLogo}
              alt="Uczelnia Badawcza"
              className="h-24 w-auto object-contain"
            />
          </div>
        </div>
      </div>
    </main>
  );
}