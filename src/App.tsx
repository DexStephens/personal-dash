import { useState } from "react";
import "./App.css";
import { ListView } from "./components/ListView";
import { CalendarView } from "./components/CalendarView";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import SettingsSharpIcon from "@mui/icons-material/SettingsSharp";

type ViewOption = "List" | "Calendar";

function App() {
  const [view, setView] = useState<ViewOption>("Calendar");

  return (
    <>
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
      <div className="main">
        {view === "List" ? <ListView /> : <CalendarView />}
      </div>
    </>
  );
}

export default App;
