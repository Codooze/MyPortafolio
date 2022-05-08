import React from "react";
import "./die.css";
export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white",
  };
  const dots = () => {
    const arr = [];
    let count = 0;
    do {
      arr.push(<p className="pip">●</p>);
      ++count;
    } while (count < props.value);
    return arr;
  };
  const hi = () => "hihi";
  return (
    <div className="die-face" style={styles} onClick={props.holdDice}>
      {dots()}
    </div>
  );
}
