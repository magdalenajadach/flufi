import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

const points = [
  {
    lead: "Pamiętaj, że zwierzęta mogą cierpieć.",
    text: "Możesz spotkać się z chorobą, strachem, zaniedbaniem lub skutkami przemocy. Takie sytuacje bywają trudne emocjonalnie — warto mieć świadomość, że pomoc nie zawsze oznacza łatwe i przyjemne doświadczenie.",
  },
  {
    lead: "Oceń swoje możliwości.",
    text: "Zastanów się, ile masz czasu, energii i środków, a także czy dana aktywność odpowiada Twoim umiejętnościom i doświadczeniu. Nie musisz robić wszystkiego — wybierz formę pomocy, która jest dla Ciebie dostępna - to i tak dużo!",
  },
  {
    lead: "Czytaj ogłoszenia uważnie.",
    text: "Sprawdź miejsce, termin, zakres obowiązków, wymagania i informacje o organizacji. Jeśli coś jest niejasne, skontaktuj się z organizatorami przed zgłoszeniem.",
  },
  {
    lead: "Szanuj czas innych.",
    text: "Jeśli zadeklarujesz udział, postaraj się dotrzymać zobowiązania. Nie odwołuj udziału w ostatniej chwili bez ważnego powodu. Jeśli nie możesz przyjść, poinformuj organizację jak najwcześniej — ktoś inny może dzięki temu przejąć Twoje zadanie.",
  },
  {
    lead: "Działaj odpowiedzialnie i zgodnie z instrukcjami.",
    text: "Przestrzegaj zasad bezpieczeństwa i wskazówek osób opiekujących się zwierzętami. Nie podejmuj działań, do których nie masz przygotowania, i pamiętaj, że dobro zwierzęcia jest najważniejsze.",
  },
  {
    lead: "Pamiętaj, że pomagać można na różne sposoby.",
    text: "Wolontariat nie zawsze oznacza regularną pracę w schronisku. Możesz pomagać jednorazowo, wspierać zbiórki, transport, promocję adopcji, działania edukacyjne lub inicjatywy na rzecz praw zwierząt. Każda osoba znajdzie coś dla siebie!",
  },
  {
    lead: "Wolontariat to współpraca i odpowiedzialność.",
    text: "Organizacje mogą ustalać zasady udziału, wymagać szkolenia, podpisania porozumienia wolontariackiego lub określonej dyspozycyjności. Przed rozpoczęciem upewnij się, jakie warunki obowiązują w danym miejscu i czy odpowiadają Twoim możliwościom zaangażowania.",
  },
];

export default function BeforeYouHelp() {
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
          <div className="w-full">
            <h1 className="text-[32px] sm:text-[38px] font-bold text-neutral-900 leading-tight tracking-tight">
              Zanim zaangażujesz się w pomoc zwierzętom
            </h1>
          </div>

          <div className="text-left max-w-[600px] mx-auto text-[14px] text-neutral-700 leading-relaxed space-y-4">
            <p>
              Pomoc zwierzętom może dawać dużo satysfakcji, ale
              wiąże się również z odpowiedzialnością i niekiedy z
              trudnymi emocjami. Zanim zgłosisz się do działania,
              zastanów się, co możesz zaoferować i na co jesteś
              gotowy/a.
            </p>

            <ul className="list-disc pl-5 space-y-3 marker:text-neutral-400">
              {points.map(({ lead, text }) => (
                <li key={lead}>
                  <span className="font-bold text-neutral-900">
                    {lead}
                  </span>{' '}
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
