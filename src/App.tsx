import { useEffect, useState } from "react";
import "./App.css";
import { ListView } from "./components/ListView";
import { CalendarView } from "./components/CalendarView";
import { useCalendarDataContext } from "./context/CalendarDataContextHook";
import { useNavigate } from "react-router";
import { establishGoogleData } from "./utils/googleApi.util";
import { Header } from "./components/Header";
import { ViewOption } from "./types/types";
import { useIsMobile } from "./hooks/useIsMobile";

function App() {
  const isMobile = useIsMobile();
  const { calendarData, setCalendarDataWithSync } = useCalendarDataContext();
  const [loading, setLoading] = useState(calendarData.events.length === 0);
  const [initialCall, setInitialCall] = useState(false);
  const [view, setView] = useState<ViewOption>(isMobile ? "List" : "Calendar");
  const navigate = useNavigate();

  useEffect(() => {
    if (isMobile && view === "Calendar") {
      setView("List");
    }
  }, [isMobile, view]);

  useEffect(() => {
    const fetchEvents = async () => {
      if (calendarData.accessToken) {
        const googleData = await establishGoogleData(calendarData.accessToken);

        setInitialCall(true);

        if (googleData === null) {
          setCalendarDataWithSync({
            publicId: "",
            accessToken: "",
            calendarId: "",
            events: [],
          });
        } else {
          setCalendarDataWithSync({
            ...calendarData,
            calendarId: googleData.calendarId,
            events: googleData.events,
          });
        }

        setLoading(false);
      }
    };
    if (calendarData.accessToken && !initialCall) {
      fetchEvents();
    }
  }, [calendarData, initialCall, setCalendarDataWithSync]);

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
