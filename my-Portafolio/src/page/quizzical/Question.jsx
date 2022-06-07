import { Suspense } from "react";
import "./question.css";
export default function Question({
  question,
  correct_answer,
  incorrect_answers,
  handleClick,
  handleClickCorrect,
  index,
  endGame,
}) {
  var decodeHTML = function (html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };
  //TODO dar feedback cuando se "envien" las respuestas dar color a las respuestas correctas e incorrectas usando un className renderizado condiccionalmente
  const style = (isHeld) => ({
    backgroundColor: isHeld ? "#59E391" : "white",
  });
  const showResults = () => ({
    backgroundColor: "red",
  });
  // console.table(correct_answer);
  const Answers = incorrect_answers
    .map(({ answer, isHeld, id }) => (
      <button
        onClick={() => handleClick(false, index, id)}
        className="button-question"
        key={answer}
        id={answer}
        style={
          !endGame ? style(isHeld) : isHeld ? showResults() : style(isHeld)
        }
      >
        {decodeHTML(answer)}
      </button>
    ))
    .concat(
      <button
        style={style(correct_answer.isHeld)}
        onClick={() => handleClickCorrect(index)}
        key={correct_answer.correct}
        className="button-question"
      >
        {decodeHTML(correct_answer.correct)}
      </button>
    );

  //TODO 1# revolver los botones para que cambien de lugar
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
