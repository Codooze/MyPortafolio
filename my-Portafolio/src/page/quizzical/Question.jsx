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
  //TODO darle style a la respuesta correcta y las incorrectas luego mandarlos a renderizar pero antes de eso revolverlos, puede ser creando un objeto que sea de tipo input y luego al clicker la form correr una funcion que muestre los resultados aplicando el stylo de acuerdo a si se responde bien o mal*/
  return (
    <>
      <Suspense fallback={<div>loading...</div>}>
        <h2 className="h2-quiz">{decodeHTML(question)} </h2>
        <p>{decodeHTML(correct_answer)} </p>
      </Suspense>
    </>
  );
}
