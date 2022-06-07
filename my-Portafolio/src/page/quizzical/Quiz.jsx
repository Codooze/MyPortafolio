import React from "react";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import Question from "./Question.jsx";
import "./quiz.css";
import { Button, RingProgress, Text } from "@mantine/core";

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
  const [endGame, setEndGame] = useState({ points: 0, End: false });
  // const [heldIncorrectData, setHeldIncData] = useState(incorrectData());

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
  //TODO impedir que se cambien las respuestas una ves finalizado el quiz, Agregar un botton de jugar de nuevo
  function evaluateAnswers() {
    console.log(heldData.length);
    let points = 0;
    for (let i = 0; i < heldData.length; i++) {
      if (heldData[i].correct_answer.isHeld) {
        points = points + 20;
      }
    }
    setEndGame((prev) => ({ points: points, End: true }));
    console.log(endGame);
  }
  function holdButton(...args) {
    /*
    args[0]= boolean
    args[1]=outerIndex
    args[2]=innerIndex
    */
    //! setHeldIncData((oldDice) =>
    //!   oldDice.map((die) => {
    //!     return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
    //!   })
    //! ); codigo de ejemplo
    let newHeldState;
    if (!args[0]) {
      newHeldState = heldData[args[1]].incorrect_answers.map((e, id) => {
        return e.id === args[2]
          ? { ...e, isHeld: !e.isHeld }
          : { ...e, isHeld: false };
      });
      handleClickCorrect(args[1], false);
    } else {
      newHeldState = heldData[args[1]].incorrect_answers.map((e, id) => {
        return { ...e, isHeld: false };
      });
    }

    // console.log(`⭐ outer:${args[1]} | inner: ${args[2]} | `); Check the outer and inner poss selected
    setHeldData((prev) => {
      return prev.map((e) => {
        // console.log(
        //   `⭐${e.index} | ${args[2]} ➡️ ${e.index} | ${args[1]} ${
        //     e.index === args[1] ? "YES" : "NO"
        //   }`
        // ); check poss we are in
        return e.index === args[1]
          ? { ...e, incorrect_answers: newHeldState }
          : e;
      });
    });
  }
  function handleClickCorrect(outerIndex, setIsHeld = true) {
    const newHeldState = heldData[outerIndex].correct_answer;
    newHeldState.isHeld = !newHeldState.isHeld;
    // console.log(`🤯 ${newHeldState.isHeld} | ${newHeldState.correct}`);
    if (!setIsHeld) {
      newHeldState.isHeld = false;
    } else {
      holdButton(true, outerIndex);
    }

    setHeldData((prev) => {
      return prev.map((e) => {
        return e.index === outerIndex
          ? { ...e, correct_answer: newHeldState }
          : e;
      });
    });
  }
  const QuetionsAndAnswers = heldData.map(
    ({ question, correct_answer, incorrect_answers, index }, id) => (
      <Question
        key={id}
        index={index}
        question={question}
        correct_answer={correct_answer}
        incorrect_answers={incorrect_answers}
        handleClick={holdButton}
        handleClickCorrect={handleClickCorrect}
        endGame={endGame.End}
      />
    )
  );

  return (
    <section className="container-quiz">
      <p>Data:</p>
      {QuetionsAndAnswers}
      <Button
        onClick={evaluateAnswers}
        className="button-send"
        variant="gradient"
        gradient={{ from: "teal", to: "lime", deg: 105 }}
      >
        Send Answers
      </Button>
      {endGame.End && (
        <RingProgress
          className="RingProgress-Quiz"
          sections={[{ value: endGame.points, color: "blue" }]}
          label={
            <Text color="blue" weight={700} align="center" size="xl">
              {endGame.points}%
            </Text>
          }
        />
      )}
    </section>
  );
}
