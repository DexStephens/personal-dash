import { CalendarEvent, GoogleApiEvent } from "../types/types";

export function parseGoogleEvents(events: GoogleApiEvent[]): CalendarEvent[] {
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

export function formatDate(
  input: string | Date | null | undefined,
  options?: Intl.DateTimeFormatOptions,
  fallback: string = ""
): string {
  if (!input) return fallback;
  const date = new Date(input);
  return isNaN(date.getTime())
    ? fallback
    : date.toLocaleString("default", options);
}

export function toLocalDatetimeInputValue(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}
