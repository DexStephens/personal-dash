import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import { useCalendarDataContext } from "../context/CalendarDataContextHook";
import { useNavigate } from "react-router";
import { v4 as uuidv4 } from "uuid";
import GoogleIcon from "@mui/icons-material/Google";
import "./Setup.css";

const googleScopes = ["https://www.googleapis.com/auth/calendar"];

export default function OAuthSetup() {
  const navigate = useNavigate();
  const { setCalendarData } = useCalendarDataContext();

  const onGoogleConnect = async (token: TokenResponse) => {
    setCalendarData({
      publicId: uuidv4(),
      accessToken: token.access_token,
      events: [],
    });
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
    <div className="setup-container">
      <h1>Connect your Personal Calendar</h1>
      <p>
        To get started, please sign in with your Google account. This will allow
        us to access your calendar events.
      </p>
      <div className="google-signin" onClick={() => loginWithGoogle()}>
        <GoogleIcon />
        Sign in with Google
      </div>
    </div>
  );
}
