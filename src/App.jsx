import logo from "/logo.png";
import "./App.css";
import { makeShuffledDeck } from "./utils.jsx";
import { useState } from "react";
import Score from "./Score.jsx"

function App() {
  // Set default value of card deck to new shuffled deck
  const [cardDeck, setCardDeck] = useState(makeShuffledDeck());
  // currCards holds the cards from the current round
  const [currCards, setCurrCards] = useState([]);

  const dealCards = () => {
    const players = ["Player 1", "Player 2"]
    const newCurrCards = [cardDeck.pop(), cardDeck.pop()];
    for (let i = 0; i<players.length; i++){
      newCurrCards[i].player = players[i]
    }
    console.log("New Current Cards: ",newCurrCards)
    setCurrCards(newCurrCards);
  };
  // You can write JavaScript here, just don't try and set your state!


  //solely to debug, apparently if you try to access a value of an undefined object js crashes. 
  if (currCards[0]){
    console.log("Player one card: ",currCards[0])
    console.log("Player two card: ",currCards[1])
  }
  else{console.log("no current cards yet")}



  // You can access your current components state here, as indicated below
  const currCardElems = currCards.map(({ name, suit, player }) => (
    // Give each list element a unique key
    <div key={`${name}${suit}`}>
      <p>
        {player}'s card:&nbsp; {name} of {suit}
      </p>
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
        <br />
        <button onClick={dealCards}>Deal</button>
        <Score dealtCards={currCards} cardDeck={cardDeck}/>
      </div>
    </>
  );
}

export default App;
