"use client";

import { useState, useEffect } from "react";
import { EventItem } from "../types";

export function useEvents() {
  const [events, setEvents] = useState<EventItem[]>(() => {
    try {
      const saved = localStorage.getItem("countdown_events");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Failed to parse events from local storage", error);
      return [];
    }
  });
  const [, setTick] = useState(0);

  // Timer Tick
  useEffect(() => {
    const timer = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const saveEvents = (newEvents: EventItem[]) => {
    setEvents(newEvents);
    if (typeof window !== "undefined") {
      localStorage.setItem("countdown_events", JSON.stringify(newEvents));
    }
  };

  const addEvent = (eventData: Omit<EventItem, "id" | "createdAt">) => {
    const newEvent: EventItem = {
      ...eventData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    saveEvents([...events, newEvent]);
  };

  const updateEvent = (id: string, updatedData: Partial<EventItem>) => {
    saveEvents(
      events.map((ev) => (ev.id === id ? { ...ev, ...updatedData } : ev)),
    );
  };

  const deleteEvent = (id: string) => {
    saveEvents(events.filter((e) => e.id !== id));
  };

  
 return {
   events, 
   addEvent,
   updateEvent,
   deleteEvent,
 };
}
