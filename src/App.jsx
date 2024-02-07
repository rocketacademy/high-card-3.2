import "./App.css";
import logo from "/logo.png";
import { makeShuffledDeck } from "./utils.jsx";
import { useState } from "react";

function App() {
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
    const newCurrCards = [
      cardDeck[cardDeck.length - 1],
      cardDeck[cardDeck.length - 2],
    ];

    let newRoundWinner = null;

    if (newCurrCards[0].rank > newCurrCards[1].rank) {
      newRoundWinner = 1;
    } else if (newCurrCards[1].rank > newCurrCards[0].rank) {
      newRoundWinner = 2;
    }

    if (newRoundWinner === 1) {
      setPlayer1RoundsWon(player1RoundsWon + 1);
    } else if (newRoundWinner === 2) {
      setPlayer2RoundsWon(player2RoundsWon + 1);
    }

    setCurrCards(newCurrCards);
    setCardDeck(cardDeck.slice(0, -2));
    setRoundWinner(newRoundWinner);
    setHasGameStarted(true);
  };
  // You can write JavaScript here, just don't try and set your state!

  // You can access your current components state here, as indicated below
  const currCardElems = currCards.map(({ name, suit }) => (
    // Give each list element a unique key
    <div key={`${name}${suit}`}>
      {name} of {suit}
    </div>
  ));

  const roundWinnerMessage = roundWinner
    ? `Player ${roundWinner} won this round.`
    : `This rounds is a tie!`;
  const player1RoundsWonMessage = `Player 1 has won ${player1RoundsWon} rounds this game.`;
  const player2RoundsWonMessage = `Player 2 has won ${player2RoundsWon} rounds this game.`;
  const numRoundsLeft = cardDeck.length / 2;
  const numRoundsLeftMessage = `There are ${numRoundsLeft} rounds left in this game!`;

  // Determine game winner
  let gameWinner = null;
  if (player1RoundsWon > player2RoundsWon) {
    gameWinner = 1;
  } else if (player2RoundsWon > player1RoundsWon) {
    gameWinner = 2;
  }
  const gameWinnerMessage = gameWinner
    ? `Player ${gameWinner} won this game!`
    : "It's a draw!";

  // Deal button text changes at end of game to start again
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
        {/* Render winner message if the game is over */}
        <p>{numRoundsLeft === 0 && gameWinnerMessage}</p>
      </div>
    </>
  );
}

export default App;
