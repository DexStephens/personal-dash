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
  setCalendarDataWithSync: (data: CalendarData) => void;
};

export type CalendarData = {
  publicId: string;
  accessToken: string;
  calendarId: string;
  events: CalendarEvent[];
};

export type ViewOption = "List" | "Calendar";

export type CalendarDetailModalProps = {
  onClose: () => void;
  eventDetails: CalendarEvent | null;
};
