import {
  ArrowLeft,
  Users,
  Calendar,
  Clock,
  MapPin,
} from "lucide-react";
import { Link } from "react-router";

export default function Volunteer() {
  const opportunities = [
    {
      title: "Osoba wyprowadzająca psy",
      time: "Poranki w dni powszednie",
      duration: "2-3 godziny",
      location: "Główne schronisko",
    },
    {
      title: "Socjalizacja kotów",
      time: "Popołudnia",
      duration: "1-2 godziny",
      location: "Pokój kotów",
    },
    {
      title: "Asystent ds. wydarzeń",
      time: "Weekendy",
      duration: "4-6 godzin",
      location: "Różne lokalizacje",
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
      <div className="w-[890px] h-[700px] bg-white flex flex-col px-6 pt-6 gap-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="w-10 h-10 flex items-center justify-center -ml-2 transition-all motion-safe:hover:scale-[1.03] active:scale-[0.97] outline-none focus-visible:ring-[3px] focus-visible:ring-neutral-900 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f0ebe2] rounded-full"
          >
            <ArrowLeft size={20} strokeWidth={2} />
          </Link>
          <h1 className="text-lg">Zostań wolontariuszem</h1>
        </div>

        {/* Icon Section */}
        <div className="flex flex-col items-center gap-4 pt-4">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
            <Users size={32} strokeWidth={2} />
          </div>
          <div className="text-center">
            <h2 className="text-2xl mb-2">
              Dołącz do naszego zespołu
            </h2>
            <p className="text-neutral-600">
              Zmień coś na lepsze, pracując bezpośrednio ze
              zwierzętami
            </p>
          </div>
        </div>

        {/* Opportunities */}
        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">
            Dostępne możliwości pomocy
          </h3>
          {opportunities.map((opp, index) => (
            <button
              key={index}
              className="flex flex-col gap-3 p-4 border border-neutral-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all motion-safe:hover:scale-[1.03] active:scale-[0.97] outline-none focus-visible:ring-[3px] focus-visible:ring-neutral-900 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f0ebe2] text-left"
            >
              <div className="font-medium">{opp.title}</div>
              <div className="flex flex-col gap-2 text-sm text-neutral-600">
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>{opp.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>{opp.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span>{opp.location}</span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Apply Button */}
        <button className="w-full py-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all motion-safe:hover:scale-[1.03] active:scale-[0.97] outline-none focus-visible:ring-[3px] focus-visible:ring-neutral-900 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f0ebe2] mt-auto mb-6">
          Zgłoś się jako wolontariusz
        </button>
      </div>
    </div>
  );
}