import { ArrowLeft, ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import imgSpacer from "@/imports/spacer.png";
import imgTransport from "@/imports/transport.png";
import imgEvent from "@/imports/event_.png";
import imgZakupy from "@/imports/zakupy_.png";
import imgOnline from "@/imports/online_support.png";
import imgAdopcja from "@/imports/adopcja_love_dziekuje.png";

const categories = [
  {
    id: "wyprowadzanie-psow",
    img: imgSpacer,
    label: "Spacer z psem",
  },
  { id: "transport", img: imgTransport, label: "Transport" },
  { id: "wydarzenie", img: imgEvent, label: "Wydarzenia" },
  { id: "dostawy", img: imgZakupy, label: "Zakupy" },
  { id: "online", img: imgOnline, label: "Pomoc online" },
  { id: "adopcja", img: imgAdopcja, label: "Adopcja" },
];

export default function VolunteerMatch() {
  const [selected, setSelected] = useState<string[]>([]);
  const navigate = useNavigate();

  function toggle(id: string) {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id],
    );
  }

  function handleFind() {
    const params = selected.length
      ? `?categories=${selected.join(",")}`
      : "";
    navigate(`/find-help/results${params}`);
  }

  return (
    <div className="min-h-screen bg-[#f0ebe2] flex items-center justify-center">
      <div className="w-[890px] h-[700px] bg-[#f0ebe2] flex flex-col px-6 pt-6 overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link
            to="/"
            className="w-10 h-10 flex items-center justify-center -ml-2 text-neutral-600 hover:text-neutral-900 transition-all motion-safe:hover:scale-[1.03] active:scale-[0.97]"
          >
            <ArrowLeft size={20} strokeWidth={2} />
          </Link>
          <span className="text-sm font-medium text-neutral-500">
            Znajdź sposób na pomoc
          </span>
        </div>

        <h1
          className="text-[24px] font-bold  leading-tight mb-1"
          style={{ color: "#2b2726" }}
        >
          Jak chcesz pomóc?
        </h1>
        <p className="text-[13px] text-neutral-500 mb-6">
          Wybierz jedną lub więcej opcji — pokażemy dopasowane
          okazje
        </p>

        {/* Category grid */}
        <div className="grid grid-cols-2 gap-3 mb-auto overflow-y-auto">
          {categories.map((cat) => {
            const active = selected.includes(cat.id);
            return (
              <button
                key={cat.id}
                onClick={() => toggle(cat.id)}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl border text-center transition-all motion-safe:hover:scale-[1.03] active:scale-[0.97] ${
                  active
                    ? "border-[#a8a0f0] bg-white shadow-sm"
                    : "border-neutral-200 bg-white hover:border-neutral-300"
                }`}
              >
                <ImageWithFallback
                  src={cat.img}
                  alt={cat.label}
                  className="w-16 h-16 object-contain"
                  style={{ mixBlendMode: "multiply" }}
                />
                <span
                  className={`text-[13px] font-semibold leading-tight ${
                    active
                      ? "text-[#7068c8]"
                      : "text-neutral-800"
                  }`}
                >
                  {cat.label}
                </span>
                {active && (
                  <span className="text-[10px] text-[#9088d8] font-medium">
                    Wybrano ✓
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-5 mb-8 flex-shrink-0">
          <button
            onClick={handleFind}
            className="w-full py-4 rounded-full font-semibold text-[15px] flex items-center justify-center gap-2 transition-all motion-safe:hover:scale-[1.03] active:scale-[0.98] bg-[#b7aff7] text-neutral-900 hover:bg-[#a89af5] shadow-sm"
          >
            {selected.length === 0
              ? "Pokaż wszystkie opcje"
              : "Znajdź możliwości pomocy"}
            <ChevronRight size={18} strokeWidth={2.5} />
          </button>
          {selected.length > 0 && (
            <button
              onClick={() => setSelected([])}
              className="w-full py-2 text-sm text-neutral-400 hover:text-neutral-600 transition-all motion-safe:hover:scale-[1.03] active:scale-[0.97] mt-1"
            >
              Wyczyść wybór
            </button>
          )}
        </div>
      </div>
    </div>
  );
}