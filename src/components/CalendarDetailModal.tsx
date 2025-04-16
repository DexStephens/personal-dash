import "./CalendarDetailModal.css";
import { createPortal } from "react-dom";
import { CalendarDetailModalProps, CalendarEvent } from "../types/types";
import { useEffect, useState } from "react";
import { updateCalendarEvent } from "../utils/googleApi.util";
import { useCalendarDataContext } from "../context/CalendarDataContextHook";

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

  const handleSubmit = () => {
    //NEEDSWORK: Any validation on my end to make sure start and end are filled in
    updateCalendarEvent(
      formData as CalendarEvent,
      calendarData.calendarId,
      calendarData.accessToken
    );
  };

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        <h2 className="modal-title">Edit Event</h2>
        <form className="modal-form" onSubmit={(e) => e.preventDefault()}>
          <label>
            Title
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </label>
          <label>
            Start Date
            <input
              type="datetime-local"
              name="start"
              value={formData.start?.toISOString().slice(0, 16)}
              onChange={handleChange}
            />
          </label>
          <label>
            End Date
            <input
              type="datetime-local"
              name="end"
              value={formData.end?.toISOString().slice(0, 16)}
              onChange={handleChange}
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

          <button className="edit-button" onClick={handleSubmit}>
            Save Changes
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
}
