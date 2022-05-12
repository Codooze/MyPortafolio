import React from "react";
import { Route, Routes } from "react-router-dom";
import Tenzies from "./page/tenzies/Tenzies";
import MonkeyPage from "./page/tenzies/MonkeyPage";
import { Quizzical } from "./page/quizzical/Quizzical";
import Quiz from "./page/quizzical/Quiz";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Tenzies />} />
      {/* <Route path="/" element={<MonkeyPage po="🐎" />} /> */}
      {/* <MonkeyPage po="💩" /> */}
      <Route path="fetching" element={<Quizzical />}></Route>
      <Route path="quiz" element={<Quiz />}></Route>
    </Routes>
  );
}
