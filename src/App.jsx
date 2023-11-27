import logo from "/logo.png";
import "./App.css";
import { makeShuffledDeck } from "./utils.jsx";
import { useState } from "react";

function App(props) {
  // Set default value of card deck to new shuffled deck
  const [cardDeck, setCardDeck] = useState(makeShuffledDeck());
  // currCards holds the cards from the current round
  const [currCards, setCurrCards] = useState([]);
  const [score, setScore] = useState([0, 0, 0]);
  const [roundWinner, setRoundWinner] = useState("");
  const [gameEnd, setGameEnd] = useState(false);
  const [gameWinner, setGameWinner] = useState("");

  const dealCards = () => {
    if (cardDeck.length >= 2) {
      const newCurrCards = [cardDeck.pop(), cardDeck.pop()];
      setCurrCards(newCurrCards);
      winEvaluate(newCurrCards);
    } else {
      endGame();
    }
  };
  const restartGame = () => {
    setCardDeck(makeShuffledDeck());
    setCurrCards([]);
    setScore([0, 0, 0]);
    setRoundWinner("");
    setGameEnd(false);
    setGameWinner("");
  };

  const endGame = () => {
    if (score[0] > score[1]) {
      setGameWinner("Player 1");
    } else if (score[0] < score[1]) {
      setGameWinner("Player 2");
    } else setGameWinner("Draw");
    setGameEnd(true);
  };
  // You can write JavaScript here, just don't try and set your state!
  const winEvaluate = (card) => {
    if (card[0].rank > card[1].rank) {
      setRoundWinner("Player 1");
      setScore((x) => {
        x[0]++;
        return x;
      });
    } else if (card[0].rank < card[1].rank) {
      setScore((x) => {
        x[1]++;
        return x;
      });
      setRoundWinner("Player 2");
    } else {
      setScore((x) => {
        x[2]++;
        return x;
      });
      setRoundWinner("Draw");
    }
  };

  // You can access your current components state here, as indicated below
  const currCardElems = currCards.map(({ name, suit }) => (
    // Give each list element a unique key
    <div key={`${name}${suit}`}>
      {name} of {suit}
    </div>
  ));

  return (
    <>
      <div>
        <img src={logo} className="logo" alt="Rocket logo" />
      </div>
      <div className="card">
        <h2>React High Card 🚀</h2>
        {currCardElems}
        {gameEnd ? (
          <p>
            Game Over Game Winner: {gameWinner}
            <br />
          </p>
        ) : (
          <p>Round Winner: {roundWinner}</p>
        )}
        <p>
          <span>Player 1: {score[0]}</span>
          <br />
          <span>Player 2: {score[1]}</span>
          <br />
          <span>Draws: {score[2]}</span>
        </p>
        <br />
        {gameEnd ? (
          <button onClick={restartGame}>Restart</button>
        ) : (
          <button onClick={dealCards}>Deal</button>
        )}
      </div>
    </>
  );
}

export default App;
