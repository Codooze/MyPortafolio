import React from "react";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import Question from "./Question.jsx";
import "./quiz.css";
const fetcher = (...args) => fetch(...args).then((res) => res.json());
const API =
  "https://opentdb.com/api.php?amount=5&category=31&difficulty=medium&type=multiple";
//? Cómo usar SWR 🤌 https://www.youtube.com/watch?v=F1o_0umlXbU&list=PLCYRF3rQd5rrO-e6glGMmiXhE3YU_3dgy&index=13
export default function Quiz() {
  const { data, error } = useSWR(API, fetcher, {
    suspense: true,
    revalidateOnFocus: false,
  });
  if (error) return <div>failed to load</div>;
  const [heldData, setHeldData] = useState(questionData());
  // const [heldIncorrectData, setHeldIncData] = useState(incorrectData());

  function incorre() {
    const objEX = [
      {
        answer: "respuesta",
        id: 0,
        isHeld: false,
      },
      {
        answer: "respuesta",
        id: 1,
        isHeld: false,
      },
    ];
    return objEX;
  }
  //! console.log(heldIncorrectData[1].id);

  // function incorrectData() {
  //   let editedData = {};
  //   editedData = data.results.map(({ incorrect_answers }, index) =>
  //     incorrect_answers.map((e) => ({ answer: e, isHeld: false, id: index }))
  //   );
  //   // console.table(editedData);
  //   console.log(editedData);
  //   return editedData;
  // }
  function questionData() {
    let editedData = {};
    editedData = data.results.map(
      ({ question, correct_answer, incorrect_answers }, index) => ({
        index: index,
        question: question,
        correct_answer: { correct: correct_answer, isHeld: false },
        incorrect_answers: incorrect_answers.map((e, id) => ({
          answer: e,
          isHeld: false,
          id: id,
        })),
      })
    );
    return editedData;
  }
  //TODO ver hold dice part 1 en scrimba
  //TODO No permiter que poner isHeld a mas de una opción en la misma respuesta 👈
  function holdButton(innerIndex, outerIndex) {
    //! setHeldIncData((oldDice) =>
    //!   oldDice.map((die) => {
    //!     return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
    //!   })
    //! ); codigo de ejemplo
    const newHeldState = heldData[outerIndex].incorrect_answers.map((e, id) => {
      // console.log(`⭐e.id:  ${e.id} |  ${e.id === outerIndex ? "YES" : "NO"}`);
      return e.id === innerIndex ? { ...e, isHeld: !e.isHeld } : e;
    });
    // console.log(`⭐ outer:${outerIndex} | inner: ${innerIndex} | `); Check the outer and inner poss selected

    console.log(innerIndex);
    setHeldData((prev) => {
      return prev.map((e, awa) => {
        // console.log(
        //   `⭐${e.index} | ${innerIndex} ➡️ ${e.index} | ${outerIndex} ${
        //     e.index === outerIndex ? "YES" : "NO"
        //   }`
        // ); check poss we are in
        return e.index === outerIndex
          ? { ...e, incorrect_answers: newHeldState }
          : e;
      });
    });
  }
  // console.table(heldData);
  const QuetionsAndAnswers = heldData.map(
    ({ question, correct_answer, incorrect_answers, index }, id) => (
      <Question
        key={id}
        index={index}
        question={question}
        correct_answer={correct_answer}
        incorrect_answers={incorrect_answers}
        handleClick={holdButton}
      />
    )
  );

  return (
    <section className="container-quiz">
      <p>Data:</p>
      {QuetionsAndAnswers}
    </section>
  );
}
