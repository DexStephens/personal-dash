import { ReactNode, useState } from "react";
import { CalendarDataContext } from "./CalendarData";
import { CalendarData } from "../types/types";

export function CalendarDataProvider({ children }: { children: ReactNode }) {
  const [calendarData, setCalendarData] = useState<CalendarData>({
    publicId: "",
    accessToken: "",
    events: [],
  });

  return (
    <CalendarDataContext.Provider
      value={{
        calendarData,
        setCalendarData,
      }}
    >
      {children}
    </CalendarDataContext.Provider>
  );
}
