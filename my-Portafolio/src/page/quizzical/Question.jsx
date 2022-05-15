import { Suspense } from "react";
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

  return (
    <>
      <Suspense fallback={<div>loading...</div>}>
        <h2 className="h2-quiz">{decodeHTML(question)} </h2>
        <p>{decodeHTML(correct_answer)} </p>
      </Suspense>
    </>
  );
}
