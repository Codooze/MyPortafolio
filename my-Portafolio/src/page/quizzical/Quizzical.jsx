import { useNavigate } from "react-router-dom";
import "./quizzical.css";
import Blob from "../../assets/blob.png";
import blobsYellow from "../../assets/blobsYellow.png";

export const Quizzical = () => {
  let navegate = useNavigate();
  // let location = useLocation();
  const handleClick = () => {
    // console.table(location);
    navegate(`/quiz`);
  };
  return (
    <article className="article-quizzical">
      <img className="imgFoot-quizzical" src={Blob} alt="" />
      <img className="imgTop-quizzical" src={blobsYellow} alt="" />
      <section className="section-quizzical">
        <h1 className="h1-quizzical">Quizzical</h1>
        <h2>Gain a trillion billion answering this right 🤑💵💷💶</h2>
        <button className="button-quizzical" onClick={handleClick}>
          Start Quiz
        </button>
      </section>
    </article>
  );
};
