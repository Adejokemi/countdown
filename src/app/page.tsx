"use client";

import { useState, useMemo } from "react";
import { Plus, Clock, Calendar, History, ListFilter } from "lucide-react";
import { EventModal } from "./components/EventModal";
import { LiveDashboard } from "./components/LiveDashboard";
import { useEvents } from "./hooks/useEvents";
import { EventItem } from "./types";
import { UpcomingEventCard } from "./components/UpcomingEventcard";
import { UrgentEventCard } from "./components/UrgentEventcard";

export default function DashboardPage() {
  const { events, addEvent, updateEvent, deleteEvent } = useEvents();

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    eventToEdit?: EventItem;
  }>({ isOpen: false });
  const [liveEvent, setLiveEvent] = useState<EventItem | null>(null);

  // UI States
  const [view, setView] = useState<"active" | "history">("active");
  const [timeFilter, setTimeFilter] = useState<
    "all" | "day" | "week" | "month" | "year"
  >("all");

  // 1.  Active vs. Past Events
  const { activeEvents, pastEvents } = useMemo(() => {
    const now = new Date().getTime();
    const active: EventItem[] = [];
    const past: EventItem[] = [];

    events.forEach((event) => {
      if (new Date(event.targetDate).getTime() > now) {
        active.push(event);
      } else {
        past.push(event);
      }
    });

    // Sort active (happening  first)
    active.sort(
      (a, b) =>
        new Date(a.targetDate).getTime() - new Date(b.targetDate).getTime(),
    );
    // Sort past (most recently finished first)
    past.sort(
      (a, b) =>
        new Date(b.targetDate).getTime() - new Date(a.targetDate).getTime(),
    );

    return { activeEvents: active, pastEvents: past };
  }, [events]);

  // 2. Apply Time Filter to Active Events
  const filteredActiveEvents = useMemo(() => {
    if (timeFilter === "all") return activeEvents;
    const now = new Date().getTime();

    return activeEvents.filter((event) => {
      const diffDays =
        (new Date(event.targetDate).getTime() - now) / (1000 * 3600 * 24);
      switch (timeFilter) {
        case "day":
          return diffDays <= 1;
        case "week":
          return diffDays <= 7;
        case "month":
          return diffDays <= 30;
        case "year":
          return diffDays <= 365;
        default:
          return true;
      }
    });
  }, [activeEvents, timeFilter]);

  if (liveEvent) {
    return (
      <LiveDashboard event={liveEvent} onBack={() => setLiveEvent(null)} />
    );
  }

  const topEvent = filteredActiveEvents[0];
  const remainingEvents = filteredActiveEvents.slice(1);

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 p-6 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between bg-[#1e293b] p-4 rounded-xl shadow-lg border border-slate-700/50 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">Event Countdown</h1>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {/* View Toggle */}
            <div className="flex bg-slate-800 rounded-lg p-1 border border-slate-700">
              <button
                onClick={() => setView("active")}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${view === "active" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"}`}
              >
                Active
              </button>
              <button
                onClick={() => setView("history")}
                className={`flex items-center gap-1 px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${view === "history" ? "bg-slate-600 text-white" : "text-slate-400 hover:text-white"}`}
              >
                <History className="w-4 h-4" /> History
              </button>
            </div>

            {/* Filter Dropdown (Only show in active view) */}
            {view === "active" && (
              <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5">
                <ListFilter className="w-4 h-4 text-slate-400" />
                <select
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value as "all" | "day" | "week" | "month" | "year")}
                  className="bg-slate-800 text-sm text-white focus:outline-none cursor-pointer"
                >
                  <option value="all">All Upcoming</option>
                  <option value="day">Next 24 Hours</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="year">This Year</option>
                </select>
              </div>
            )}

            <button
              onClick={() => setModalState({ isOpen: true })}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-blue-500/20 ml-auto md:ml-0"
            >
              <Plus className="w-4 h-4" /> Add Event
            </button>
          </div>
        </header>

        {/* VIEW: HISTORY */}
        {view === "history" && (
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">Past Events</h2>
            {pastEvents.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                No past events found.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-75 grayscale hover:grayscale-0 transition-all">
                {pastEvents.map((event) => (
                  <UpcomingEventCard
                    key={event.id}
                    event={event}
                    onEdit={() => {}} 
                    onDelete={deleteEvent}
                  />
                ))}
              </div>
            )}
          </section>
        )}

        {/* VIEW: ACTIVE */}
        {view === "active" && (
          <>
            {!topEvent ? (
              <div className="flex flex-col items-center justify-center py-24 px-4 bg-[#1e293b] rounded-2xl border-2 border-dashed border-slate-700 mt-8">
                <Calendar className="w-12 h-12 text-blue-500 mb-4" />
                <h2 className="text-3xl font-bold text-white mb-3">
                  No upcoming events
                </h2>
                <p className="text-slate-400 mb-8 text-center max-w-md">
                  {timeFilter !== "all"
                    ? `You have no events scheduled for the selected timeframe.`
                    : `You're all caught up! Add a new event to start tracking.`}
                </p>
              </div>
            ) : (
              <>
                <UrgentEventCard
                  event={topEvent}
                  onEdit={(e) =>
                    setModalState({ isOpen: true, eventToEdit: e })
                  }
                  onDelete={deleteEvent}
                  onGoLive={(e) => setLiveEvent(e)}
                />

                {remainingEvents.length > 0 && (
                  <section>
                    <h2 className="text-2xl font-bold text-white mb-6">
                      More Upcoming Events
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {remainingEvents.map((event) => (
                        <UpcomingEventCard
                          key={event.id}
                          event={event}
                          onEdit={(e) =>
                            setModalState({ isOpen: true, eventToEdit: e })
                          }
                          onDelete={deleteEvent}
                        />
                      ))}
                    </div>
                  </section>
                )}
              </>
            )}
          </>
        )}
      </div>

      {modalState.isOpen && (
        <EventModal
          initialData={modalState.eventToEdit}
          onSave={(data) =>
            modalState.eventToEdit
              ? updateEvent(modalState.eventToEdit.id, data)
              : addEvent(data)
          }
          onClose={() => setModalState({ isOpen: false })}
        />
      )}
    </div>
  );
}
