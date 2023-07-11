import React, { useState } from 'react';
import styles from "./memory-game.module.css";

enum Guess {
  Heads = 'Heads',
  Tails = 'Tails',
}

const CoinFlipGame: React.FC = () => {
  const [result, setResult] = useState('');
  const [count, setCount] = useState(0);

  const flipCoin = () => {
    const random = Math.random();
    const newResult = random < 0.5 ? Guess.Heads : Guess.Tails;
    setResult(newResult);
    setCount(count + 1);
  };

  const makeGuess = (guess: Guess) => {
    if (result === guess) {
      alert('Correct guess!');
    } else {
      alert('Wrong guess!');
    }
  };

  const resetGame = () => {
    setResult('');
    setCount(0);
  };

  return (
    <div>
      <h1>Coin Flip Guessing Game</h1>
      <p>Result: {result}</p>
      <p>Total Flips: {count}</p>
      <button onClick={flipCoin}>Flip Coin</button>
      <button onClick={() => makeGuess(Guess.Heads)}>Guess Heads</button>
      <button onClick={() => makeGuess(Guess.Tails)}>Guess Tails</button>
      <button onClick={resetGame}>Reset</button>
    </div>
  );
};

export default CoinFlipGame;
