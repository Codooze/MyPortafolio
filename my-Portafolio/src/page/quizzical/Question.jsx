import { Suspense } from "react";
import "./question.css";
import React, { useState } from "react";
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
  });
  const showBadResults = () => ({
    backgroundColor: "red",
  });
  // console.table(correct_answer);

  const Answers = answers.map(({ answer, isHeld, id, isCorrect }) => (
    <button
      onClick={() => handleClick(index, id)}
      className="button-question"
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
    </button>
  ));

  function ramdomOrder() {
    let i = 0;
    if (i < 1) {
      Answers.sort((a, b) => Math.random() - 0.5);
      i++;
    }
  }

  return (
    <>
      <Suspense fallback={<div>loading...</div>}>
        <h2 className="h2-quiz">{decodeHTML(question)} </h2>
        {/* <p>{decodeHTML(correct_answer)} </p> */}
        {Answers}
      </Suspense>
    </>
  );
}
