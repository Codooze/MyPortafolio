import "./quizzical.css";
export const Quizzical = () => {
  const handleClick = () => {
    console.log("I was clicked");
  };
  return (
    <article className="article-quizzical">
      <section className="section-quizzical">
        <h1>Quizzical</h1>
        <h2>Gain a trillion billion answering this right 🤑💵💷💶</h2>
        <button className="button-quizzical" onClick={handleClick}>
          Start Quiz
        </button>
      </section>
    </article>
  );
};
