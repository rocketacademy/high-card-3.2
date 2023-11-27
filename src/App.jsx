import React from "react";
import "./App.css";
import { makeShuffledDeck } from "./utils.jsx";
import { useState } from "react";
import { useEffect } from "react";

function App(props) {
  // Set default value of card deck to new shuffled deck
  const [cardDeck, setCardDeck] = useState(makeShuffledDeck());
  // currCards holds the cards from the current round
  const [currCards, setCurrCards] = useState([]);
  const [currentWinner, setCurrentWinner] = useState(null);
  //tracks winner for each round
  const [firstPlayerTotalWins, setFirstPlayerTotalWins] = useState(0);
  const [secondPlayerTotalWins, setSecondPlayerTotalWins] = useState(0);
  const [firstPlayerSessionWins, setFirstPlayerSessionWins] = useState(0);
  const [secondPlayerSessionWins, setSecondPlayerSessionWins] = useState(0);
  const [firstPlayerWin, setFirstPlayerWin] = useState(0);
  const [secondPlayerWin, setSecondPlayerWin] = useState(0);

  const reset = () => {
    setCardDeck(makeShuffledDeck());
    setCurrCards([]);
    setCurrentWinner(null);
    setFirstPlayerTotalWins(0);
    setSecondPlayerTotalWins(0);
  };

  const dealCards = () => {
    const newCurrCards = [cardDeck.pop(), cardDeck.pop()];
    console.log(`current cards: ${newCurrCards[0].image}`);
    setCurrCards(newCurrCards);

    let currentRoundWinner = null;

    if (newCurrCards[0].rank > newCurrCards[1].rank) {
      currentRoundWinner = 1;
      setFirstPlayerTotalWins(firstPlayerTotalWins + 1);
      console.log(`first player: ${firstPlayerTotalWins}`);
    } else {
      currentRoundWinner = 2;
      setSecondPlayerTotalWins(secondPlayerTotalWins + 1);
      console.log(`second player: ${firstPlayerTotalWins}`);
    }
    setCurrentWinner(currentRoundWinner);

    console.log(cardDeck.length);
  };

  // You can access your current components state here, as indicated below
  const currentCardSection = currCards.map(({ name, suit, image }) => (
    // Give each list element a unique key
    <div key={`${name}${suit}`}>
      <p>
        {name} of {suit}
      </p>
      <img src={image} alt="card" />
    </div>
  ));

  const currentWinnerText = currentWinner
    ? `Player ${currentWinner} wins this round!`
    : `Both players tie!`;
  const firstPlayerTotalWinsText = `First player: ${firstPlayerTotalWins} wins`;
  const secondPlayerTotalWinsText = `Second player: ${secondPlayerTotalWins} wins`;
  let gameWinner = "";
  let firstSession = sessionStorage.getItem("firstPlayerSessionWins");
  let secondSession = sessionStorage.getItem("secondPlayerSessionWins");

  // const [firstPlayerSessionWins, setFirstPlayerSessionWins] = useState(0);
  // const [secondPlayerSessionWins, setSecondPlayerSessionWins] = useState(0);

  if (cardDeck.length === 0 && firstPlayerTotalWins > secondPlayerTotalWins) {
    gameWinner = "Player 1 wins the game!";
    // setFirstPlayerWin(firstPlayerWin + 1);

    //test
    let count = firstSession;
    if (count == null) {
      // Initialize  count
      count = 1;
    } else {
      // Increment count
      count = Number(count) + 1;
    }
    // Update session storage
    sessionStorage.setItem("firstPlayerSessionWins", count);
    firstSession = count;
    console.log(`first session ${firstSession}`);
  } else if (
    cardDeck.length === 0 &&
    firstPlayerTotalWins < secondPlayerTotalWins
  ) {
    gameWinner = "Player 2 wins the game!";

    //TEST
    let count = secondSession;
    if (count == null) {
      // Initialize count
      count = 1;
    } else {
      // Increment count
      count = Number(count) + 1;
    }
    // Update session storage
    sessionStorage.setItem("secondPlayerSessionWins", count);
    secondSession = count;

    //use effect to update session wins
  } else if (cardDeck.length === 0) {
    gameWinner = "It's a tie!";
  }

  const buttonText = cardDeck.length === 0 ? "Reset" : "Deal";

  //TEST IMAGES
  // function importAll(r) {
  //   let images = {};
  //   r.keys().map((item) => {
  //     images[item.replace("./", "")] = r(item);
  //   });
  //   return images;
  // }

  // const images = importAll(require.context("./images", false, "/.png/"));

  return (
    <div className="App">
      {/* <img src={images["high-card-3.2/src/cards/spades-10.png"]} /> */}
      <header className="App-header">
        <h2>React High Card 🚀</h2>
        {currentCardSection}

        <br />

        <p>{currentWinner && currentWinnerText}</p>
        <p>{currentWinner && firstPlayerTotalWinsText}</p>
        <p>{currentWinner && secondPlayerTotalWinsText}</p>
        <p>{gameWinner !== "" && gameWinner}</p>
        <button onClick={cardDeck.length === 0 ? reset : dealCards}>
          {buttonText}
        </button>
        <p>{gameWinner !== "" && `Player 1 Session Wins:${firstSession}`} </p>
        <p>{gameWinner !== "" && `Player 2 Session Wins: ${secondSession}`} </p>
      </header>
    </div>
  );
}

export default App;
