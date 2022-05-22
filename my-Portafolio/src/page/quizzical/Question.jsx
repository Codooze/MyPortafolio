import { Suspense } from "react";
import React from "react";
import "./question.css";
export default function Question({
  question,
  correct_answer,
  incorrect_answers,
}) {
  const [selected_answer, setSelecte_answer] = React.useState({
    correct_answer: correct_answer,
    incorrect_answers: incorrect_answers,
  });
  var decodeHTML = function (html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };
  // const Questions = incorrect_answers.concat(correct_answer);
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setSelecte_answer((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  //TODO ✅ darle style a la respuesta correcta y las incorrectas luego mandarlos a renderizar pero antes de eso revolverlos, puede ser creando un objeto que sea de tipo input y luego al clickear la form correr una funcion que muestre los resultados aplicando el stylo de acuerdo a si se responde bien o mal*/
  //TODO 🤔 creo que necesito mapear cada respuesta incorrecta y deplegarla en su propio input y para el stylo copiar el codigo que esta en firefox para ocultar el checkbox
  const incorrect_Q = incorrect_answers.map((element) => (
    <>
      <input
        className="input-question"
        type="radio"
        id={element}
        name="Question"
        value={element}
        checked={
          selected_answer.incorrect_answers ===
          selected_answer.incorrect_answers
        }
        onChange={handleChange}
      />
      <label htmlFor={correct_answer}>{decodeHTML(element)}</label>
      {console.log(
        `${selected_answer.incorrect_answers} 🎭🎭 ${selected_answer.incorrect_answers}}`
      )}
    </>
  ));
  // console.table(incorrect_answers);
  return (
    <>
      <Suspense fallback={<div>loading...</div>}>
        <h2 className="h2-quiz">{decodeHTML(question)} </h2>
        {/* <p>{decodeHTML(correct_answer)} </p> */}
        <form>
          <input
            className="input-question"
            type="radio"
            id={correct_answer}
            name="Question"
            value={correct_answer}
            checked={
              selected_answer.correct_answer === selected_answer.correct_answer
            }
            onChange={handleChange}
          />
          <label className="radio-question" htmlFor={correct_answer}>
            {decodeHTML(correct_answer)}
          </label>
          {incorrect_Q}
        </form>
      </Suspense>
    </>
  );
}
