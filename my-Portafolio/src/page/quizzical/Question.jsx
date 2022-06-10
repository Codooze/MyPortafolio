import { Suspense } from "react";
import "./question.css";
import React, { useState } from "react";
import { Button } from "@mantine/core";

export default function Question({
  question,
  answers,
  handleClick,
  index,
  endGame,
}) {
  const [pickOrder, setPickOrder] = useState(0);
  //TODO pasar

  var decodeHTML = function (html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };
  const style = (isHeld) => ({
    backgroundColor: isHeld ? "#59E391" : "white",
    color: isHeld ? "rgb(46, 50, 76)" : "",
  });
  const showBadResults = () => ({
    backgroundColor: "rgb(255, 96, 85)",
    color: "rgb(19, 23, 35)",
  });
  // console.table(correct_answer);
  //TODO organizar los botones en horizontal y que abarquen menos espacio
  const Answers = answers.map(({ answer, isHeld, id, isCorrect }) => (
    <Button
      onClick={() => handleClick(index, id)}
      variant="white"
      key={answer}
      id={answer}
      style={
        !endGame
          ? style(isHeld)
          : isHeld && isCorrect
          ? style(isHeld)
          : isHeld
          ? showBadResults()
          : style(isHeld)
      }
    >
      {decodeHTML(answer)}
    </Button>
  ));

  return (
    <>
      <Suspense fallback={<div>loading...</div>}>
        <h3 className="h3-quiz">{decodeHTML(question)} </h3>
        {/* <p>{decodeHTML(correct_answer)} </p> */}
        <div className="button-question">{Answers}</div>
      </Suspense>
    </>
  );
}
