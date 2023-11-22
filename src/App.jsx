import logo from "/logo.png";
import "./App.css";
import { makeShuffledDeck } from "./utils.jsx";
import { useState } from "react";

function App(props) {
  // Set default value of card deck to new shuffled deck
  const [cardDeck, setCardDeck] = useState(makeShuffledDeck());
  // currCards holds the cards from the current round
  const [currCards, setCurrCards] = useState([]);

  const dealCards = () => {
    const newCurrCards = [cardDeck.pop(), cardDeck.pop()];
    setCurrCards(newCurrCards);
  };
  // You can write JavaScript here, just don't try and set your state!
  const winnerFunction = (card) =>
    card.length < 2
      ? null
      : card[0].rank > card[1].rank
      ? "Player 1"
      : card[0].rank < card[1].rank
      ? "Player 2"
      : "Draw";
  const winner = <p>{winnerFunction(currCards)}</p>;
  // let counter = 0;
  // console.log(counter);
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
        {winner}
        <br />
        <button onClick={dealCards}>Deal</button>
      </div>
    </>
  );
}

export default App;
