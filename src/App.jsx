import logo from "/logo.png";
import "./App.css";
import { makeShuffledDeck } from "./utils.jsx";
import { useEffect, useState } from "react";

function App(props) {

  const [cardDeck, setCardDeck] = useState(makeShuffledDeck());
  const [currCards, setCurrCards] = useState([]);

  const dealCards = () => {
    const newCurrCards = [cardDeck.pop(), cardDeck.pop()];
    setCurrCards(newCurrCards);
  };

  useEffect(() => { checkWinner()
  },[currCards])

  const currCardElems = currCards.map(({ name, suit }) => (
    <div key={`${name}${suit}`}>
      {name} of {suit}
    </div>
  ));

  const checkWinner = () => {
    console.log(currCards[0]);
    console.log(currCards[1]);
  }

  return (
    <>
      <div>
        <img src={logo} className="logo" alt="Rocket logo" />
      </div>
      <div className="card">
        <h2>React High Card 🚀</h2>
        {currCardElems}
        <br />
        <button onClick={dealCards}>Deal</button>
      </div>
    </>
  );
}

export default App;
