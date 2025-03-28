import { useContext } from "react";
import { CalendarContextType } from "../types/types";
import { CalendarDataContext } from "./CalendarData";

export function useCalendarDataContext(): CalendarContextType {
  const context = useContext(CalendarDataContext);

  if (!context) {
    throw new Error(
      "useCalendarDataContext must be used within a CalendarDataProvider"
    );
  }

  return context;
}
