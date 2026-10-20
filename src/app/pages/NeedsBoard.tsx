import {
  ArrowLeft,
  MapPin,
  Users,
  Camera,
  Share2,
  Truck,
  Dog,
  Calendar,
  Clock,
  Mail,
  Repeat,
} from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";

type Frequency = "one-off" | "recurring";

type Need = {
  id: number;
  shelter: string;
  shelterDescription?: string;
  location: string;
  description: string;
  requirements: string[];
  beginnerFriendly: boolean;
  frequency: Frequency;
  date: string;
  duration?: string;
  count?: number;
  unit?: string;
  icon: React.ElementType;
  tag: string;
  tagColor: string;
  postedAgo: string;
  isOpen: boolean;
  contact: {
    email?: string;
    formUrl?: string;
  };
};

const NEEDS: Need[] = [
  {
    id: 1,
    shelter: "Schronisko Kraków Północ",
    shelterDescription:
      "Miejskie schronisko prowadzone przez Kraków — pod opieką ok. 150 psów i kotów.",
    location: "Kraków",
    description: "5 osób do wyprowadzania psów w weekendy",
    requirements: [
      "Brak wymaganego doświadczenia",
      "Mile widziana dobra kondycja",
    ],
    beginnerFriendly: true,
    frequency: "recurring",
    date: "Soboty i niedziele",
    duration: "ok. 2 godziny",
    count: 5,
    unit: "people",
    icon: Dog,
    tag: "Wyprowadzanie psów",
    tagColor: "bg-amber-50 text-amber-700 border-amber-200",
    postedAgo: "2 godziny temu",
    isOpen: true,
    contact: { email: "kontakt@schroniskokrakow.pl" },
  },
  {
    id: 2,
    shelter: "Fundacja Łapa",
    shelterDescription:
      "Mała fundacja non-profit zajmująca się transportem i dokarmianiem zwierząt z terenu Małopolski.",
    location: "Kraków → Wieliczka",
    description:
      "Transport żywności z Tesco w Krakowie do naszego schroniska",
    requirements: ["Własny samochód", "Prawo jazdy kat. B"],
    beginnerFriendly: true,
    frequency: "one-off",
    date: "Środa, 22 października",
    duration: "ok. 2 godziny",
    icon: Truck,
    tag: "Transport",
    tagColor: "bg-blue-50 text-blue-700 border-blue-200",
    postedAgo: "5 godzin temu",
    isOpen: true,
    contact: { email: "pomoc@fundacjalapa.pl" },
  },
  {
    id: 3,
    shelter: "Animal Friends PL",
    shelterDescription:
      "Organizacja społeczna wspierająca adopcje zwierząt ze schronisk w regionie krakowskim.",
    location: "Online",
    description:
      "Ktoś, kto zrobi zdjęcia psom — dobre zdjęcia zwiększają liczbę adopcji trzykrotnie",
    requirements: [
      "Własny aparat lub telefon z dobrym aparatem",
      "Podstawowe doświadczenie w fotografii mile widziane",
    ],
    beginnerFriendly: false,
    frequency: "one-off",
    date: "Do uzgodnienia, w ciągu najbliższych 2 tygodni",
    icon: Camera,
    tag: "Fotografia",
    tagColor: "bg-violet-50 text-violet-700 border-violet-200",
    postedAgo: "Wczoraj",
    isOpen: true,
    contact: { formUrl: "https://animalfriends.pl/kontakt" },
  },
  {
    id: 4,
    shelter: "Schronisko Nowa Huta",
    location: "Online",
    description:
      "Wolontariusz ds. mediów społecznościowych do prowadzenia naszych kont na Instagramie i Facebooku",
    requirements: [
      "Doświadczenie w prowadzeniu social media",
      "Wcześniejszy kontakt mailowy wymagany",
    ],
    beginnerFriendly: false,
    frequency: "recurring",
    date: "Elastycznie",
    duration: "ok. 2 godziny tygodniowo",
    icon: Share2,
    tag: "Pomoc internetowa",
    tagColor: "bg-sky-50 text-sky-700 border-sky-200",
    postedAgo: "Wczoraj",
    isOpen: true,
    contact: { email: "social@schroniskonh.pl" },
  },
  {
    id: 5,
    shelter: "Schronisko Kraków Południe",
    location: "Kraków",
    description:
      "3 osoby do przygotowania weekendowej imprezy na targach adopcyjnych na Rynku Głównym",
    requirements: [
      "Dyspozycyjność przez cały dzień",
      "Mile widziana siła fizyczna (przenoszenie sprzętu)",
    ],
    beginnerFriendly: true,
    frequency: "one-off",
    date: "Sobota, 25 października",
    duration: "ok. 6 godzin",
    count: 3,
    unit: "people",
    icon: Users,
    tag: "Wydarzenia",
    tagColor: "bg-rose-50 text-rose-700 border-rose-200",
    postedAgo: "2 dni temu",
    isOpen: true,
    contact: { email: "wydarzenia@schroniskokrakowpd.pl" },
  },
];

const FREQUENCY_LABEL: Record<Frequency, string> = {
  "one-off": "Jednorazowo",
  recurring: "Cyklicznie",
};

export default function NeedsBoard() {
  const [responded, setResponded] = useState<number[]>([]);

  return (
    <div className="min-h-screen bg-[#f0ebe2] flex items-center justify-center">
      <div className="w-full max-w-[600px] h-[700px] bg-[#f0ebe2] flex flex-col overflow-hidden">
        {/* Fixed header */}
        <div className="px-6 pt-6 pb-4 flex-shrink-0">
          <div className="flex items-center gap-3 mb-6">
            <Link
              to="/how-to-help"
              className="w-10 h-10 flex items-center justify-center -ml-2 text-neutral-600 hover:text-neutral-900 transition-all motion-safe:hover:scale-[1.03] active:scale-[0.97] outline-none focus-visible:ring-[3px] focus-visible:ring-neutral-900 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f0ebe2] rounded-full"
            >
              <ArrowLeft size={20} strokeWidth={2} />
            </Link>
            <span className="text-sm font-medium text-neutral-500">
              Potrzeby schronisk
            </span>
          </div>

          <h1 className="text-[22px] font-semibold text-neutral-900 leading-tight">
            Aktualne potrzeby w Twojej okolicy
          </h1>
          <p className="text-sm text-neutral-400 mt-1">
            Opublikowane przez schroniska w pobliżu Krakowa
          </p>
        </div>

        {/* Scrollable list */}
        <div className="flex-1 overflow-y-auto px-6 pb-8 flex flex-col gap-3">
          {NEEDS.map((need) => {
            const isResponded = responded.includes(need.id);
            return (
              <div
                key={need.id}
                className="border border-neutral-200 rounded-2xl p-4 flex flex-col gap-3 bg-white"
              >
                {/* Shelter + tag */}
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="text-[13px] font-semibold text-neutral-900">
                    {need.shelter}
                  </div>
                  <span
                    className={`text-[11px] font-medium border px-2 py-0.5 rounded-full flex-shrink-0 ${need.tagColor}`}
                  >
                    {need.tag}
                  </span>
                </div>
                <div className="flex items-center gap-1 -mt-1 text-[12px] text-neutral-400">
                  <MapPin size={11} strokeWidth={2} />
                  <span>{need.location}</span>
                </div>
                {need.shelterDescription && (
                  <p className="text-[12px] text-neutral-400 -mt-2 leading-snug">
                    {need.shelterDescription}
                  </p>
                )}

                {/* Status badges: frequency, beginner-friendly, availability */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium border border-neutral-200 text-neutral-600 px-2 py-0.5 rounded-full">
                    <Repeat size={10} strokeWidth={2} />
                    {FREQUENCY_LABEL[need.frequency]}
                  </span>
                  {need.beginnerFriendly && (
                    <span className="text-[11px] font-medium bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-full">
                      Dla początkujących
                    </span>
                  )}
                  <span
                    className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${
                      need.isOpen
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-neutral-100 text-neutral-500 border-neutral-200"
                    }`}
                  >
                    {need.isOpen ? "Zgłoszenia otwarte" : "Zgłoszenia zamknięte"}
                  </span>
                </div>

                {/* Date / time / duration */}
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  <div className="flex items-center gap-1.5 text-[12.5px] text-neutral-600">
                    <Calendar size={13} strokeWidth={2} className="text-neutral-400" />
                    <span>{need.date}</span>
                  </div>
                  {need.duration && (
                    <div className="flex items-center gap-1.5 text-[12.5px] text-neutral-600">
                      <Clock size={13} strokeWidth={2} className="text-neutral-400" />
                      <span>{need.duration}</span>
                    </div>
                  )}
                </div>

                {/* Need description */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-neutral-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <need.icon
                      size={16}
                      strokeWidth={1.75}
                      className="text-neutral-600"
                    />
                  </div>
                  <div>
                    <p className="text-[13px] font-medium text-neutral-500 mb-0.5">
                      Aktualnie potrzebujemy
                    </p>
                    <p className="text-[14px] text-neutral-900 leading-snug">
                      {need.description}
                    </p>
                  </div>
                </div>

                {/* Requirements */}
                {need.requirements.length > 0 && (
                  <div>
                    <p className="text-[12px] font-medium text-neutral-500 mb-1">
                      Wymagania
                    </p>
                    <ul className="flex flex-col gap-0.5">
                      {need.requirements.map((req) => (
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

                {/* Footer */}
                <div className="flex items-center justify-between gap-3 pt-1">
                  <span className="text-[12px] text-neutral-400">
                    {need.postedAgo}
                  </span>
                </div>
                <div className="flex items-center justify-start gap-3 flex-wrap">
                  <button
                    onClick={() =>
                      setResponded((prev) =>
                        isResponded
                          ? prev.filter((x) => x !== need.id)
                          : [...prev, need.id],
                      )
                    }
                    className={`px-5 py-2 rounded-xl text-[13px] font-semibold transition-all motion-safe:hover:scale-[1.03] active:scale-[0.97] outline-none focus-visible:ring-[3px] focus-visible:ring-neutral-900 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f0ebe2] ${
                      isResponded
                        ? "bg-neutral-100 text-neutral-500"
                        : "bg-[#b7aff7] text-neutral-900 hover:opacity-90"
                    }`}
                  >
                    {isResponded ? "Odpowiedź ✓" : "Chcę pomóc"}
                  </button>
                  {(need.contact.email || need.contact.formUrl) && (
                    <a
                      href={
                        need.contact.email
                          ? `mailto:${need.contact.email}`
                          : need.contact.formUrl
                      }
                      target={need.contact.formUrl ? "_blank" : undefined}
                      rel={need.contact.formUrl ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-neutral-600 underline underline-offset-2 hover:text-neutral-900 hover:no-underline outline-none focus-visible:ring-[3px] focus-visible:ring-neutral-900 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f0ebe2] rounded-sm"
                    >
                      <Mail size={13} strokeWidth={2} />
                      Napisz bezpośrednio do organizacji
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
