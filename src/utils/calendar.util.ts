import { CalendarEvent } from "../types/types";

export function parseGoogleEvents(events: any[]): CalendarEvent[] {
  return events
    .filter((e) => e.status !== "cancelled")
    .map((event) => ({
      externalId: event.id,
      title: event.summary,
      start: new Date(event.start.dateTime),
      end: new Date(event.end.dateTime),
      externalLink: event.htmlLink,
      description: event.description || "",
    }));
}

export function parseMicrosoftEvents(): CalendarEvent[] {
  return [];
}
