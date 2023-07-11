import React, { useState } from 'react';

const DiceGuessingGame: React.FC = () => {
  const [diceValue, setDiceValue] = useState<number | null>(null);
  const [guess, setGuess] = useState('');
  const [score, setScore] = useState(0);

  const rollDice = () => {
    const randomDiceValue = Math.floor(Math.random() * 6) + 1;
    setDiceValue(randomDiceValue);
  };

  const makeGuess = () => {
    if (diceValue === null) return;

    if (guess === diceValue.toString()) {
      setScore(score + 1);
      alert('Correct guess! You earned 1 point.');
    } else {
      alert(`Wrong guess! The dice rolled a ${diceValue}.`);
    }

    setGuess('');
    setDiceValue(null);
  };

  return (
    <div className="">
      <h1 className=" text-slate-50 font-c">Dice Guessing Game</h1>
      <p>Score: {score}</p>
      {diceValue && <p>ผลที่ออกคือ : {diceValue}</p>}
      <input
        type="number"
        placeholder="Enter your guess (1-6)"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
      />
      <button onClick={rollDice}>Roll Dice</button>
      <button onClick={makeGuess}>Make Guess</button>
    </div>
  );
};

export default DiceGuessingGame;
