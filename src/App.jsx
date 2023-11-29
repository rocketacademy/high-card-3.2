import logo from "/logo.png";
import "./App.css";
import { makeShuffledDeck } from "./utils.jsx";
import { useState } from "react";

function App(props) {
  // Set default value of card deck to new shuffled deck
  const [cardDeck, setCardDeck] = useState(makeShuffledDeck());
  //default value of cardDeck is an array of card objects with the keys "name" , "suit"  and "rank".
  // currCards holds the cards from the current round
  const [currCards, setCurrCards] = useState([]);
  const [game_over, setGameOver] = useState(false);
  const [tally_of_draws, setTallyOfDraws] = useState(1);
  const [player1roundwins, setPlayer1RoundWins] = useState(0);
  const [player2roundwins, setPlayer2RoundWins] = useState(0);

  const dealCards = () => {
    const newCurrCards = [cardDeck.pop(), cardDeck.pop()];
    setTallyOfDraws((prevTallyOfDraws) => prevTallyOfDraws + 1);
    setCurrCards(newCurrCards);

    //Every time the dealCards event handler is run, an array with two card objects is assigned to currCards.
    //check to see if I'm trying to draw more than the number of cards in a deck every time more cards are added to currCards.

    //if there are 2 players, the number of times a person can draw a card is 52/2.
    //if the tally_of_draws reaches 26, check to see who won the most number of rounds.
    checkRoundWinner();

    //reset game if we've reached the end.
    //announce winner of the entire gaeme
    if (tally_of_draws === 26) {
      //console.log(cardDeck);
      setGameOver((prevGamestate) => !prevGamestate);
      //In order to start a new game, have to reset all the States back to their default.
    }
  };

  const resetEverything = () => {
    setCardDeck(makeShuffledDeck());
    //default value of cardDeck is an array of card objects with the keys "name" , "suit"  and "rank".
    // currCards holds the cards from the current round
    setCurrCards([]);
    setGameOver(false);
    setTallyOfDraws(1);
    setPlayer1RoundWins(0);
    setPlayer2RoundWins(0);
  };

  const checkRoundWinner = () => {
    let currentHighestRank = 0;
    let roundwinner = 0;
    for (let i = 0; i < currCards.length; i++) {
      if (currCards[i]["rank"] > currentHighestRank) {
        roundwinner = i + 1;
        currentHighestRank = currCards[i]["rank"];
      }
    }

    //Announce the winner:
    if (roundwinner === 1) {
      setPlayer1RoundWins((prevPlayer1RoundWins) => prevPlayer1RoundWins + 1);
      console.log("player1roundwins", player1roundwins);
    } else {
      setPlayer2RoundWins((prevPlayer2RoundWins) => prevPlayer2RoundWins + 1);
      console.log("player2roundwins", player2roundwins);
    }

    //Don't make an alert announcing the win if there's no winner:
    if (roundwinner !== 0) {
      alert(`Player ${roundwinner} is the winner of this round!`);
    }
  };

  // You can write JavaScript here, just don't try and set your state!

  // You can access your current components state here, as indicated below
  const currCardElems = currCards.map(({ name, suit }, index) => (
    //the function that was passed into map deconstructs the currCards array into two variables, name and suit, and passes that into a div element. It does this for the number of elements in currCards.

    // Give each list element a unique key
    <>
      <p>Player {`${index + 1}'s card:`}</p>
      <div key={`${name}${suit}`}>
        {name} of {suit}
      </div>
    </>
  ));

  return (
    <>
      <div>
        <img src={logo} className="logo" alt="Rocket logo" />
      </div>
      <div className="card">
        <h2>React High Card 🚀</h2>
        {currCardElems}
        <br />

        <br />
        {game_over ? (
          <>
            {player1roundwins > player2roundwins ? (
              <p>🎉🎉Player 1 wins!🎉🎉</p>
            ) : player1roundwins < player2roundwins ? (
              <p>🎉🎉Player 2 wins!🎉🎉</p>
            ) : (
              <p>😔 Nobody wins. 😔</p>
            )}
            <button onClick={resetEverything}>Restart</button>
          </>
        ) : (
          <button onClick={dealCards}>Deal</button>
        )}

        <br />
      </div>
    </>
  );
}

export default App;
