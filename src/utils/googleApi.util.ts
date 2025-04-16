import { CalendarEvent } from "../types/types";
import { parseGoogleEvents } from "./calendar.util";

export async function establishGoogleData(accessToken: string) {
  try {
    const calendars = await getCalendarIds(accessToken);

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
    const response = await fetch(
      "https://www.googleapis.com/calendar/v3/users/me/calendarList",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data); // This will log the actual response data

    return data; // Return the data for further use if needed
  } catch (error) {
    console.error("Error fetching calendar list:", error);
    return null; // Handle errors gracefully
  }
}

export async function getCalendarEvents(
  accessToken: string,
  id: string
): Promise<CalendarEvent[]> {
  try {
    const events: CalendarEvent[] = [];

    async function getEvents(pageToken?: string) {
      const response = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${id}/events${
          pageToken ? `?pageToken=${pageToken}` : ""
        }`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      events.push(...parseGoogleEvents(data.items));

      if (data.nextPageToken) {
        await getEvents(data.nextPageToken);
      }
    }

    await getEvents();

    return events;
  } catch (error) {
    console.error("Error fetching calendar list:", error);
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
    const response = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/${externalId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
        body: JSON.stringify({
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
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);

    return data; // Return the data for further use if needed
  } catch (error) {
    console.error("Error updating calendar event:", error);
    return null;
  }
}
