import "./CalendarDetailModal.css";
import { createPortal } from "react-dom";
import { CalendarDetailModalProps, CalendarEvent } from "../types/types";
import { useEffect, useState } from "react";
import { updateCalendarEvent } from "../utils/googleApi.util";
import { useCalendarDataContext } from "../context/CalendarDataContextHook";
import {
  parseGoogleEvents,
  toLocalDatetimeInputValue,
} from "../utils/calendar.util";

// NEEDSWORK: fix timezone mismatch

export function CalendarDetailModal({
  onClose,
  eventDetails,
}: CalendarDetailModalProps) {
  const [formData, setFormData] = useState({ ...eventDetails });
  const { calendarData } = useCalendarDataContext();

  useEffect(() => {
    if (eventDetails) {
      setFormData(eventDetails);
    }
  }, [eventDetails, setFormData]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (eventDetails !== null) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [eventDetails, onClose]);

  if (eventDetails === null) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "start" || name === "end" ? new Date(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await updateCalendarEvent(
      formData as CalendarEvent,
      calendarData.calendarId,
      calendarData.accessToken
    );

    if (result !== null) {
      onClose(parseGoogleEvents([result])[0]);
    } else {
      throw new Error("Failed to update calendar event");
    }
  };

  return createPortal(
    <div className="modal-overlay" onClick={() => onClose()}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={() => onClose()}>
          ×
        </button>
        <h2 className="modal-title">Edit Event</h2>
        <form className="modal-form" onSubmit={handleSubmit}>
          <label>
            Title
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Start Date
            <input
              type="datetime-local"
              name="start"
              value={
                formData.start ? toLocalDatetimeInputValue(formData.start) : ""
              }
              onChange={handleChange}
              required
            />
          </label>
          <label>
            End Date
            <input
              type="datetime-local"
              name="end"
              value={
                formData.end ? toLocalDatetimeInputValue(formData.end) : ""
              }
              onChange={handleChange}
              required
            />
          </label>
          <label>
            External Link
            <input
              name="externalLink"
              value={formData.externalLink}
              onChange={handleChange}
              disabled
            />
          </label>
          <label>
            Description
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </label>

          <button className="edit-button">Save Changes</button>
        </form>
      </div>
    </div>,
    document.body
  );
}
