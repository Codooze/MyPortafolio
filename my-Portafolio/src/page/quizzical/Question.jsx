import { Suspense } from "react";
import "./question.css";
export default function Question({
  question,
  correct_answer,
  incorrect_answers,
}) {
  var decodeHTML = function (html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };
  const toggle = () => {};
  // const style = {
  //   backgroundColor : incorrect_answers
  // }
  const incorrect_A = Object.keys(incorrect_answers);
  const IncorrectAns = incorrect_A.map((e) =>
    console.log(incorrect_answers[e])
  );
  const style = (key) => ({
    backgroundColor: incorrect_answers[key] ? "#59E391" : "white",
  });

  const bad = incorrect_A.map((e) => (
    <button
      onClick={toggle}
      className="button-question"
      key={e}
      id={e}
      style={style(e)}
    >
      {e}
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
        {bad}
      </Suspense>
    </>
  );
}
