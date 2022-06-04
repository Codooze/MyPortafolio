import { Suspense } from "react";
import "./question.css";
export default function Question({
  question,
  correct_answer,
  incorrect_answers,
  handleClick,
  index,
}) {
  var decodeHTML = function (html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };
  const toggle = () => {};

  const style = (isHeld) => ({
    backgroundColor: isHeld ? "#59E391" : "white",
  });

  const wrongAns = incorrect_answers.map(({ answer, isHeld, id }) => (
    <button
      onClick={() => handleClick(id, index)}
      className="button-question"
      key={answer}
      id={answer}
      style={style(isHeld)}
    >
      {answer}
    </button>
  ));

  // .concat(
  //   <button onClick={toggle} key={correct_answer} className="button-question">
  //     {decodeHTML(correct_answer)}
  //   </button>
  // );

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
