import "./quiz.css";
import useSWR, { mutate } from "swr";
import Question from "./Question.jsx";
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

  // console.table(
  //   data.results.map(({ question, correct_answer, incorrect_answers }) => ({
  //     question,
  //     correct_answer,
  //     incorrect_answers,
  //   }))
  // );

  const questionsData = data.results.map(
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
      {questionsData}
    </section>
  );
}
