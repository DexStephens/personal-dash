import {
  CalendarEvent,
  GoogleApiCalendarListResponse,
  GoogleApiEvent,
  GoogleApiEventListResponse,
} from "../types/types";
import { parseGoogleEvents } from "./calendar.util";

async function googleRequest<T>(
  method: string,
  endpoint: string,
  accessToken: string,
  body: string | null = null
) {
  const response = await fetch(
    `https://www.googleapis.com/calendar/v3/${endpoint}`,
    {
      method,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body,
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.json();
  return data as T;
}

export async function establishGoogleData(accessToken: string) {
  try {
    const calendars = await getCalendarIds(accessToken);

    if (calendars === null) {
      return null;
    }

    const events = await getCalendarEvents(accessToken, calendars.items[0].id);

    return {
      events,
      calendarId: calendars.items[0].id,
    };
  } catch {
    return null;
  }
}

export async function getCalendarIds(accessToken: string) {
  try {
    const data = await googleRequest<GoogleApiCalendarListResponse>(
      "GET",
      "users/me/calendarList",
      accessToken
    );

    return data;
  } catch (error) {
    console.error("Error fetching calendar list:", error);
    return null;
  }
}

export async function getCalendarEvents(
  accessToken: string,
  id: string
): Promise<CalendarEvent[]> {
  try {
    const events: CalendarEvent[] = [];

    async function getEvents(pageToken?: string) {
      const data = await googleRequest<GoogleApiEventListResponse>(
        "GET",
        `calendars/${id}/events${pageToken ? `?pageToken=${pageToken}` : ""}`,
        accessToken
      );

      events.push(...parseGoogleEvents(data.items));

      if (data.nextPageToken) {
        await getEvents(data.nextPageToken);
      }
    }

    await getEvents();

    return events;
  } catch {
    return [];
  }
}

export async function updateCalendarEvent(
  updatedEvent: CalendarEvent,
  calendarId: string,
  accessToken: string
) {
  const { externalId, title, description, start, end } = updatedEvent;
  console.log(calendarId, externalId);
  try {
    const data = await googleRequest<GoogleApiEvent>(
      "PUT",
      `calendars/${calendarId}/events/${externalId}`,
      accessToken,
      JSON.stringify({
        summary: title,
        description: description,
        start: {
          dateTime: start.toISOString(),
          timeZone: "UTC",
        },
        end: {
          dateTime: end.toISOString(),
          timeZone: "UTC",
        },
      })
    );

    return data;
  } catch {
    return null;
  }
}
