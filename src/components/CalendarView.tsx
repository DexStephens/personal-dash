import { useCallback, useMemo, useState } from "react";
import { useCalendarDataContext } from "../context/CalendarDataContextHook";
import "./CalendarView.css";
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function CalendarView() {
  const { events } = useCalendarDataContext();
  console.log("events", events);

  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [date, setDate] = useState(new Date());

  const monthEvents = useMemo(() => {
    const startOfMonth = new Date(year, month, 1);
    const endOfMonth = new Date(year, month + 1, 0);

    return events.filter((event) => {
      const eventStart = new Date(event.start);
      const eventEnd = new Date(event.end);

      return (
        (eventStart >= startOfMonth && eventStart <= endOfMonth) ||
        (eventEnd >= startOfMonth && eventEnd <= endOfMonth) ||
        (eventStart <= startOfMonth && eventEnd >= endOfMonth)
      );
    });
  }, [events, month, year]);

  const getDayEvents = useCallback(
    (day: number) => {
      const startOfDay = new Date(year, month, day);
      const endOfDay = new Date(year, month, day + 1);

      return monthEvents.filter((event) => {
        const eventStart = new Date(event.start);
        const eventEnd = new Date(event.end);

        return (
          (eventStart >= startOfDay && eventStart < endOfDay) ||
          (eventEnd >= startOfDay && eventEnd < endOfDay) ||
          (eventStart <= startOfDay && eventEnd >= endOfDay)
        );
      });
    },
    [monthEvents, month, year]
  );

  const currentDay = date.getDate();
  const dayOfWeek = date.getDay();
  const monthDays = new Date(year, month + 1, 0).getDate();
  const startDay = new Date(year, month, 1).getDay();

  console.log(currentDay, dayOfWeek, monthDays, year, month, startDay);

  return (
    <div className="calendar-container">
      <div className="calendar">
        <h2>
          {months[month]} {year}
        </h2>
        <div className="calendar-grid">
          {/* Day headers */}
          {days.map((day) => (
            <div key={day} className="calendar-header">
              {day}
            </div>
          ))}

          {/* Calendar Days */}
          {Array.from({ length: startDay }).map((_, index) => (
            <div key={`empty-${index}`} className="calendar-day empty"></div>
          ))}

          {Array.from({ length: monthDays }).map((_, index) => (
            <div key={index} className="calendar-day">
              <span className="day-number">
                {index + 1}
                {getDayEvents(index + 1).map((dayEvent) => {
                  return (
                    <div key={dayEvent.externalId} className="event">
                      <a
                        href={dayEvent.externalLink}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {dayEvent.title}
                      </a>
                      <p>{dayEvent.description}</p>
                    </div>
                  );
                })}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
