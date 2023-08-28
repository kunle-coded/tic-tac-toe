import React, { useEffect, useState } from "react";
import "./app.css";
import Start from "./components/Start";
import SelectPlayer from "./components/SelectPlayer";
import Board from "./components/Board";
import PortalWrapper from "./components/PortalWrapper";
import Win from "./components/Win";
import Draw from "./components/Draw";

function App() {
  const [startGame, setStart] = useState(false);
  const [playerSelected, setPlayerSelected] = useState(true);
  const [gameStarted, setGameStarted] = useState(true);
  const [chosenMark, setChosenMark] = useState(null);
  const [win, setWin] = useState(false);
  const [draw, setDraw] = useState(false);
  const [resets, setResets] = useState(false);
  const [winner, setWinner] = useState(null);

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
   
  }
  

  function handleGame(){
    setGameStarted(true);
    console.log("Player selected");
  }
  
  function handleReset(){
    setStart(false);
    setPlayerSelected(true);
    setGameStarted(true);
    setWin(false);
    setDraw(false);
    console.log("Game reset");

  }

  function handleWin(){
    setWin(true);
    console.log("Winner! 🎉");
    console.log("Win state", win);
  }

  function handleDraw(){
    setDraw(true);
  }

  function handleGlobalReset(){
    setResets(true);
  }

  function handleWinner(winner){
    setWinner(winner);
  }

  return (
    <div className="App">
      <div className="container">
        <Start startFunc={handleStart} start={startGame} />
        <SelectPlayer playerFunc={handlePlayers} playerSel={playerSelected} mark={handleMark}/>
        <Board gameFunc={handleGame} gameStart={gameStarted} gameReset={handleReset} playerMark={chosenMark} gameWon={handleWin} drawGame={handleDraw} resetGlobal={resets} winner={handleWinner}/>
        {win && (
        <PortalWrapper>
          <Win win={win} resetGame={handleGlobalReset} winner={winner}/>
        </PortalWrapper>
      )}
      </div>
      <Draw draw={draw} resetGame={handleReset} />
    </div>
  );
}

export default App;
