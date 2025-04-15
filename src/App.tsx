import { useEffect, useState } from "react";
import "./App.css";
import { ListView } from "./components/ListView";
import { CalendarView } from "./components/CalendarView";
import { useCalendarDataContext } from "./context/CalendarDataContextHook";
import { useNavigate } from "react-router";
import { establishGoogleData } from "./utils/googleApi.util";
import { Header } from "./components/Header";
import { ViewOption } from "./types/types";

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
      <Header view={view} setView={setView} />

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
