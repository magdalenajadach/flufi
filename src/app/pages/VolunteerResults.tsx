import { ArrowLeft, MapPin, Users } from "lucide-react";
import { Link, useSearchParams } from "react-router";
import { useState } from "react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import imgKalendarz from "@/imports/kalendarz.png";
import imgAdopcja from "@/imports/adopcja_love_dziekuje.png";

const LABEL_MAP: Record<string, string> = {
  "wyprowadzanie-psow": "Spacer z psem",
  transport: "Transport",
  wydarzenie: "Wydarzenia",
  dostawy: "Zakupy",
  online: "Pomoc online",
  adopcja: "Adopcja",
};

type Opportunity = {
  id: number;
  category: string;
  title: string;
  shelter: string;
  day?: string;
  time?: string;
  spots?: number;
  location: string;
  // Fields only present for adoptable-animal entries
  animal?: {
    species: "Pies" | "Kot";
    breed: string;
    age: string;
    description: string;
  };
};

const ALL_OPPORTUNITIES: Opportunity[] = [
  {
    id: 1,
    category: "wyprowadzanie-psow",
    title: "Wyprowadzanie psów",
    shelter: "Schronisko Kraków Północ",
    day: "Sobota",
    time: "10:00–12:00",
    spots: 2,
    location: "Kraków",
  },
  {
    id: 2,
    category: "wyprowadzanie-psow",
    title: "Wyprowadzanie psów",
    shelter: "Schronisko Nowa Huta",
    day: "Niedziela",
    time: "09:00–11:00",
    spots: 3,
    location: "Kraków, Nowa Huta",
  },
  {
    id: 3,
    category: "transport",
    title: "Transport żywności",
    shelter: "Fundacja Łapa",
    day: "środa",
    time: "14:00–16:00",
    spots: 1,
    location: "Kraków → Wieliczka",
  },
  {
    id: 4,
    category: "wydarzenie",
    title: "Targi adopcyjne",
    shelter: "Animal Friends PL",
    day: "Sobota",
    time: "11:00–17:00",
    spots: 5,
    location: "Rynek Główny, Kraków",
  },
  {
    id: 5,
    category: "dostawy",
    title: "Zakup i dostawa jedzenia",
    shelter: "Schronisko Kraków Południe",
    day: "Piątek",
    time: "12:00–14:00",
    spots: 1,
    location: "Kraków",
  },
  {
    id: 6,
    category: "online",
    title: "Opisy zdjęć",
    shelter: "Fundacja Łapa",
    day: "Elastycznie",
    time: "Zdalnie",
    spots: 4,
    location: "Online",
  },
  {
    id: 7,
    category: "online",
    title: "Posty do mediów społecznościowych",
    shelter: "Animal Friends PL",
    day: "Elastycznie",
    time: "Zdalnie",
    spots: 2,
    location: "Online",
  },
  {
    id: 8,
    category: "adopcja",
    title: "Rodzina zastępcza",
    shelter: "Schronisko Nowa Huta",
    day: "Codziennie",
    time: "—",
    spots: 3,
    location: "Twój dom",
  },
  {
    id: 9,
    category: "adopcja",
    title: "Reksio",
    shelter: "Schronisko Kraków Północ",
    location: "Kraków",
    animal: {
      species: "Pies",
      breed: "Mieszaniec",
      age: "2 lata",
      description:
        "Wesoły i energiczny, uwielbia długie spacery i zabawę piłką.",
    },
  },
  {
    id: 10,
    category: "adopcja",
    title: "Bella",
    shelter: "Animal Friends PL",
    location: "Kraków",
    animal: {
      species: "Pies",
      breed: "Owczarek mieszaniec",
      age: "4 lata",
      description:
        "Przyjazna wobec innych psów, idealna dla aktywnej rodziny.",
    },
  },
  {
    id: 11,
    category: "adopcja",
    title: "Luna",
    shelter: "Schronisko Kraków Południe",
    location: "Kraków",
    animal: {
      species: "Pies",
      breed: "Beagle mieszaniec",
      age: "6 miesięcy",
      description: "Szczeniak pełen energii, szuka cierpliwych opiekunów.",
    },
  },
];

export default function VolunteerResults() {
  const [searchParams] = useSearchParams();
  const raw = searchParams.get("categories") ?? "";
  const selected = raw ? raw.split(",") : [];

  const [joined, setJoined] = useState<number[]>([]);

  const list =
    selected.length === 0
      ? ALL_OPPORTUNITIES
      : ALL_OPPORTUNITIES.filter((o) =>
          selected.includes(o.category),
        );

  const activeLabels = selected.map(
    (id) => LABEL_MAP[id] ?? id,
  );

  return (
    <div className="min-h-screen bg-[#f0ebe2] flex items-center justify-center">
      <div className="w-full max-w-[600px] h-[700px] bg-[#f0ebe2] flex flex-col overflow-hidden">
        {/* Fixed header */}
        <div className="px-6 pt-6 pb-4 flex-shrink-0">
          <div className="flex items-center gap-3 mb-6">
            <Link
              to="/find-help"
              className="w-10 h-10 flex items-center justify-center -ml-2 text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              <ArrowLeft size={20} strokeWidth={2} />
            </Link>
            <span className="text-sm font-medium text-neutral-500">
              Możliwości pomocy
            </span>
          </div>

          <h1 className="text-[22px] font-semibold text-neutral-900 leading-tight">
            {selected.length === 0
              ? "Wszystkie możliwości"
              : activeLabels.join(", ")}
          </h1>
          <p className="text-sm text-neutral-400 mt-1">
            {list.length}{" "}
            {list.length === 1 ? "wynik" : "wyniki"} niedaleko
            Krakowa
          </p>
        </div>

        {/* Scrollable list */}
        <div className="flex-1 overflow-y-auto px-6 pb-8 flex flex-col gap-3">
          {list.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
              <span className="text-5xl">🔍</span>
              <p className="text-neutral-500 text-sm">
                Nie znaleziono ofert odpowiadających Twoim
                kryteriom.
              </p>
              <Link
                to="/find-help"
                className="text-sm font-medium text-amber-600 underline"
              >
                Zmień filtry
              </Link>
            </div>
          )}
          {list.map((opp) => {
            const isJoined = joined.includes(opp.id);

            if (opp.animal) {
              const animal = opp.animal;
              return (
                <div
                  key={opp.id}
                  className="border border-neutral-200 rounded-2xl bg-white p-4 flex flex-col gap-3"
                >
                  <div className="flex gap-3">
                    <img
                      src={imgAdopcja}
                      alt={opp.title}
                      style={{
                        width: "72px",
                        height: "72px",
                        objectFit: "contain",
                        flexShrink: 0,
                      }}
                      className="rounded-xl bg-[#f7f4ee]"
                    />
                    <div className="flex flex-col gap-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[15px] font-semibold text-neutral-900">
                          {opp.title}
                        </span>
                        <span className="text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full flex-shrink-0">
                          {animal.species} · {animal.breed}
                        </span>
                      </div>
                      <div className="text-[13px] text-neutral-500">
                        {opp.shelter}
                      </div>
                      <div className="text-[12px] text-neutral-400">
                        {animal.age} &middot; {opp.location}
                      </div>
                    </div>
                  </div>

                  <p className="text-[13px] text-neutral-700 leading-snug">
                    {animal.description}
                  </p>

                  <div className="flex justify-start pt-1">
                    <button
                      onClick={() =>
                        setJoined((prev) =>
                          isJoined
                            ? prev.filter((x) => x !== opp.id)
                            : [...prev, opp.id],
                        )
                      }
                      className={`px-5 py-2 rounded-xl text-[13px] font-semibold transition-all active:scale-[0.98] ${
                        isJoined
                          ? "bg-neutral-100 text-neutral-500"
                          : "bg-[#f0a0bc] text-neutral-900 hover:opacity-90"
                      }`}
                    >
                      {isJoined ? "Zgłoszono ✓" : "Chcę adoptować"}
                    </button>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={opp.id}
                className="border border-neutral-200 rounded-2xl p-4 flex flex-col gap-3 bg-white"
              >
                {/* Top row: title + tag inline */}
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="text-[15px] font-semibold text-neutral-900">
                    {opp.title}
                  </div>
                  <span className="text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full flex-shrink-0">
                    {LABEL_MAP[opp.category] ?? opp.category}
                  </span>
                </div>
                <div className="text-[13px] text-neutral-500 -mt-1">
                  {opp.shelter}
                </div>

                {/* Meta row */}
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  <div className="flex items-center gap-1.5 text-[13px] text-neutral-600">
                    <ImageWithFallback
                      src={imgKalendarz}
                      alt="calendar"
                      className="w-4 h-4 object-contain flex-shrink-0"
                      style={{ mixBlendMode: "multiply" }}
                    />
                    <span>
                      {opp.day} · {opp.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[13px] text-neutral-600">
                    <Users
                      size={13}
                      strokeWidth={2}
                      className="text-neutral-400"
                    />
                    <span>
                      {opp.spots}{" "}
                      {opp.spots === 1
                        ? "osoba potrzebna"
                        : "osoby potrzebne"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[13px] text-neutral-600">
                    <MapPin
                      size={13}
                      strokeWidth={2}
                      className="text-neutral-400"
                    />
                    <span>{opp.location}</span>
                  </div>
                </div>

                {/* Join button - left aligned, own row */}
                <div className="flex justify-start pt-1">
                  <button
                    onClick={() =>
                      setJoined((prev) =>
                        isJoined
                          ? prev.filter((x) => x !== opp.id)
                          : [...prev, opp.id],
                      )
                    }
                    className={`px-5 py-2 rounded-xl text-[13px] font-semibold transition-all active:scale-[0.98] ${
                      isJoined
                        ? "bg-neutral-100 text-neutral-500"
                        : "bg-[#b7aff7] text-neutral-900 hover:opacity-90"
                    }`}
                  >
                    {isJoined ? "Dołączone" : "Dołącz"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}