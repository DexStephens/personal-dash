import { useState } from "react";
import ComponentSelection from "./ComponentSelection";
import OAuthSetup from "./OAuthSetup";
import { useParams } from "react-router";

type StepOption = 1 | 2 | 3 | 4;

const stepData = {
  1: {
    title: "Component Selection",
  },
  2: {
    title: "OAuth Setup",
  },
  3: {
    title: "Notification Schedule",
  },
  4: {
    title: "Account Registration",
  },
};

export default function Setup() {
  const params = useParams();

  console.log("Params", params);

  const [step, setStep] = useState<StepOption>(1);

  const [components, setComponents] = useState<string[]>([]);

  return (
    <div className="card">
      <h1 className="title">{stepData[step].title}</h1>
      {step === 1 ? (
        <ComponentSelection selected={components} setSelected={setComponents} />
      ) : step === 2 ? (
        <OAuthSetup />
      ) : step === 3 ? (
        <NotificationSchedule />
      ) : (
        <Registration />
      )}
      <div className="footer">
        <button
          type="button"
          onClick={() => setStep((current) => (current - 1) as StepOption)}
          style={{ visibility: step > 1 ? "visible" : "hidden" }}
        >
          Back Arrow
        </button>
        <button
          type="button"
          onClick={() => setStep((current) => (current + 1) as StepOption)}
          style={{ visibility: step < 4 ? "visible" : "hidden" }}
        >
          Next Arrow
        </button>
      </div>
    </div>
  );
}

function NotificationSchedule() {
  return (
    <div>
      {/* some sort of bubbled list that changes color when selected */}
      notification schedule
    </div>
  );
}

function Registration() {
  return (
    <div>
      {/* some sort of bubbled list that changes color when selected */}
      registration
    </div>
  );
}
