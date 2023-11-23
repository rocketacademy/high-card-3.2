import { useState, useEffect } from "react";

export default function Button(props){
  let cardDeck = props.cardDeck
  const cardDeckLength = props.cardDeck.length;
  const dealCards = props.dealCards;
  const setCardDeck = props.setCardDeck;
  const makeShuffledDeck = props.makeShuffledDeck;

  const [buttonToggle, setToggle] = useState(
    <button onClick={dealCards}>Deal</button>
  );

  useEffect(()=>{
    if(cardDeckLength == 0){
      console.log("deck empty")
      setToggle(
        (buttonToggle) =>
          (buttonToggle = (
            <button onClick={()=>setCardDeck(makeShuffledDeck)}>Continue</button>
          ))
      );
    }
    else{setToggle(
      (buttonToggle) =>
        (buttonToggle = <button onClick={dealCards}>Deal</button>)
    );}
    // console.log(cardDeck)
  },[cardDeckLength,dealCards])






  return (
  <div>{buttonToggle}</div>
  )
} 