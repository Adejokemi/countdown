import { Edit, Trash2 } from "lucide-react";
import {
  calculateTimeLeft,
  calculateProgress,
  getThemeConfig,
} from "../lib/utils";
import { EventItem } from "../types";

interface Props {
  event: EventItem;
  onEdit: (event: EventItem) => void;
  onDelete: (id: string) => void;
  isPast?: boolean;
}

export function UpcomingEventCard({
  event,
  onEdit,
  onDelete,
  isPast = false,
}: Props) {
  const timeLeft = calculateTimeLeft(event.targetDate);
  const progress = calculateProgress(event.createdAt, event.targetDate);
  const theme = getThemeConfig(event.iconType);
  const Icon = theme.Icon;

  const formattedDate = new Date(event.targetDate).toLocaleDateString(
    undefined,
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    },
  );

  return (
    <div
      className={`bg-[#1e293b] rounded-2xl p-6 border border-slate-700/50 transition-colors relative group ${isPast ? "opacity-80" : "hover:border-slate-600"}`}
    >
      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {!isPast && (
          <button
            onClick={() => onEdit(event)}
            className="text-slate-400 hover:text-white"
          >
            <Edit className="w-4 h-4" />
          </button>
        )}
        <button
          onClick={() => onDelete(event.id)}
          className="text-slate-400 hover:text-red-400"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl ${theme.bg} ${theme.text}`}>
          <Icon className="w-6 h-6" />
        </div>
        <span
          className={`text-xs font-bold px-2.5 py-1 rounded border border-slate-700 bg-slate-800 ${isPast ? "text-slate-400" : theme.text}`}
        >
          {isPast
            ? "COMPLETED"
            : `IN ${timeLeft.days > 0 ? `${timeLeft.days} DAYS` : `${timeLeft.hours} HOURS`}`}
        </span>
      </div>

      <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
      <p className="text-slate-400 text-sm mb-6 line-clamp-2 h-10">
        {event.description}
      </p>

      {isPast ? (
        <div className="bg-slate-800/50 rounded-xl p-4 text-center mb-4 border border-slate-700/50 h-22 flex flex-col justify-center">
          <div className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">
            Event Date
          </div>
          <div className="text-sm font-medium text-white">{formattedDate}</div>
        </div>
      ) : (
        <div className="flex justify-between text-center mb-4 h-22 items-center">
          {[
            { label: "Days", value: timeLeft.days },
            { label: "Hours", value: timeLeft.hours },
            { label: "Min", value: timeLeft.minutes },
            { label: "Sec", value: timeLeft.seconds },
          ].map((time) => (
            <div key={time.label}>
              <div className="text-2xl font-bold text-white">
                {String(time.value).padStart(2, "0")}
              </div>
              <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                {time.label}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center gap-3">
        <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
          <div
            className={`h-full ${isPast ? "bg-slate-500" : theme.bar} rounded-full transition-all duration-1000`}
            style={{ width: isPast ? "100%" : `${progress}%` }}
          />
        </div>
        <span className="text-xs font-bold text-slate-500">
          {isPast ? "100%" : `${Math.round(progress)}%`}
        </span>
      </div>
    </div>
  );
}
