// HIGH CARD GAME RULE
// 2-players turn-based game.
// Each player draws a card and the player with the highest card wins that round.
// The overall winner is the player that has won the most rounds when the deck runs out of cards.

// BASE SOLUTION
// Determine who has won each round (Player 1 or Player 2).
// Keep score during each game (how many rounds has each player won).
// Declare a winner at the end of each game when the deck has run out of cards,
// and give the players the option to restart the game.

import logo from "/logo.png";
import "./App.css";
import { makeShuffledDeck } from "./utils.jsx";
import { useState } from "react";

function App(props) {
  // Set default value of card deck to new shuffled deck
  const [cardDeck, setCardDeck] = useState(makeShuffledDeck());
  // currCards holds the cards from the current round
  const [currCards, setCurrCards] = useState([]);
  // ADDITIONAL STATES
  // keep track of the scores for each 2 players
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  // determine whether the game is over
  const [gameOver, setGameOver] = useState(false);

  // DEAL FUNCTION
  // check if theres at least two cards left
  // if not, set the gameOver state to true
  const dealCards = () => {
    if (cardDeck.length < 2) {
      setGameOver(true);
      return;
    }

    // pops the last two cards from the cardDeck array,
    // set them as newCurrCards using the setCurrCards function
    const newCurrCards = [cardDeck.pop(), cardDeck.pop()];
    setCurrCards(newCurrCards);

    // compare the ranks of 2 cards and updates the scores for every deal
    const [card1, card2] = newCurrCards;
    if (card1.rank > card2.rank) {
      setPlayer1Score(player1Score + 1);
    } else if (card1.rank < card2.rank) {
      setPlayer2Score(player2Score + 1);
    }
  };

  // RESET GAME FUNCTION
  const restartGame = () => {
    setCardDeck(makeShuffledDeck());
    setCurrCards([]);
    setPlayer1Score(0);
    setPlayer2Score(0);
    setGameOver(false);
  };

  const currCardElems = currCards.map(({ name, suit }) => (
    <div key={`${name}${suit}`}>
      {name} of {suit}
    </div>
  ));

  return (
    <>
      <div>
        <img src={logo} className="logo" alt="Card logo" />
      </div>
      <div className="card">
        <h2>High Card</h2>
        {currCardElems}
        <br />
        {!gameOver ? (
          <>
            <button onClick={dealCards}>Deal</button>
            <p>Player 1 score: {player1Score}</p>
            <p>Player 2 score: {player2Score}</p>
          </>
        ) : (
          <>
            <p>Game Over!</p>
            <p>Player {player1Score > player2Score ? "1" : "2"} wins!</p>
            <p>Player 1 score: {player1Score}</p>
            <p>Player 2 score: {player2Score}</p>
            <button onClick={restartGame}>Restart</button>
          </>
        )}
      </div>
    </>
  );
}

export default App;
