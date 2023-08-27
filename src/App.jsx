import React, { useEffect, useState } from "react";
import "./app.css";
import Start from "./components/Start";
import SelectPlayer from "./components/SelectPlayer";
import Board from "./components/Board";

function App() {
  const [startGame, setStart] = useState(false);
  const [playerSelected, setPlayerSelected] = useState(true);
  const [gameStarted, setGameStarted] = useState(true);
  const [chosenMark, setChosenMark] = useState(null);

  // let player1 = "X";
  // let player2 = "O";
  // let count = 0;


  function handleStart() {
    setStart(true);
    setPlayerSelected(false);
    console.log("Game started");
  }
  
  function handlePlayers(){
    setPlayerSelected(true);
    setGameStarted(false);
  }

  let currentPlayer = {
    player: "",
  };

  function handleMark(e){
    
    console.log("player selected -+- e", e);
    currentPlayer.player = e;
    setChosenMark(e);
  
    console.log("player selected -+- pl", currentPlayer.player);
    // const selEl = e;

    // if(player1 != e){
    //   player1 = e;
    //   setPlayers((prevPlayer) => (prevPlayer === "X" ? e : "X"));
    //   console.log("player selected -+-+", player1);
    // }
    
    // if(player1 === "O"){
    //   player2 = "X";
    // } else{
    //   player2 = "O";
    // }

    // console.log("player selected ****", players);
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
        <Board gameFunc={handleGame} gameStart={gameStarted} gameReset={handleReset} playerMark={chosenMark}/>
      </div>
    </div>
  );
}

export default App;
