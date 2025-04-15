import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import SettingsSharpIcon from "@mui/icons-material/SettingsSharp";
import { ViewOption } from "../types/types";
import "./Header.css";

export function Header({
  view,
  setView,
}: {
  view: ViewOption;
  setView: (view: ViewOption) => void;
}) {
  return (
    <div className="header">
      <h1>Cal2</h1>
      <div className="tool-container">
        {view === "List" ? (
          <CalendarMonthIcon onClick={() => setView("Calendar")} />
        ) : (
          <FormatListBulletedIcon onClick={() => setView("List")} />
        )}
        <SettingsSharpIcon />
      </div>
    </div>
  );
}
