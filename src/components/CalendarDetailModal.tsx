import "./CalendarDetailModal.css";
import { createPortal } from "react-dom";
import { CalendarDetailModalProps } from "../types/types";
import { useEffect } from "react";

export function CalendarDetailModal({
  onClose,
  eventDetails,
}: CalendarDetailModalProps) {
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

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        <h2 className="modal-title">{eventDetails.title}</h2>
      </div>
    </div>,
    document.body
  );
}
