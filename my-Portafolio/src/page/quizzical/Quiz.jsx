import React from "react";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import Question from "./Question.jsx";
import "./quiz.css";
import Blob from "../../assets/blob.png";
import BlobsYellow from "../../assets/blobsYellow.png";
import {
  Button,
  RingProgress,
  Text,
  Overlay,
  Modal,
  Group,
  Drawer,
  Badge,
  Paper,
  ScrollArea,
} from "@mantine/core";

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
  const [opened, setOpened] = useState({ modal: false, drawer: false });

  function questionData() {
    let editedData = {};
    editedData = data.results.map(
      ({ question, correct_answer, incorrect_answers }, index) => ({
        index: index,
        question: question,
        // correct_answer: { correct: correct_answer, isHeld: false },
        incorrect_answers: incorrect_answers
          .map((e, id) => ({
            answer: e,
            isHeld: false,
            id: id,
          }))
          .concat({
            answer: correct_answer,
            isHeld: false,
            id: 3,
            isCorrect: true,
          })
          .sort((a, b) => Math.random() - 0.5),
      })
    );
    return editedData;
  }

  //TODO Acceder al id 3
  function evaluateAnswers() {
    let points = 0;
    const answersLength = heldData[0].incorrect_answers.length;
    console.log(heldData[0].incorrect_answers[2].isCorrect);
    for (let i = 0; i < heldData.length; i++) {
      for (let j = 0; j < answersLength; j++) {
        if (
          heldData[i].incorrect_answers[j].isHeld &&
          heldData[i].incorrect_answers[j].isCorrect
        ) {
          points = points + 20;
        }
      }
    }
    setEndGame((prev) => ({ points: points, End: true }));
  }
  function holdButton(outerIndex, innerIndex) {
    //! setHeldIncData((oldDice) =>
    //!   oldDice.map((die) => {
    //!     return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
    //!   })
    //! ); codigo de ejemplo

    const newHeldState = heldData[outerIndex].incorrect_answers.map((e, id) => {
      return e.id === innerIndex
        ? { ...e, isHeld: !e.isHeld }
        : { ...e, isHeld: false };
    });

    // console.log(`⭐ outer:${outerIndex} | inner: ${innerIndex} | `); Check the outer and inner poss selected
    setHeldData((prev) => {
      return prev.map((e) => {
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

  const QuetionsAndAnswers = heldData.map(
    ({ question, incorrect_answers, index }, id) => (
      <Question
        key={id}
        index={index}
        question={question}
        answers={incorrect_answers}
        handleClick={holdButton}
        endGame={endGame.End}
      />
    )
  );

  var decodeHTML = function (html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  const seeAnswers = heldData.map(({ question, incorrect_answers }) => (
    <>
      <Paper shadow="xm" radius="md" p="sm">
        <h4>{decodeHTML(question)}</h4>
        <Badge
          variant="gradient"
          gradient={{ from: "teal", to: "blue", deg: 60 }}
        >
          {decodeHTML(incorrect_answers.find((e) => e.id === 3).answer)}
        </Badge>
      </Paper>
    </>
  ));

  return (
    <>
      <section className="container-quiz">
        <img className="imgFoot-quiz" src={Blob} alt="" />
        <img className="imgTop-quiz" src={BlobsYellow} alt="" />
        {endGame.End && <Overlay opacity={0} color="#000" zIndex={5} />}
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
          <>
            <RingProgress
              className="RingProgress-Quiz"
              sections={[{ value: endGame.points, color: "blue" }]}
              label={
                <Text color="blue" weight={700} align="center" size="xl">
                  {endGame.points}%
                </Text>
              }
            />
          </>
        )}
        <Modal
          centered
          transition="fade"
          transitionDuration={600}
          transitionTimingFunction="ease"
          opened={opened.modal}
          onClose={() => setOpened({ ...opened, modal: false })}
          title="Good! Now what do you want to do?"
        >
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <Button
              onClick={() => {
                setEndGame({ points: 0, End: false });
                setOpened({ ...opened, modal: false });
              }}
            >
              Play
            </Button>
            <Button onClick={() => setOpened({ ...opened, drawer: true })}>
              See the Answers 😿
            </Button>
          </div>
        </Modal>
      </section>
      <Group position="center" className="playAgain-Quiz">
        <Button onClick={() => setOpened({ ...opened, modal: true })}>
          Try again?
        </Button>
      </Group>
      <Drawer
        position="right"
        size="lg"
        opened={opened.drawer}
        onClose={() => setOpened({ ...opened, drawer: false })}
        title="Correct Answers"
        padding="lg"
      >
        <ScrollArea style={{ height: "85vh" }} scrollbarSize={4}>
          {seeAnswers}
        </ScrollArea>
      </Drawer>
    </>
  );
}
