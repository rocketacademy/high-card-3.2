import logo from "/logo.png";
import "./App.css";
import Game from "./Game.jsx";

function App(props) {
  return (
    <>
      <div>
        <img src={logo} className="logo" alt="Rocket logo" />
      </div>
      <Game />
    </>
  );
}

export default App;
