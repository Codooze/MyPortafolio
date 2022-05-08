import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import AppTutorial from "./AppTutorial";
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

function ChangeApp() {
  const [app, setApp] = useState(true);
  const swapApp = () => {
    setApp(!app);
  };
  return (
    <>
      {app ? <AppTutorial /> : <App />}
      <button onClick={swapApp}>Change App</button>
    </>
  );
}
