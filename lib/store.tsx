"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Event, Team } from "./definitions";
import { events as initialEvents, teams as initialTeams } from "./data";

interface DataContextType {
  events: Event[];
  teams: Team[];
  addEvent: (event: Omit<Event, "id">) => Promise<void>;
  updateEvent: (id: string, event: Omit<Event, "id">) => Promise<void>;
  addTeam: (team: Omit<Team, "id">) => Promise<void>;
  getEvents: () => Event[];
  getAllTeams: () => Team[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [events, setEvents] = useState<Event[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from LocalStorage on mount
  useEffect(() => {
    const storedEvents = localStorage.getItem("cc_events");
    const storedTeams = localStorage.getItem("cc_teams");

    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    } else {
      setEvents(initialEvents);
      localStorage.setItem("cc_events", JSON.stringify(initialEvents));
    }

    if (storedTeams) {
      setTeams(JSON.parse(storedTeams));
    } else {
      setTeams(initialTeams);
      localStorage.setItem("cc_teams", JSON.stringify(initialTeams));
    }
    setIsLoaded(true);
  }, []);

  // Sync to LocalStorage whenever data changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("cc_events", JSON.stringify(events));
    }
  }, [events, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("cc_teams", JSON.stringify(teams));
    }
  }, [teams, isLoaded]);

  const addEvent = async (newEventData: Omit<Event, "id">) => {
    const newEvent = { ...newEventData, id: String(Date.now()) };
    setEvents((prev) => [newEvent, ...prev]);
  };

  const updateEvent = async (
    id: string,
    updatedEventData: Omit<Event, "id">,
  ) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === id ? { ...updatedEventData, id } : event,
      ),
    );
  };

  const addTeam = async (newTeamData: Omit<Team, "id">) => {
    const newTeam = { ...newTeamData, id: String(Date.now()) };
    setTeams((prev) => [...prev, newTeam]);
  };

  const getEvents = () => events;
  const getAllTeams = () => teams;

  return (
    <DataContext.Provider
      value={{
        events,
        teams,
        addEvent,
        updateEvent,
        addTeam,
        getEvents,
        getAllTeams,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
