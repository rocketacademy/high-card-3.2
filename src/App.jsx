import logo from "/logo.png";
import "./App.css";
import { makeShuffledDeck } from "./utils.jsx";
import { useEffect, useState } from "react";

function App(props) {

  const [cardDeck, setCardDeck] = useState(makeShuffledDeck());
  const [currCards, setCurrCards] = useState([]);
  const [currWinner, setCurrWinner] = useState(0); 
  const [player1wins, setPlayer1Wins] = useState(0);
  const [player2wins, setPlayer2Wins] = useState(0);

  const dealCards = () => {
    const newRoundOfCards = [cardDeck.pop(), cardDeck.pop()];
    let roundWinner = null;

    if (newRoundOfCards[0].rank > newRoundOfCards[1].rank) {
      roundWinner = 1;
      setPlayer1Wins(player1wins + 1)
    } else if (newRoundOfCards[1].rank > newRoundOfCards[0].rank) {
      roundWinner = 2;
      setPlayer2Wins(player2wins + 1)
    } else {
      roundWinner = null;
    }

    setCurrCards(newRoundOfCards);
    setCurrWinner(roundWinner);

  };

  const currCardElems = currCards.map(({ name, suit }) => (
    <div key={`${name}${suit}`}>
      {name} of {suit}
    </div>
  ));

  const declareWinner = () => {
    let gameWinner = "";
    if (player1wins > player2wins){
      gameWinner = "Player 1 wins the game!";
    } else if (player2wins > player1wins) {
      gameWinner = "Player 2 wins the game!";
    } else {
      gameWinner = "It's a Draw!"
    } 
    return gameWinner
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
      <div>
        <p>Player {currWinner} wins!</p>
      </div>
      <div>
        <p>Player 1 has {player1wins} wins.</p>
      </div>
      <div>
        <p>Player 2 has {player2wins} wins.</p>
      </div>
      <p>
        {cardDeck.length > 0 ? null : "Card Deck Empty."}
      </p>
      {cardDeck.length > 0 ? null : declareWinner()}
    </>
  );
}

export default App;
