import { use } from "react";
import { CalendarContextType } from "../types/types";
import { CalendarDataContext } from "./CalendarData";

export function useCalendarDataContext(): CalendarContextType {
  const context = use(CalendarDataContext);

  if (!context) {
    throw new Error(
      "useCalendarDataContext must be used within a CalendarDataProvider"
    );
  }

  return context;
}
