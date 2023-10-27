import React from "react";
import "./App.css";
import { makeShuffledDeck } from "./utils.jsx";
import { useState } from "react";

function App(props) {
  // Set default value of card deck to new shuffled deck
  const [cardDeck, setCardDeck] = useState(makeShuffledDeck());
  // currCards holds the cards from the current round
  const [currCards, setCurrCards] = useState([]);

  const [hasGameStarted, setHasGameStarted] = useState(false);
  const [roundWinner, setRoundWinner] = useState(null);
  const [player1RoundsWon, setPlayer1RoundsWon] = useState(0);
  const [player2RoundsWon, setPlayer2RoundsWon] = useState(0);

  const resetGame = () => {
    setCurrCards([]);
    setCardDeck(makeShuffledDeck());
    setHasGameStarted(false);
    setRoundWinner(null);
    setPlayer1RoundsWon(0);
    setPlayer2RoundsWon(0);
  };

  const dealCards = () => {
    const newCurrCards = [cardDeck.pop(), cardDeck.pop()];
    setCurrCards(newCurrCards);
  };
  // You can write JavaScript here, just don't try and set your state!

  // You can access your current components state here, as indicated below
  const currCardElems = currCards.map(({ name, suit }) => (
    // Give each list element a unique key
    <div key={`${name}${suit}`}>
      {name} of {suit}
    </div>
  ));

  return (
    <div className="App">
      <header className="App-header">
        <h2>React High Card 🚀</h2>
        {currCardElems}
        <br />
        <button onClick={dealCards}>Deal</button>
      </header>
    </div>
  );
}

export default App;
