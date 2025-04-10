import { useEffect, useState } from "react";
import "./App.css";
import { ListView } from "./components/ListView";
import { CalendarView } from "./components/CalendarView";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import SettingsSharpIcon from "@mui/icons-material/SettingsSharp";
import { useCalendarDataContext } from "./context/CalendarDataContextHook";
import { useNavigate } from "react-router";
import { establishGoogleData } from "./utils/googleApi.util";

type ViewOption = "List" | "Calendar";

function App() {
  const { calendarData, setCalendarDataWithSync } = useCalendarDataContext();
  const [loading, setLoading] = useState(true);
  const [initialCall, setInitialCall] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      if (calendarData.accessToken) {
        const events = await establishGoogleData(calendarData.accessToken);

        setInitialCall(true);

        if (events === null) {
          setCalendarDataWithSync({
            publicId: "",
            accessToken: "",
            events: [],
          });
        } else {
          setCalendarDataWithSync({
            ...calendarData,
            events: events,
          });
        }

        setLoading(false);
      }
    };
    if (calendarData.accessToken && !initialCall) {
      fetchEvents();
    }
  }, [calendarData, initialCall, setCalendarDataWithSync]);

  const [view, setView] = useState<ViewOption>("Calendar");
  const navigate = useNavigate();

  useEffect(() => {
    if (!calendarData.accessToken) {
      navigate("/setup");
    }
  }, [calendarData.accessToken, navigate]);

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
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <>{view === "List" ? <ListView /> : <CalendarView />}</>
        )}
      </div>
    </>
  );
}

export default App;
