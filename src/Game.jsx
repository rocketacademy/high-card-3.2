import { makeShuffledDeck } from "./utils.jsx";
import { useState } from "react";
import DealCard from "./DealCard.jsx";

function Game(props) {
  // Set default value of card deck to new shuffled deck
  const [cardDeck, setCardDeck] = useState(makeShuffledDeck());
  // currCards holds the cards from the current round
  const [currCards, setCurrCards] = useState([]);
  const [player1Wins, setPlayer1Wins] = useState(0);
  const [player2Wins, setPlayer2Wins] = useState(0);
  const [roundWinner, setRoundWinner] = useState(null);
  const [showCardContent, setShowCardContent] = useState(false);
  const [finalWinner, setFinalWinner] = useState(null);
  const [buttonText, setButtonText] = useState("Deal");
  const [buttonColour, setButtonColour] = useState("#ededed");

  const dealCards = () => {
    const newCurrCards = [cardDeck.pop(), cardDeck.pop()];
    setCurrCards(newCurrCards);
    determineWinner(newCurrCards);
    setShowCardContent(true);
    if (cardDeck.length === 0) {
      determineFinalWinner();
      setButtonText("Play Again");
      setButtonColour("#ffff99");
    }
  };

  //Game messages

  const PLAYER1 = `Player 1 wins `;
  const PLAYER2 = `Player 2 wins `;
  const TIE = `It's a tie!`;
  const ROUND = `the round.`;
  const GAME = `this game!!!!`;

  const determineWinner = (newCurrCards) => {
    if (newCurrCards.length === 2) {
      const [card1, card2] = newCurrCards;
      if (card1.rank > card2.rank) {
        setPlayer1Wins((prevWins) => prevWins + 1);
        setRoundWinner(`${PLAYER1}${ROUND}`);
      } else if (card1.rank < card2.rank) {
        setPlayer2Wins((prevWins) => prevWins + 1);
        setRoundWinner(`${PLAYER2}${ROUND}`);
      } else {
        setRoundWinner(`${TIE}`);
      }
    }
  };

  const determineFinalWinner = () => {
    if (player1Wins > player2Wins) {
      setFinalWinner(`${PLAYER1}${GAME}`);
    } else if (player2Wins > player1Wins) {
      setFinalWinner(`${PLAYER2}${GAME}`);
    } else {
      setFinalWinner(`${TIE}`);
    }
  };

  const restartGame = () => {
    setCardDeck(makeShuffledDeck);
    setCurrCards([]);
    setPlayer1Wins(0);
    setPlayer2Wins(0);
    setRoundWinner(null);
    setFinalWinner(null);
    setShowCardContent(false);
    setButtonText("Deal");
  };

  const currCardElems = currCards.map((card) => (
    <DealCard
      key={`${card.name}${card.suit}${card.rank}`}
      name={card.name}
      suit={card.suit}
      rank={card.rank}
    />
  ));

  // Button function

  // To change name of button when state changed
  // change function name
  const dealOrRestart = cardDeck.length > 0 ? dealCards : restartGame;
  // change button name
  const buttonLabel = cardDeck.length > 0 ? "Deal" : buttonText;
  // change button colour too
  const colourButton = cardDeck.length > 0 ? "#ededed" : buttonColour;

  return (
    <>
      <div className="card">
        <h2>High Card 🚀</h2>
        {showCardContent && (
          <>
            <p>Player 1: {currCardElems[0]}</p>
            <p>Player 2: {currCardElems[1]}</p>
            <br />
            <p>Player 1 Wins: {player1Wins}</p>
            <p>Player 2 Wins: {player2Wins}</p>
            <p>{roundWinner}</p>
            <p>{finalWinner}</p>
          </>
        )}
        <>
          <br />
          <button
            onClick={dealOrRestart}
            style={{ backgroundColor: colourButton }}
          >
            {buttonLabel}
          </button>
          <br />
        </>
      </div>
    </>
  );
}

export default Game;
