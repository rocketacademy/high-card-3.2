import logo from "/logo.png";
import "./App.css";
import { makeShuffledDeck } from "./utils.jsx";
import { useState } from "react";

function App(props) {
  // Set default value of card deck to new shuffled deck
  const [cardDeck, setCardDeck] = useState(makeShuffledDeck());
  // currCards holds the cards from the current round
  const [currCards, setCurrCards] = useState([]);
  const [roundWinner, setroundWinner] = useState(null);
  const [player1RoundsWon, setPlayer1Roundswon] = useState(0);
  const [player2RoundsWon, setPlayer2Roundswon] = useState(0);
  const [hasGameStarted, setHasGameStarted] = useState(false);

  const resetGame = () => {
    setCurrCards([]);
    setCardDeck(makeShuffledDeck());
    setHasGameStarted(false);
    setroundWinner(null);
    setPlayer1Roundswon(0);
    setPlayer2Roundswon(0);
  };

  const dealCards = () => {
    const newCurrCards = [cardDeck.pop(), cardDeck.pop()];
    let newRoundWinner = null;
    if (newCurrCards[0].rank > newCurrCards[1].rank) {
      newRoundWinner = 1;
    } else if (newCurrCards[1].rank > newCurrCards[0].rank) {
      newRoundWinner = 2;
    }
    if (newRoundWinner === 1) {
      setPlayer1Roundswon(player1RoundsWon + 1);
    } else if (newRoundWinner === 2) {
      setPlayer2Roundswon(player2RoundsWon + 1);
    }
    setCurrCards(newCurrCards);
    setroundWinner(newRoundWinner);
    setCardDeck(cardDeck.slice(0, -2));
    setHasGameStarted(true);
  };

  // You can access your current components state here, as indicated below
  const currCardElems = currCards.map(({ name, suit }, index) => (
    // Give each list element a unique key
    <div key={`${name}${suit}`}>
      Player {index + 1} got the {name} of {suit}
    </div>
  ));
  const roundWinnerMessage = roundWinner
    ? `Player ${roundWinner} won this round`
    : "This round is a tie";
  const player1RoundsWonMessage = `Player 1 has won ${player1RoundsWon} rounds`;
  const player2RoundsWonMessage = `Player 2 has won ${player2RoundsWon} rounds`;
  const numRoundsLeft = cardDeck.length / 2;
  const numRoundsLeftMessage = `There are ${numRoundsLeft} rounds left in this game`;

  //determine game winner
  let gameWinner = null;
  if (player1RoundsWon > player2RoundsWon) {
    gameWinner = 1;
  } else if (player2RoundsWon > player1RoundsWon) {
    gameWinner = 2;
  }
  const gameWinnderMessage = gameWinner
    ? `Player ${gameWinner} won the game`
    : "It's a draw!";

  const dealButtonText = numRoundsLeft === 0 ? "Reset Game" : "Deal";

  return (
    <>
      <div>
        <img src={logo} className="logo" alt="Rocket logo" />
      </div>
      <div className="card">
        <h2>React High Card 🚀</h2>
        {currCardElems}
        <br />
        <button onClick={numRoundsLeft === 0 ? resetGame : dealCards}>
          {dealButtonText}
        </button>
        <br />
        <p>{hasGameStarted && roundWinnerMessage}</p>
        <p>{hasGameStarted && player1RoundsWonMessage}</p>
        <p>{hasGameStarted && player2RoundsWonMessage}</p>
        <p>{hasGameStarted && numRoundsLeftMessage}</p>
      </div>
    </>
  );
}

export default App;
