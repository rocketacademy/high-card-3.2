import logo from "/logo.png";
import "./App.css";
import { makeShuffledDeck } from "./utils.jsx";
import { useState } from "react";
import { Alert, Button, Card, Accordion } from "react-bootstrap";

// Element 0 = player 1 , element 1 = player 2; DONE
// useState winlogic = element 0 > ele 1 ; player 1 winning ;
// - using if else.
// player 1 wins , +1 to counter 1 , player 2 +1 counter2; draw scenario
// noMoreCards = declareWinner + game reset(btn)

function App() {
  const [cardDeck, setCardDeck] = useState(makeShuffledDeck());
  const [currCards, setCurrCards] = useState([]);
  const [winner, setWinner] = useState(null); // is this needed??
  const [player1Win, setPlayer1Win] = useState(0);
  const [player2Win, setPlayer2Win] = useState(0);
  const [draw, setDraw] = useState(0);
  const resetGame = () => {
    setCurrCards([]);
    setCardDeck(makeShuffledDeck());
    setWinner(null);
    setPlayer1Win(0);
    setPlayer2Win(0);
  };

  const dealCards = () => {
    const newCurrCards = [cardDeck.pop(), cardDeck.pop()];
    setCurrCards(newCurrCards);
    let whoWon = 0;

    if (newCurrCards[0].rank > newCurrCards[1].rank) {
      setWinner("Player 1 wins");
      whoWon = 1;
      if (whoWon === 1) {
        setPlayer1Win(player1Win + 1);
      }
      console.log("Player 1 wins");
    } else if (newCurrCards[0].rank === newCurrCards[1].rank) {
      setDraw(draw + 1);
      console.log("Draw");
    } else {
      setWinner("Player 2 wins");
      whoWon = 2;
      if (whoWon === 2) {
        setPlayer2Win(player2Win + 1);
      }
      console.log("Player 2 wins");
    }

    if (cardDeck.length === 0 && player1Win > player2Win) {
      window.alert("Player 1 has won the game!!");
    } else if (cardDeck.length === 0 && player2Win > player1Win) {
      window.alert("Player 2 has won the game!!");
    }
  };

  const currCardElems = currCards.map(({ name, suit }) => (
    <div key={`${name}${suit}`}>
      {name} of {suit}
    </div>
  ));

  return (
    <>
      <div>
        <img src={logo} className="logo" alt="Rocket logo" />
      </div>
      <Accordion defaultActiveKey="0" flush>
        <Accordion.Item eventKey="0">
          <div>
            <Accordion.Header>Player 1 </Accordion.Header>
            <Accordion.Body>Number of Rounds Won: {player1Win}</Accordion.Body>
          </div>
          <div>
            <Accordion.Header>Player 2 </Accordion.Header>
            <Accordion.Body>Number of Rounds Won: {player2Win}</Accordion.Body>
          </div>
          <div>
            <Accordion.Header>Number of Rounds Draw </Accordion.Header>
            <Accordion.Body>{draw}</Accordion.Body>
          </div>
        </Accordion.Item>
      </Accordion>
      <h2>React High Card 🚀</h2>
      Player 1: {currCardElems[0]} <br></br> Player 2: {currCardElems[1]}
      <br />
      <hr></hr>
      <div className="d-grid gap-2">
        <Button variant="outline-success" size="lg" onClick={dealCards}>
          Deal
        </Button>
        <br></br>
        <Button variant="outline-danger" size="sm" onClick={resetGame}>
          Reset
        </Button>
      </div>
    </>
  );
}

export default App;
