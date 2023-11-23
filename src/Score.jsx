import { useEffect, useState } from "react";

export default function Score(props) {
  let dealtCards = props.dealtCards;
  let cardDeckLength = props.cardDeck.length;
  const [player1Score, add1Score] = useState(0);
  const [player2Score, add2Score] = useState(0);
  const [currWinner, setWin] = useState("");
  useEffect(() => {
    if (dealtCards[0]?.rank > dealtCards[1]?.rank) {
      add1Score(() => player1Score + 1);
    } else if (dealtCards[0]?.rank < dealtCards[1]?.rank) {
      add2Score(() => player2Score + 1);
    }
  }, [dealtCards]);

  useEffect(() => {
    console.log("cardDeckLength: ", cardDeckLength);
    console.log("current winner: ", currWinner);
    
    if (cardDeckLength == 0){
      setWin((currWinner)=> {
        if(player1Score>player2Score){
          return `Winner: ${(currWinner = dealtCards[0]?.player)}`;
        }
        else if(player2Score>player1Score){
          return `Winner: ${(currWinner = dealtCards[1]?.player)}`;
        }
      })
    }

  },[cardDeckLength,currWinner,dealtCards,player1Score,player2Score])

  console.log("dealtCards: ", dealtCards);
  

  return (
    <div>
      <h3>{currWinner}</h3>
      <p>
        Player 1 score: {player1Score} | Player 2 score: {player2Score}
      </p>
    </div>
  );
}