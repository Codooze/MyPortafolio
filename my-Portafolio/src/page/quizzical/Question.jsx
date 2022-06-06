import { Suspense } from "react";
import "./question.css";
export default function Question({
  question,
  correct_answer,
  incorrect_answers,
  handleClick,
  handleClickCorrect,
  index,
}) {
  var decodeHTML = function (html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  const style = (isHeld) => ({
    backgroundColor: isHeld ? "#59E391" : "white",
  });
  // console.table(correct_answer);
  const wrongAns = incorrect_answers
    .map(({ answer, isHeld, id }) => (
      <button
        onClick={() => handleClick(false, index, id)}
        className="button-question"
        key={answer}
        id={answer}
        style={style(isHeld)}
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

  //TODO 1# usar concat revolver los botones para que cambien de lugar
  //TODO 2# al darle click a enviar check si la opcion escogida es la correcta si lo es sumar 1 sino restar crear un status en Quiz para esto
  //TODO renderizar una clase condicionalmente si es se seleciona un button
  return (
    <>
      <Suspense fallback={<div>loading...</div>}>
        <h2 className="h2-quiz">{decodeHTML(question)} </h2>
        {/* <p>{decodeHTML(correct_answer)} </p> */}
        {wrongAns}
      </Suspense>
    </>
  );
}
