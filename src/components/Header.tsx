import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { ViewOption } from "../types/types";
import "./Header.css";
import { useIsMobile } from "../hooks/useIsMobile";

export function Header({
  view,
  setView,
}: {
  view: ViewOption;
  setView: (view: ViewOption) => void;
}) {
  const isMobile = useIsMobile();
  return (
    <div className="header">
      <h1>Cal2</h1>
      {!isMobile && (
        <div className="tool-container">
          {view === "List" ? (
            <CalendarMonthIcon onClick={() => setView("Calendar")} />
          ) : (
            <FormatListBulletedIcon onClick={() => setView("List")} />
          )}
        </div>
      )}
    </div>
  );
}
