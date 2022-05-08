import React from "react";
import { Route, Routes } from "react-router-dom";
import Tenzies from "./page/tenzies/Tenzies";
import MonkeyPage from "./page/tenzies/MonkeyPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Tenzies />} />
      {/* <Route path="/" element={<MonkeyPage po="🐎" />} /> */}
      {/* <MonkeyPage po="💩" /> */}
    </Routes>
  );
}
