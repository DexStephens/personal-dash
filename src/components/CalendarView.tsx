import { useCallback, useMemo, useState } from "react";
import { useCalendarDataContext } from "../context/CalendarDataContextHook";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import "./CalendarView.css";
import { DAYS, MONTHS } from "../utils/constants.util";
import { CalendarDetailModal } from "./CalendarDetailModal";
import { CalendarEvent } from "../types/types";

export function CalendarView() {
  const { calendarData } = useCalendarDataContext();
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );

  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  const monthEvents = useMemo(() => {
    const startOfMonth = new Date(year, month, 1);
    const endOfMonth = new Date(year, month + 1, 0);

    return calendarData.events.filter((event) => {
      const eventStart = new Date(event.start);
      const eventEnd = new Date(event.end);

      return (
        (eventStart >= startOfMonth && eventStart <= endOfMonth) ||
        (eventEnd >= startOfMonth && eventEnd <= endOfMonth) ||
        (eventStart <= startOfMonth && eventEnd >= endOfMonth)
      );
    });
  }, [calendarData.events, month, year]);

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

  const monthDays = new Date(year, month + 1, 0).getDate();
  const startDay = new Date(year, month, 1).getDay();

  const updateMonth = (newMonth: number) => {
    if (newMonth < 0) {
      setMonth(11);
      setYear(year - 1);
    } else if (newMonth > 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(newMonth);
    }
  };

  return (
    <>
      <CalendarDetailModal
        onClose={() => setSelectedEvent(null)}
        eventDetails={selectedEvent}
      />
      <div className="calendar-container">
        <div className="calendar">
          <div className="calendar-header">
            <ChevronLeftIcon onClick={() => updateMonth(month - 1)} />
            <h2>
              {MONTHS[month]} {year}
            </h2>
            <ChevronRightIcon onClick={() => updateMonth(month + 1)} />
          </div>
          <div className="calendar-grid">
            {/* Day headers */}
            {DAYS.map((day) => (
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
                      <div
                        key={dayEvent.externalId}
                        className="event"
                        onClick={() => setSelectedEvent(dayEvent)}
                      >
                        {dayEvent.title}
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
    </>
  );
}
