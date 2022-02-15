import React from "react";
import "./App.css";
import useNotification from "./Notification/useNotification";

function App() {
  const { open } = useNotification();

  return (
    <div className="App">
      <button onClick={() => open({ message: "success", type: "success" })}>
        success
      </button>
      <button onClick={() => open({ message: "error", type: "error" })}>
        error
      </button>
      <button onClick={() => open({ message: "warn", type: "warn" })}>
        warn
      </button>
    </div>
  );
}

export default App;
