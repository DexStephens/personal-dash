import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter, Routes, Route } from "react-router";
import Setup from "./components/Setup.tsx";
import { CalendarDataProvider } from "./context/CalendarDataProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
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
  </StrictMode>
);
