import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter, Routes, Route } from "react-router";
import { CalendarDataProvider } from "./context/CalendarDataProvider.tsx";
import OAuthSetup from "./components/OAuthSetup.tsx";
import { ErrorBoundary } from "react-error-boundary";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <CalendarDataProvider>
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/setup" element={<OAuthSetup />} />
            </Routes>
          </BrowserRouter>
        </ErrorBoundary>
      </CalendarDataProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
