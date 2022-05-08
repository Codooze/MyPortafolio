import React from "react";
import Poop from "./Poop";

export default function MonkeyPage({ po }) {
  const poopProp = "💩";
  return (
    <h1>
      MonkeyPage🐒🐒🙈🙈 {<Poop Po={poopProp} />} {`parent poo ${po} `}{" "}
    </h1>
  );
}
