import { AlertCircle, Trash2 } from "lucide-react";
import {  calculateTimeLeft, calculateProgress } from "../lib/utils";
import { EventItem } from "../types";

interface Props {
  event: EventItem;
  onEdit: (event: EventItem) => void;
  onDelete: (id: string) => void;
  onGoLive: (event: EventItem) => void;
}

export function UrgentEventCard({ event, onEdit, onDelete, onGoLive }: Props) {
  const timeLeft = calculateTimeLeft(event.targetDate);
  const progress = calculateProgress(event.createdAt, event.targetDate);
  const isCritical = timeLeft.total > 0 && timeLeft.total < 1000 * 60 * 60 * 24; // Less than 24h

  const bgImage =
    "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=800&auto=format&fit=crop";

 
  const startsInText =
    timeLeft.days > 0
      ? `STARTS IN < ${timeLeft.days + 1} DAYS`
      : `STARTS IN < ${Math.max(1, Math.ceil(timeLeft.total / (1000 * 60 * 60)))} HOURS`;

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white">Upcoming Event</h2>
        {isCritical && (
          <span className="bg-red-500/10 text-red-500 text-xs font-bold px-3 py-1 rounded-full border border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.2)]">
            CRITICAL PRIORITY
          </span>
        )}
      </div>

      <div className="bg-[#1e293b] rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-xl border border-slate-700/50">
        {/* Visual Graphic Area */}
        <div
          className="md:w-1/3 relative min-h-75 p-6 flex flex-col justify-end border-r border-slate-700/50 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <div className="absolute inset-0 bg-linear-to-t from-[#0f172a] via-[#0f172a]/60 to-transparent z-10"></div>

          <div className="relative z-20">
            <p className="text-slate-300 text-xs font-semibold uppercase tracking-wider mb-1">
              Coming Up Next
            </p>
            <div className="text-4xl font-bold text-white drop-shadow-lg">
              {/* Dynamically show days if they exist */}
              {timeLeft.days > 0 && `${timeLeft.days}d `}
              {String(timeLeft.hours).padStart(2, "0")}h{" "}
              {String(timeLeft.minutes).padStart(2, "0")}m{" "}
              {String(timeLeft.seconds).padStart(2, "0")}s
            </div>
          </div>
        </div>

        {/* Details Area */}
        <div className="p-8 md:w-2/3 flex flex-col justify-center">
          <div className="flex items-center gap-2 text-red-400 text-xs font-bold mb-3">
            <AlertCircle className="w-4 h-4" />
            {startsInText}
          </div>
          <h3 className="text-3xl font-bold text-white mb-2">{event.title}</h3>
          <p className="text-slate-400 mb-8">{event.description}</p>

          {/* Progress Bar */}
          <div className="space-y-2 mb-8">
            <div className="flex justify-between text-xs font-medium text-slate-400">
              <span>{Math.round(progress)}% Preparation Elapsed</span>
              <span className="text-white">
                {timeLeft.days > 0
                  ? `${timeLeft.days} days left`
                  : `${Math.ceil(timeLeft.total / (1000 * 60))}m left`}
              </span>
            </div>
            <div className="h-3 bg-slate-800 rounded-full overflow-hidden shadow-inner border border-slate-700/50">
              <div
                className="h-full bg-red-500 rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(239,68,68,0.5)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => onGoLive(event)}
              className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl font-medium transition-colors shadow-lg shadow-blue-500/20"
            >
              Go Live Dashboard
            </button>
            <button
              onClick={() => onEdit(event)}
              className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-2.5 rounded-xl font-medium transition-colors"
            >
              Edit Event
            </button>
            <button
              onClick={() => onDelete(event.id)}
              className="ml-auto text-slate-500 hover:text-red-400 p-2 transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
