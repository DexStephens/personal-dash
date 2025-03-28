import { createContext } from "react";
import { CalendarContextType } from "../types/types";

export const CalendarDataContext = createContext<CalendarContextType | null>(
  null
);
