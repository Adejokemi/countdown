"use client";

import { useState } from "react";
import { Plus, Clock } from "lucide-react";
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
        <header className="flex flex-col md:flex-row md:items-center md:gap-0 gap-4 justify-between bg-[#1e293b] p-4 rounded-xl shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">Event Countdown</h1>
          </div>
          <div className="flex items-center md:justify-center justify-end gap-4">
            <button
              onClick={() => setModalState({ isOpen: true })}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Event
            </button>
          </div>
        </header>

        {urgentEvent && (
          <UrgentEventCard
            event={urgentEvent}
            onEdit={(e) => setModalState({ isOpen: true, eventToEdit: e })}
            onDelete={deleteEvent}
            onGoLive={(e) => setLiveEvent(e)} 
          />
        )}

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
