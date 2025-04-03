import { CalendarEvent } from "../types/types";
import { parseGoogleEvents } from "./calendar.util";

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
