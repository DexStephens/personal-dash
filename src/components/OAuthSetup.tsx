import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import { getCalendarEvents, getCalendarIds } from "../utils/googleApi.util";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../utils/microsoftAuth.config";
import { callMsGraph } from "../utils/microsoftApi.util";

const googleScopes = ["https://www.googleapis.com/auth/calendar"];

export default function OAuthSetup() {
  const { instance, accounts, inProgress } = useMsal();

  const onGoogleConnect = async (token: TokenResponse) => {
    // NEEDSWORK: segment this into pull which calendar I want to pull, and also which documents I want to pull
    const calendars: any = await getCalendarIds(token.access_token);
    // NEEDSWORK: display their calendars and determine which one they want to use to pull events for
    getCalendarEvents(token.access_token, calendars.items[0].id);
  };

  async function requestProfileData() {
    // Silently acquires an access token which is then attached to a request for MS Graph data
    if (accounts.length > 0) {
      const tokenResponse = await instance.acquireTokenSilent({
        ...loginRequest,
        account: accounts[0],
      });

      console.log("Token response", tokenResponse);

      const response = await callMsGraph(tokenResponse.accessToken);

      console.log("Graph response", response);
    }
  }

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

  const loginWithMicrosoft = () => {
    instance.loginPopup({
      scopes: ["User.Read", "Calendars.ReadWrite"],
    });
  };

  console.log("MS login in progress", inProgress);
  console.log("MS instance", instance);
  console.log("MS accounts", accounts);

  return (
    <div>
      {/* some sort of bubbled list that changes color when selected */}
      <div onClick={() => loginWithGoogle()}>Login with google</div>
      <div onClick={() => loginWithMicrosoft()}>Login with Microsoft</div>
      {accounts.length > 0 && (
        <div onClick={requestProfileData}>Call microsoft account data</div>
      )}
    </div>
  );
}
