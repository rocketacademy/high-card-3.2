import logo from "/logo.png";
import "./App.css";
import { makeShuffledDeck } from "./utils.jsx";
import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";

function App(props) {

  const [cardDeck, setCardDeck] = useState(makeShuffledDeck());
  const [currCards, setCurrCards] = useState([]);
  const [currWinner, setCurrWinner] = useState(0); 
  const [player1wins, setPlayer1Wins] = useState(0);
  const [player2wins, setPlayer2Wins] = useState(0);
  const [gameState, setGameState] = useState(false);

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
      roundWinner = 0;
    }

    setCurrCards(newRoundOfCards);
    setCurrWinner(roundWinner);
    setGameState(true); 

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

  const resetGame = () => {
    setCardDeck(makeShuffledDeck);
    setCurrCards([]);
    setCurrWinner(0);
    setPlayer1Wins(0);
    setPlayer2Wins(0);
    setGameState(false)
  }

  let winStatement = currWinner == 0 ? "It's a Draw!" : "Player " + currWinner + " wins!"

  return (
    <>
      <div>
        <img src={logo} className="logo" alt="Rocket logo" />
      </div>

      <h2>React High Card 🚀</h2>

      <div className="card-nb">
        {currCardElems}
        <br />
        <Button variant="light" onClick={dealCards}>
          Deal
        </Button>
      </div>
      <br></br>

      <Card>
        <div className="result">
          {gameState? winStatement : ""} 
          <p className="playerResult">Player 1 has {player1wins} wins.</p>
          <p className="playerResult">Player 2 has {player2wins} wins.</p>
        </div>
        <div className="aft-result">
          <p>{cardDeck.length > 0 ? null : "Card Deck Empty."}</p>
          <p style={{}}>{cardDeck.length > 0 ? null : declareWinner()}</p>
          <Button variant="danger" onClick={resetGame}> 
            Reset Game
          </Button>
        </div>
      </Card>
    </>
  );
}

export default App;
