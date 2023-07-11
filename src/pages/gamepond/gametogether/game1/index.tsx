import { useState, useEffect } from "react";
import styles from "./memory-game.module.css";
const board = ["🤖", "👽", "👻", "🤡", "🐧", "🦚", "😄", "🚀"];

const Home: React.FC = () => {
  const [boardData, setBoardData] = useState<string[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    if (matchedCards.length === 16) {
      setGameOver(true);
    }
  }, [moves]);

  const initialize = () => {
    shuffle();
    setGameOver(false);
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
  };

  const shuffle = () => {
    const shuffledCards = [...board, ...board]
      .sort(() => Math.random() - 0.5)
      .map((v) => v);

    setBoardData(shuffledCards);
  };

  const updateActiveCards = (i: number) => {
    if (!flippedCards.includes(i)) {
      if (flippedCards.length === 1) {
        const firstIdx = flippedCards[0];
        const secondIdx = i;
        if (boardData[firstIdx] === boardData[secondIdx]) {
          setMatchedCards((prev) => [...prev, firstIdx, secondIdx]);
        }

        setFlippedCards([...flippedCards, i]);
      } else if (flippedCards.length === 2) {
        setFlippedCards([i]);
      } else {
        setFlippedCards([...flippedCards, i]);
      }

      setMoves((v) => v + 1);
    }
  };

  return (
    <div className=" container ">
    <div className={styles.container}>
      <div className={styles.menu}>
        <p>{`Moves - ${moves}`}</p>
      </div>

      <div className={styles.board}>
        {boardData.map((data, i) => {
          const flipped = flippedCards.includes(i) ? true : false;
          const matched = matchedCards.includes(i) ? true : false;
          return (
            <div
              onClick={() => {
                updateActiveCards(i);
              }}
              key={i}
              className={`${styles.card} ${flipped || matched ? styles.active : ""} ${
                matched ? styles.matched : ""
              } ${gameOver ? styles.gameover : ""}`}
            >
              <div className={styles["card-front"]}>{data}</div>
              <div className={styles["card-back"]}></div>
            </div>
          );
        })}
      </div>
      <div className={styles.menu}>
        <p>{`GameOver - ${gameOver}`}</p>
        <button onClick={() => initialize()} className={styles["reset-btn"]}>
          Reset
        </button>
      </div>
    </div>
    </div>
  );
};

export default Home;