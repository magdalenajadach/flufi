import { ArrowLeft, MapPin, Users, Mail, Repeat } from "lucide-react";
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

type Frequency = "one-off" | "recurring";

const FREQUENCY_LABEL: Record<Frequency, string> = {
  "one-off": "Jednorazowo",
  recurring: "Cyklicznie",
};

type Opportunity = {
  id: number;
  category: string;
  title: string;
  shelter: string;
  shelterDescription?: string;
  day?: string;
  time?: string;
  duration?: string;
  frequency?: Frequency;
  spots?: number;
  location: string;
  requirements?: string[];
  beginnerFriendly?: boolean;
  isOpen?: boolean;
  postedAgo?: string;
  contact?: {
    email?: string;
    formUrl?: string;
  };
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
    shelterDescription:
      "Miejskie schronisko prowadzone przez Kraków — pod opieką ok. 150 psów i kotów.",
    day: "Sobota",
    time: "10:00–12:00",
    duration: "ok. 2 godziny",
    frequency: "recurring",
    spots: 2,
    location: "Kraków",
    requirements: ["Brak wymaganego doświadczenia"],
    beginnerFriendly: true,
    isOpen: true,
    postedAgo: "3 dni temu",
    contact: { email: "kontakt@schroniskokrakow.pl" },
  },
  {
    id: 2,
    category: "wyprowadzanie-psow",
    title: "Wyprowadzanie psów",
    shelter: "Schronisko Nowa Huta",
    day: "Niedziela",
    time: "09:00–11:00",
    duration: "ok. 2 godziny",
    frequency: "recurring",
    spots: 3,
    location: "Kraków, Nowa Huta",
    requirements: ["Brak wymaganego doświadczenia"],
    beginnerFriendly: true,
    isOpen: true,
    postedAgo: "3 dni temu",
    contact: { email: "wolontariat@schroniskonh.pl" },
  },
  {
    id: 3,
    category: "transport",
    title: "Transport żywności",
    shelter: "Fundacja Łapa",
    shelterDescription:
      "Mała fundacja non-profit zajmująca się transportem i dokarmianiem zwierząt z terenu Małopolski.",
    day: "środa",
    time: "14:00–16:00",
    duration: "ok. 2 godziny",
    frequency: "one-off",
    spots: 1,
    location: "Kraków → Wieliczka",
    requirements: ["Własny samochód", "Prawo jazdy kat. B"],
    beginnerFriendly: true,
    isOpen: true,
    postedAgo: "5 godzin temu",
    contact: { email: "pomoc@fundacjalapa.pl" },
  },
  {
    id: 4,
    category: "wydarzenie",
    title: "Targi adopcyjne",
    shelter: "Animal Friends PL",
    shelterDescription:
      "Organizacja społeczna wspierająca adopcje zwierząt ze schronisk w regionie krakowskim.",
    day: "Sobota",
    time: "11:00–17:00",
    duration: "ok. 6 godzin",
    frequency: "one-off",
    spots: 5,
    location: "Rynek Główny, Kraków",
    requirements: [
      "Dyspozycyjność przez cały dzień",
      "Mile widziana siła fizyczna (przenoszenie sprzętu)",
    ],
    beginnerFriendly: true,
    isOpen: true,
    postedAgo: "2 dni temu",
    contact: { formUrl: "https://animalfriends.pl/kontakt" },
  },
  {
    id: 5,
    category: "dostawy",
    title: "Zakup i dostawa jedzenia",
    shelter: "Schronisko Kraków Południe",
    day: "Piątek",
    time: "12:00–14:00",
    duration: "ok. 2 godziny",
    frequency: "one-off",
    spots: 1,
    location: "Kraków",
    requirements: ["Własny samochód"],
    beginnerFriendly: true,
    isOpen: true,
    postedAgo: "1 dzień temu",
    contact: { email: "wydarzenia@schroniskokrakowpd.pl" },
  },
  {
    id: 6,
    category: "online",
    title: "Opisy zdjęć",
    shelter: "Fundacja Łapa",
    day: "Elastycznie",
    time: "Zdalnie",
    duration: "ok. 1 godzina tygodniowo",
    frequency: "recurring",
    spots: 4,
    location: "Online",
    requirements: ["Dobra znajomość języka polskiego"],
    beginnerFriendly: true,
    isOpen: true,
    postedAgo: "Wczoraj",
    contact: { email: "pomoc@fundacjalapa.pl" },
  },
  {
    id: 7,
    category: "online",
    title: "Posty do mediów społecznościowych",
    shelter: "Animal Friends PL",
    day: "Elastycznie",
    time: "Zdalnie",
    frequency: "recurring",
    spots: 2,
    location: "Online",
    requirements: [
      "Doświadczenie w prowadzeniu social media",
      "Wcześniejszy kontakt mailowy wymagany",
    ],
    beginnerFriendly: false,
    isOpen: true,
    postedAgo: "Wczoraj",
    contact: { formUrl: "https://animalfriends.pl/kontakt" },
  },
  {
    id: 8,
    category: "adopcja",
    title: "Rodzina zastępcza",
    shelter: "Schronisko Nowa Huta",
    day: "Codziennie",
    time: "—",
    frequency: "recurring",
    spots: 3,
    location: "Twój dom",
    requirements: [
      "Miejsce w domu na czasowy pobyt zwierzęcia",
      "Wcześniejsze szkolenie wymagane",
      "Zgoda na wizytę przedadopcyjną",
    ],
    beginnerFriendly: false,
    isOpen: true,
    postedAgo: "4 dni temu",
    contact: { email: "adopcje@schroniskonh.pl" },
  },
  {
    id: 9,
    category: "adopcja",
    title: "Reksio",
    shelter: "Schronisko Kraków Północ",
    location: "Kraków",
    requirements: [
      "Spotkanie zapoznawcze w schronisku",
      "Podpisanie umowy adopcyjnej",
    ],
    isOpen: true,
    postedAgo: "3 dni temu",
    contact: { email: "adopcje@schroniskokrakow.pl" },
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
    requirements: [
      "Spotkanie zapoznawcze w schronisku",
      "Podpisanie umowy adopcyjnej",
    ],
    isOpen: true,
    postedAgo: "1 tydzień temu",
    contact: { formUrl: "https://animalfriends.pl/kontakt" },
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
    requirements: [
      "Spotkanie zapoznawcze w schronisku",
      "Podpisanie umowy adopcyjnej",
    ],
    isOpen: true,
    postedAgo: "2 tygodnie temu",
    contact: { email: "wydarzenia@schroniskokrakowpd.pl" },
    animal: {
      species: "Pies",
      breed: "Beagle mieszaniec",
      age: "6 miesięcy",
      description: "Szczeniak pełen energii, szuka cierpliwych opiekunów.",
    },
  },
];

function ContactLink({ contact }: { contact?: Opportunity["contact"] }) {
  if (!contact?.email && !contact?.formUrl) return null;
  return (
    <a
      href={contact.email ? `mailto:${contact.email}` : contact.formUrl}
      target={contact.formUrl ? "_blank" : undefined}
      rel={contact.formUrl ? "noopener noreferrer" : undefined}
      className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-neutral-600 underline underline-offset-2 hover:text-neutral-900 hover:no-underline outline-none focus-visible:ring-[3px] focus-visible:ring-neutral-900 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f0ebe2] rounded-sm"
    >
      <Mail size={13} strokeWidth={2} />
      Napisz bezpośrednio do organizacji
    </a>
  );
}

function StatusBadges({ opp }: { opp: Opportunity }) {
  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {opp.frequency && (
        <span className="inline-flex items-center gap-1 text-[11px] font-medium border border-neutral-200 text-neutral-600 px-2 py-0.5 rounded-full">
          <Repeat size={10} strokeWidth={2} />
          {FREQUENCY_LABEL[opp.frequency]}
        </span>
      )}
      {opp.beginnerFriendly && (
        <span className="text-[11px] font-medium bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-full">
          Dla początkujących
        </span>
      )}
      {opp.isOpen !== undefined && (
        <span
          className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${
            opp.isOpen
              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
              : "bg-neutral-100 text-neutral-500 border-neutral-200"
          }`}
        >
          {opp.isOpen ? "Zgłoszenia otwarte" : "Zgłoszenia zamknięte"}
        </span>
      )}
    </div>
  );
}

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
              className="w-10 h-10 flex items-center justify-center -ml-2 text-neutral-600 hover:text-neutral-900 transition-all motion-safe:hover:scale-[1.03] active:scale-[0.97] outline-none focus-visible:ring-[3px] focus-visible:ring-neutral-900 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f0ebe2] rounded-full"
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
                className="text-sm font-medium text-amber-600 underline outline-none focus-visible:ring-[3px] focus-visible:ring-neutral-900 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f0ebe2] rounded-sm"
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

                  <StatusBadges opp={opp} />

                  <p className="text-[13px] text-neutral-700 leading-snug">
                    {animal.description}
                  </p>

                  {opp.requirements && opp.requirements.length > 0 && (
                    <div>
                      <p className="text-[12px] font-medium text-neutral-500 mb-1">
                        Co dalej
                      </p>
                      <ul className="flex flex-col gap-0.5">
                        {opp.requirements.map((req) => (
                          <li
                            key={req}
                            className="text-[12.5px] text-neutral-600 leading-snug"
                          >
                            • {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex items-center justify-between gap-3">
                    {opp.postedAgo && (
                      <span className="text-[12px] text-neutral-400">
                        {opp.postedAgo}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-start gap-3 flex-wrap pt-1">
                    <button
                      onClick={() =>
                        setJoined((prev) =>
                          isJoined
                            ? prev.filter((x) => x !== opp.id)
                            : [...prev, opp.id],
                        )
                      }
                      className={`px-5 py-2 rounded-xl text-[13px] font-semibold transition-all motion-safe:hover:scale-[1.03] active:scale-[0.98] outline-none focus-visible:ring-[3px] focus-visible:ring-neutral-900 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f0ebe2] ${
                        isJoined
                          ? "bg-neutral-100 text-neutral-500"
                          : "bg-[#f0a0bc] text-neutral-900 hover:opacity-90"
                      }`}
                    >
                      {isJoined ? "Zgłoszono ✓" : "Chcę adoptować"}
                    </button>
                    <ContactLink contact={opp.contact} />
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
                {opp.shelterDescription && (
                  <p className="text-[12px] text-neutral-400 -mt-1 leading-snug">
                    {opp.shelterDescription}
                  </p>
                )}

                <StatusBadges opp={opp} />

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
                      {opp.duration ? ` · ${opp.duration}` : ""}
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

                {/* Requirements */}
                {opp.requirements && opp.requirements.length > 0 && (
                  <div>
                    <p className="text-[12px] font-medium text-neutral-500 mb-1">
                      Wymagania
                    </p>
                    <ul className="flex flex-col gap-0.5">
                      {opp.requirements.map((req) => (
                        <li
                          key={req}
                          className="text-[12.5px] text-neutral-600 leading-snug"
                        >
                          • {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {opp.postedAgo && (
                  <span className="text-[12px] text-neutral-400">
                    {opp.postedAgo}
                  </span>
                )}

                {/* Join button + direct contact - left aligned, own row */}
                <div className="flex items-center justify-start gap-3 flex-wrap pt-1">
                  <button
                    onClick={() =>
                      setJoined((prev) =>
                        isJoined
                          ? prev.filter((x) => x !== opp.id)
                          : [...prev, opp.id],
                      )
                    }
                    className={`px-5 py-2 rounded-xl text-[13px] font-semibold transition-all motion-safe:hover:scale-[1.03] active:scale-[0.98] outline-none focus-visible:ring-[3px] focus-visible:ring-neutral-900 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f0ebe2] ${
                      isJoined
                        ? "bg-neutral-100 text-neutral-500"
                        : "bg-[#b7aff7] text-neutral-900 hover:opacity-90"
                    }`}
                  >
                    {isJoined ? "Zapisano" : "Dołącz"}
                  </button>
                  <ContactLink contact={opp.contact} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
