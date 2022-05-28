import React from "react";
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
  //TODO add a isHeld property to both correct and incorrect answers

  // const bad_answers = data.results.map(({ incorrect_answers }) =>
  //   incorrect_answers.map((element) => ({ response: element, isHeld: false }))
  // );

  const questionData = data.results.map(
    ({ question, correct_answer, incorrect_answers }, index) => ({
      question: question,
      correct_answer: { correct: correct_answer, isHeld: false },
      incorrect_answers: incorrect_answers.reduce(function (result, item) {
        result[item] = true; //a, b, c
        return result;
      }, {}),
    })
  );
  //! console.log(questionData);
  // console.log(incorrect_answers.map((e) => e.map((e) => e.isHeld)));
  const [heldData, setHeldData] = React.useState(questionData);
  // console.log(heldData);
  const QuetionsAndAnswers = heldData.map(
    ({ question, correct_answer, incorrect_answers }, index) => (
      <Question
        key={index}
        question={question}
        correct_answer={correct_answer}
        incorrect_answers={incorrect_answers}
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
