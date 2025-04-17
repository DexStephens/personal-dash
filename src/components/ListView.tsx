import { useCalendarDataContext } from "../context/CalendarDataContextHook";
import { useEffect, useRef, useState } from "react";
import { CalendarEvent } from "../types/types";
import "./ListView.css";
import { CalendarDetailModal } from "./CalendarDetailModal";
import { formatDate } from "../utils/calendar.util";

export function ListView() {
  const { calendarData, setCalendarDataWithSync } = useCalendarDataContext();
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );

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
    [year: number | string]: { [month: number | string]: CalendarEvent[] };
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

  const setEventRef = (key: string, el: HTMLDivElement | null) => {
    eventRefs.current.set(key, el);
  };

  useEffect(() => {
    const now = Date.now();
    const nextEvent = events.find(
      (event) => new Date(event.start).getTime() > now
    );

    if (nextEvent) {
      const container = document.getElementById("list-view-container");
      const ref = eventRefs.current.get(nextEvent.externalId);
      if (container && ref) {
        container.scrollTo({
          top: ref.offsetTop - container.offsetTop,
          behavior: "instant",
        });
      }
    }
  }, [events]);

  const handleModalClose = (eventDetails?: CalendarEvent) => {
    setSelectedEvent(null);

    if (eventDetails !== undefined) {
      const otherEvents = calendarData.events.filter(
        (e) => e.externalId !== eventDetails.externalId
      );
      const updatedEvents = [...otherEvents, eventDetails];
      setCalendarDataWithSync({
        ...calendarData,
        events: updatedEvents,
      });
    }
  };

  return (
    <>
      <CalendarDetailModal
        eventDetails={selectedEvent}
        onClose={handleModalClose}
      />
      <div className="list-view-container" id="list-view-container">
        {Object.entries(eventsCategorized).map(([year, months]) => (
          <div key={year} style={{ marginBottom: "2rem" }}>
            <h1 className="list-view-year">
              {formatDate(new Date(Number(year)), { year: "numeric" }, "Other")}
            </h1>

            {Object.entries(months).map(([month, monthEvents]) => (
              <div key={month} style={{ marginBottom: "1.5rem" }}>
                <h2 className="list-view-month">
                  {formatDate(new Date(Number(year), Number(month)), {
                    month: "long",
                  })}
                </h2>
                <div className="list-item-container">
                  {monthEvents.map((event) => (
                    <div
                      key={event.externalId}
                      ref={(el) => setEventRef(event.externalId, el)}
                      className="list-item"
                      onClick={() => setSelectedEvent(event)}
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
                        {formatDate(event.start, { day: "numeric" })}
                      </p>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
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
                            {formatDate(
                              event.start,
                              { timeStyle: "short" },
                              "N/A"
                            )}
                          </p>
                          <p style={{ color: "#cccccc" }}>-</p>
                          <p style={{ color: "#cccccc" }}>
                            {formatDate(
                              event.end,
                              { timeStyle: "short" },
                              "N/A"
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
