import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import { getCalendarEvents, getCalendarIds } from "../utils/googleApi.util";
import { useCalendarDataContext } from "../context/CalendarDataContextHook";
import { parseGoogleEvents } from "../utils/calendar.util";
import { useNavigate } from "react-router";

const googleScopes = ["https://www.googleapis.com/auth/calendar"];

export default function OAuthSetup() {
  const navigate = useNavigate();
  const { setEvents } = useCalendarDataContext();

  const onGoogleConnect = async (token: TokenResponse) => {
    // NEEDSWORK: segment this into pull which calendar I want to pull, and also which documents I want to pull
    const calendars: any = await getCalendarIds(token.access_token);
    // NEEDSWORK: display their calendars and determine which one they want to use to pull events for
    const events = await getCalendarEvents(
      token.access_token,
      calendars.items[0].id
    );
    setEvents(events);
    navigate("/");
  };

  const onGoogleError = (
    e: Pick<TokenResponse, "error" | "error_description" | "error_uri">
  ) => {
    console.log("Google error", e);
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (codeResponse) => onGoogleConnect(codeResponse),
    onError: (error) => onGoogleError(error),
    scope: googleScopes.join(" "),
  });

  return (
    <div>
      {/* some sort of bubbled list that changes color when selected */}
      <div onClick={() => loginWithGoogle()}>Login with google</div>
    </div>
  );
}
