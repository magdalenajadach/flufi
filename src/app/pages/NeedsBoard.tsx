import {
  ArrowLeft,
  MapPin,
  Users,
  Camera,
  Share2,
  Truck,
  Dog,
} from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";

type Need = {
  id: number;
  shelter: string;
  location: string;
  description: string;
  count?: number;
  unit?: string;
  icon: React.ElementType;
  tag: string;
  tagColor: string;
  postedAgo: string;
};

const NEEDS: Need[] = [
  {
    id: 1,
    shelter: "Schronisko Kraków Północ",
    location: "Kraków",
    description: "5 osób do wyprowadzania psów w weekendy",
    count: 5,
    unit: "people",
    icon: Dog,
    tag: "Wyprowadzanie psów",
    tagColor: "bg-amber-50 text-amber-700 border-amber-200",
    postedAgo: "2 godziny temu",
  },
  {
    id: 2,
    shelter: "Fundacja Łapa",
    location: "Kraków → Wieliczka",
    description:
      "Transport żywności z Tesco w Krakowie do naszego schroniska",
    icon: Truck,
    tag: "Transport",
    tagColor: "bg-blue-50 text-blue-700 border-blue-200",
    postedAgo: "5 godzin temu",
  },
  {
    id: 3,
    shelter: "Animal Friends PL",
    location: "Online",
    description:
      "Ktoś, kto zrobi zdjęcia psom — dobre zdjęcia zwiększają liczbę adopcji trzykrotnie",
    icon: Camera,
    tag: "Fotografia",
    tagColor: "bg-violet-50 text-violet-700 border-violet-200",
    postedAgo: "Wczoraj",
  },
  {
    id: 4,
    shelter: "Schronisko Nowa Huta",
    location: "Online",
    description:
      "Wolontariusz ds. mediów społecznościowych do prowadzenia naszych kont na Instagramie i Facebooku",
    icon: Share2,
    tag: "Pomoc internetowa",
    tagColor: "bg-sky-50 text-sky-700 border-sky-200",
    postedAgo: "Wczoraj",
  },
  {
    id: 5,
    shelter: "Schronisko Kraków Południe",
    location: "Kraków",
    description:
      "3 osoby do przygotowania weekendowej imprezy na targach adopcyjnych na Rynku Głównym",
    count: 3,
    unit: "people",
    icon: Users,
    tag: "Wydarzenia",
    tagColor: "bg-rose-50 text-rose-700 border-rose-200",
    postedAgo: "2 dni temu",
  },
];

export default function NeedsBoard() {
  const [responded, setResponded] = useState<number[]>([]);

  return (
    <div className="min-h-screen bg-[#f0ebe2] flex items-center justify-center">
      <div className="w-full max-w-[600px] h-[700px] bg-[#f0ebe2] flex flex-col overflow-hidden">
        {/* Fixed header */}
        <div className="px-6 pt-6 pb-4 flex-shrink-0">
          <div className="flex items-center gap-3 mb-6">
            <Link
              to="/"
              className="w-10 h-10 flex items-center justify-center -ml-2 text-neutral-600 hover:text-neutral-900 transition-all motion-safe:hover:scale-[1.03] active:scale-[0.97]"
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

                {/* Footer */}
                <div className="flex items-center justify-between gap-3 pt-1">
                  <span className="text-[12px] text-neutral-400">
                    {need.postedAgo}
                  </span>
                </div>
                <div className="flex justify-start">
                  <button
                    onClick={() =>
                      setResponded((prev) =>
                        isResponded
                          ? prev.filter((x) => x !== need.id)
                          : [...prev, need.id],
                      )
                    }
                    className={`px-5 py-2 rounded-xl text-[13px] font-semibold transition-all motion-safe:hover:scale-[1.03] active:scale-[0.97] ${
                      isResponded
                        ? "bg-neutral-100 text-neutral-500"
                        : "bg-[#b7aff7] text-neutral-900 hover:opacity-90"
                    }`}
                  >
                    {isResponded ? "Odpowiedź ✓" : "Chcę pomóc"}
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