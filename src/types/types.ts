export interface CalendarEvent {
  externalId: string;
  title: string;
  start: Date;
  end: Date;
  externalLink: string;
  description: string;
}

export type CalendarContextType = {
  calendarData: CalendarData;
  setCalendarData: React.Dispatch<React.SetStateAction<CalendarData>>;
};

export type CalendarData = {
  publicId: string;
  accessToken: string;
  events: CalendarEvent[];
};
