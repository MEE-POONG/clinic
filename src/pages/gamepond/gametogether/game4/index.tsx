import React, { useState } from 'react';

enum CardSuit {
  Hearts = '♥️',
  Diamonds = '♦️',
  Clubs = '♣️',
  Spades = '♠️',
}

enum CardValue {
  Ace = 'A',
  Two = '2',
  Three = '3',
  Four = '4',
  Five = '5',
  Six = '6',
  Seven = '7',
  Eight = '8',
  Nine = '9',
  Ten = '10',
  Jack = 'J',
  Queen = 'Q',
  King = 'K',
}

type Card = {
  suit: CardSuit;
  value: CardValue;
};

const CardGuessingGame: React.FC = () => {
  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const [guess, setGuess] = useState('');
  const [result, setResult] = useState('');

  const generateRandomCard = () => {
    const suits = Object.values(CardSuit);
    const values = Object.values(CardValue);
    const randomSuit = suits[Math.floor(Math.random() * suits.length)];
    const randomValue = values[Math.floor(Math.random() * values.length)];
    const card: Card = {
      suit: randomSuit,
      value: randomValue,
    };
    setCurrentCard(card);
    setResult('');
  };

  const makeGuess = () => {
    if (!currentCard) return;
    if (guess === `${currentCard.value} ${currentCard.suit}`) {
      setResult('Correct guess!');
    } else {
      setResult('Wrong guess!');
    }
    setGuess('');
  };

  return (
    <div>
      <h1>Card Guessing Game</h1>
      <div className="card">
        {currentCard && (
          <div className="card-content">
            <span className="card-suit">{currentCard.suit}</span>
            <span className="card-value">{currentCard.value}</span>
          </div>
        )}
      </div>
      <div className="guess-section">
        <input
          type="text"
          placeholder="Enter your guess"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
        />
        <button onClick={makeGuess}>Guess</button>
      </div>
      <div className="result">{result}</div>
      <button onClick={generateRandomCard}>Generate Card</button>
    </div>
  );
};

export default CardGuessingGame;
