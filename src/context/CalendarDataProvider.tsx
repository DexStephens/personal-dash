import { ReactNode, useState } from "react";
import { CalendarDataContext } from "./CalendarData";
import { CalendarEvent } from "../types/types";

export function CalendarDataProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  return (
    <CalendarDataContext.Provider value={{ events, setEvents }}>
      {children}
    </CalendarDataContext.Provider>
  );
}
