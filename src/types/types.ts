export interface CalendarEvent {
  externalId: string;
  title: string;
  start: Date;
  end: Date;
  externalLink: string;
  description: string;
}

export type CalendarContextType = {
  events: CalendarEvent[];
  setEvents: React.Dispatch<React.SetStateAction<CalendarEvent[]>>;
};
