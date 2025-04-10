import { useCalendarDataContext } from "../context/CalendarDataContextHook";
import { useEffect, useRef } from "react";
import { CalendarEvent } from "../types/types";
import "./ListView.css";

export function ListView() {
  const { calendarData } = useCalendarDataContext();

  const events = calendarData.events.sort((a, b) => {
    const aTime =
      a?.start instanceof Date && !isNaN(a.start.getTime())
        ? a.start.getTime()
        : Infinity;
    const bTime =
      b?.start instanceof Date && !isNaN(b.start.getTime())
        ? b.start.getTime()
        : Infinity;
    return aTime - bTime;
  });

  const eventsCategorized: {
    [year: number]: { [month: number]: CalendarEvent[] };
  } = {};

  events.forEach((event) => {
    const startDate = new Date(event.start);
    const year = startDate.getFullYear();
    const month = startDate.getMonth();

    if (!eventsCategorized[year]) {
      eventsCategorized[year] = {};
    }
    if (!eventsCategorized[year][month]) {
      eventsCategorized[year][month] = [];
    }

    eventsCategorized[year][month].push(event);
  });

  const eventRefs = useRef<Map<string, HTMLDivElement | null>>(new Map());

  // Helper function to assign refs
  const setEventRef = (key: string, el: HTMLDivElement | null) => {
    eventRefs.current.set(key, el);
  };

  useEffect(() => {
    const now = Date.now();
    const nextEvent = events.find(
      (event) => new Date(event.start).getTime() > now
    );

    if (nextEvent) {
      const ref = eventRefs.current.get(nextEvent.externalId);
      if (ref) {
        ref.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }, [events]);

  return (
    <div style={{ overflowY: "scroll", maxHeight: "80vh" }}>
      {Object.entries(eventsCategorized).map(([year, months]) => (
        <div key={year} style={{ marginBottom: "2rem" }}>
          <h1 className="list-view-year">{year}</h1>

          {Object.entries(months).map(([month, monthEvents]) => (
            <div key={month} style={{ marginBottom: "1.5rem" }}>
              <h2 className="list-view-month">
                {new Date(Number(year), Number(month)).toLocaleString(
                  "default",
                  { month: "long" }
                )}
              </h2>

              {monthEvents.map((event) => (
                <div
                  key={event.externalId}
                  ref={(el) => setEventRef(event.externalId, el)}
                  className="list-item"
                >
                  <p
                    style={{
                      color: "#cccccc",
                      position: "relative",
                      left: "-0.25rem",
                      top: "-0.5rem",
                      margin: "0",
                    }}
                  >
                    {new Date(event.start).toLocaleString("default", {
                      day: "numeric",
                    })}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "1.25rem",
                        fontWeight: "500",
                        color: "#cccccc",
                        margin: "0",
                      }}
                    >
                      {event.title}
                    </h3>
                    <div style={{ display: "flex" }}>
                      <p style={{ color: "#cccccc" }}>
                        {new Date(event.start).toLocaleString("default", {
                          timeStyle: "short",
                        })}
                      </p>
                      <p style={{ color: "#cccccc" }}>-</p>
                      <p style={{ color: "#cccccc" }}>
                        {new Date(event.end).toLocaleString("default", {
                          timeStyle: "short",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
