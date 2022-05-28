import React from "react";
import "./tenzies.css";

import Die from "./Die";
import { nanoid } from "nanoid";

export default function Tenzies() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState({
    hasWon: false,
    rollCounter: 0,
  });

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies((prev) => ({ ...prev, hasWon: true }));
    }
  }, [dice]);

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function rollDice() {
    if (!tenzies.hasWon) {
      setTenzies((prev) => ({ ...prev, rollCounter: prev.rollCounter + 1 }));
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
    } else {
      setTenzies(() => ({ hasWon: false, rollCounter: 0 }));
      setDice(allNewDice());
    }
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  // var stylingObject = {
  //   div: {
  //     color: "red",
  //     border: "1px solid red",
  //   },
  //   input: {
  //     margin: "2px",
  //     padding: "5px",
  //   },
  // };

  // const style = {
  //   body: {
  //     margin: "0",
  //     backgroundColor: "#0b2434",
  //     padding: "20px",
  //     fontFamily: "Karla, sans-serif",
  //   },
  // };
  return (
    <div className="fullPage-tenzies">
      <main className="tenzies">
        {tenzies.hasWon && <h1>You won 🥳 here is your potato 🥔</h1>}

        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="dice-container">{diceElements}</div>
        <button className="roll-dice" onClick={rollDice}>
          {tenzies.hasWon ? "New Game" : "Roll"}
        </button>
        <span>🎲{tenzies.rollCounter}</span>
      </main>
    </div>
  );
}
