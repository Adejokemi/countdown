import { ArrowLeft, Maximize } from "lucide-react";
import { calculateTimeLeft, calculateProgress } from "../lib/utils";
import { useState } from "react";
import { EventItem } from "../types";

interface Props {
  event: EventItem;
  onBack: () => void;
}

export function LiveDashboard({ event, onBack }: Props) {
  const [, setIsFullscreen] = useState(false);
  const timeLeft = calculateTimeLeft(event.targetDate);
  const progress = calculateProgress(event.createdAt, event.targetDate);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement
        .requestFullscreen()
        .catch((err) => console.log(err));
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#0f172a] z-50 overflow-y-auto font-sans">
      <div className="min-h-screen flex flex-col p-4 md:p-8">
        {/* Top Nav */}
        <div className="flex justify-between items-center mb-8 md:mb-12">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-slate-800"
          >
            <ArrowLeft className="w-5 h-5" /> Back to Events
          </button>
          <button
            onClick={toggleFullscreen}
            className="p-3 bg-slate-800 text-slate-400 hover:text-white rounded-full transition-colors"
          >
            <Maximize className="w-5 h-5" />
          </button>
        </div>

        {/* Main Focus Area */}
        <div className="flex-1 flex flex-col items-center justify-center max-w-5xl mx-auto w-full py-10">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 text-center tracking-tight">
            {event.title}
          </h1>
          <p className="text-xl text-slate-400 mb-10 text-center max-w-2xl">
            {event.description}
          </p>

          {/* Timer Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 mb-12 w-full">
            {[
              { label: "DAYS", value: timeLeft.days },
              { label: "HOURS", value: timeLeft.hours },
              { label: "MINUTES", value: timeLeft.minutes },
              { label: "SECONDS", value: timeLeft.seconds },
            ].map((time) => (
              <div
                key={time.label}
                className="flex flex-col items-center bg-[#1e293b] p-4 rounded-3xl border border-slate-700/50 shadow-2xl"
              >
                <span className="text-7xl md:text-9xl font-bold text-transparent bg-clip-text bg-linear-to-b from-white to-slate-500 tabular-nums">
                  {String(time.value).padStart(2, "0")}
                </span>
                <span className="text-sm md:text-base font-bold text-blue-500 tracking-[0.2em] mt-4">
                  {time.label}
                </span>
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="w-full max-w-4xl space-y-4">
            <div className="flex justify-between text-slate-400 font-medium px-2">
              <span>Preparation</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <div className="h-6 bg-slate-800 rounded-full overflow-hidden shadow-inner border border-slate-700/50">
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-1000 shadow-[0_0_20px_rgba(59,130,246,0.5)] relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute top-0 right-0 bottom-0 w-20 bg-linear-to-r from-transparent to-white/20"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
