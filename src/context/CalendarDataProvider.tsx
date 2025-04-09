import { ReactNode, useState } from "react";
import { CalendarDataContext } from "./CalendarData";
import { CalendarData } from "../types/types";
import { useLocalStorageSync } from "../hooks/useLocalStorage";

export function CalendarDataProvider({ children }: { children: ReactNode }) {
  const data = useLocalStorageSync("calendarData");

  const parsedData = data ? JSON.parse(data) : null;

  const [calendarData, setCalendarData] = useState<CalendarData>({
    publicId: parsedData?.publicId ?? "",
    accessToken: parsedData?.accessToken ?? "",
    events: parsedData?.events ?? [],
  });

  const setCalendarDataWithSync = (data: CalendarData) => {
    setCalendarData(data);
    localStorage.setItem("calendarData", JSON.stringify(data));
  };

  return (
    <CalendarDataContext.Provider
      value={{
        calendarData,
        setCalendarDataWithSync,
      }}
    >
      {children}
    </CalendarDataContext.Provider>
  );
}
