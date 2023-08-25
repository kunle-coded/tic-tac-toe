import React, { useState } from "react";
import "./app.css";
import Start from "./components/Start";
import SelectPlayer from "./components/SelectPlayer";
import Board from "./components/Board";

function App() {
  const [startGame, setStart] = useState(false);
  const [playerSelected, setPlayerSelected] = useState(true);
  const [gameStarted, setGameStarted] = useState(true);
  const [playerMark, setMark] = useState("");
  const [players, setPlayers] = useState({
    player1: {name: "Player 1", mark: "X"},
    player2: {name: "Player 2", mark: "O"},
  })

  function handleStart() {
    setStart(true);
    setPlayerSelected(false);
    console.log("Game started");
  }
  
  function handlePlayers(){
    setPlayerSelected(true);
    setGameStarted(false);
    console.log("Player selected", players.player1.mark);
  }

  function handleMark(e){
    if(players.player1.mark != e){
      players.player1.mark = e;
    }

    if(players.player1.mark === "O"){
      players.player2.mark = "X";
    } else{
      players.player2.mark = "O";
    }
    console.log("Player 1 mark selected", players.player1.mark);
    console.log("Player 2 mark selected", players.player2.mark);
  }

  function handleGame(){
    setGameStarted(true);
    console.log("Player selected");
  }
  
  function handleReset(){
    setStart(false);
    setPlayerSelected(true);
    setGameStarted(true);
    console.log("Game reset");

  }

  return (
    <div className="App">
      <div className="container">
        <Start startFunc={handleStart} start={startGame} />
        <SelectPlayer playerFunc={handlePlayers} playerSel={playerSelected} mark={handleMark}/>
        <Board gameFunc={handleGame} gameStart={gameStarted} gameReset={handleReset} playerState={players}/>
      </div>
    </div>
  );
}

export default App;
