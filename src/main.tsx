import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter, Routes, Route } from "react-router";
import Setup from "./components/Setup.tsx";
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./utils/microsoftAuth.config.ts";
import { CalendarDataProvider } from "./context/CalendarDataProvider.tsx";

const pca = new PublicClientApplication(msalConfig);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MsalProvider instance={pca}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <CalendarDataProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/setup" element={<Setup />} />
            </Routes>
          </BrowserRouter>
        </CalendarDataProvider>
      </GoogleOAuthProvider>
    </MsalProvider>
  </StrictMode>
);
