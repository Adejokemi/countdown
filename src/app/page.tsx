"use client";

import { useState } from "react";
import { Plus, Clock, Calendar } from "lucide-react";
import { EventModal } from "./components/EventModal";
import { LiveDashboard } from "./components/LiveDashboard";
import { useEvents } from "./hooks/useEvents";
import { EventItem } from "./types";
import { UrgentEventCard } from "./components/UrgentEventcard";
import { UpcomingEventCard } from "./components/UpcomingEventcard";

export default function DashboardPage() {
  const { urgentEvent, upcomingEvents, addEvent, updateEvent, deleteEvent } =
    useEvents();

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    eventToEdit?: EventItem;
  }>({ isOpen: false });

  const [liveEvent, setLiveEvent] = useState<EventItem | null>(null);

  if (liveEvent) {
    return (
      <LiveDashboard event={liveEvent} onBack={() => setLiveEvent(null)} />
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 p-6 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <header className="flex items-center justify-between bg-[#1e293b] p-4 rounded-xl shadow-lg border border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">Event Countdown</h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setModalState({ isOpen: true })}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-blue-500/20"
            >
              <Plus className="w-4 h-4" /> Add Event
            </button>
          </div>
        </header>

        {!urgentEvent ? (
          /* --- Empty State UI --- */
          <div className="flex flex-col items-center justify-center py-24 px-4 bg-[#1e293b] rounded-2xl border-2 border-dashed border-slate-700 shadow-sm mt-8">
            <div className="p-4 bg-slate-800 rounded-full mb-5 shadow-inner">
              <Calendar className="w-12 h-12 text-blue-500" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">
              No upcoming events
            </h2>
            <p className="text-slate-400 mb-8 text-center max-w-md text-lg">
              You&apos;re all caught up! Add a new event to start tracking your
              deadlines, trips, and milestones.
            </p>
            <button
              onClick={() => setModalState({ isOpen: true })}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-3.5 rounded-xl font-medium transition-colors shadow-lg shadow-blue-500/20 text-lg"
            >
              <Plus className="w-5 h-5" /> Create Your First Event
            </button>
          </div>
        ) : (
          /* --- The Dashboard Content --- */
          <>
            <UrgentEventCard
              event={urgentEvent}
              onEdit={(e) => setModalState({ isOpen: true, eventToEdit: e })}
              onDelete={deleteEvent}
              onGoLive={(e) => setLiveEvent(e)}
            />

            {upcomingEvents.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-white mb-6">
                  Upcoming Events
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingEvents.map((event) => (
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
      </div>

      {/* Modal */}
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
