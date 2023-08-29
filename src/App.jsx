import React, { useEffect, useState } from "react";
import "./app.css";
import Start from "./components/Start";
import SelectPlayer from "./components/SelectPlayer";
import Board from "./components/Board";
import PortalWrapper from "./components/PortalWrapper";
import Win from "./components/Win";
import Draw from "./components/Draw";
import Restart from "./components/Restart";

function App() {
  const [startGame, setStart] = useState(false);
  const [playerSelected, setPlayerSelected] = useState(true);
  const [gameStarted, setGameStarted] = useState(true);
  const [chosenMark, setChosenMark] = useState(null);
  const [win, setWin] = useState(false);
  const [draw, setDraw] = useState(false);
  const [resets, setResets] = useState(false);
  const [winner, setWinner] = useState(null);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [drawScore, setDrawScore] = useState(0);
  const [ref, setRef] = useState(null);
  const [restart, setRestart] = useState(false);

  const scoresData = {
    player1: player1Score,
    player2: player2Score,
    draw: drawScore,
  };

  // let player1 = "X";
  // let player2 = "O";
  // let count = 0;


  function handleStart() {
    setStart(true);
    setPlayerSelected(false);
  }
  
  function handlePlayers(){
    setPlayerSelected(true);
    setGameStarted(false);
  }


  function handleMark(e){
    setChosenMark(e); 
  }
  

  function handleRestart(){
    setRestart(true);
  }

  function handleCancel(){
    setRestart(false);
  }
  
  function handleReset(){
    setStart(false);
    setPlayerSelected(true);
    setGameStarted(true);
    setWin(false);
    setDraw(false);
    setRestart(false);
    setChosenMark(prevState => prevState);

  }

  function handleWin(){
    setWin(true);
  }

  function handleDraw(){
    setDraw(true);
    setDrawScore(drawScore + 1);
  }

  function handleScore(){
    setPlayer1Score(0);
    setPlayer2Score(0);
    setDrawScore(0);
  }

  function updateScore(player1, player2, player){
    if(player1 === player){
      setPlayer1Score(player1Score + 1);
    } else if(player2 === player) {
      setPlayer2Score(player2Score + 1);
    } else {
      setDrawScore(drawScore + 1);
    }
  }

  function getRef(ref){
    setRef(ref);
  }

  function clearBoard(refs){
    const element = refs.current;
    const squareElements = element.childNodes;

    squareElements.forEach(el => {
      if(el.textContent !== ""){
        el.textContent = "";
      }
      el.classList.remove("mark-cross", "mark-circle");
      el.classList.remove("winning-crosses", "winning-circles");
    })
  }

  function handleNextRound(){
    // setResets(true);
    setWin(false);
    setDraw(false);
    clearBoard(ref);
  }

  function handleGlobalReset(){
    setResets(true);
    clearBoard(ref);
    handleReset();
    // setChosenMark(null);
    handleScore();
  }

  function handleWinner(winner){
    setWinner(winner);
  }

  return (
    <div className="App">
      <div className="container">
        <Start startFunc={handleStart} start={startGame} />
        <SelectPlayer playerFunc={handlePlayers} playerSel={playerSelected} mark={handleMark}/>
        <Board gameStart={gameStarted} playerMark={chosenMark} gameWon={handleWin} drawGame={handleDraw} winner={handleWinner} scoreUpdate={updateScore} scores={scoresData}  getRef={getRef} restartGame={handleRestart}/>
        {win && (
        <PortalWrapper>
          <Win win={win} nextRound={handleNextRound} globalReset={handleGlobalReset} winner={winner}/>
        </PortalWrapper>
      )}
        {draw && (
        <PortalWrapper>
           <Draw draw={draw} nextRound={handleNextRound} globalReset={handleGlobalReset} />
        </PortalWrapper>
      )}
        {restart && (
        <PortalWrapper>
           <Restart restart={restart} cancelRestart={handleCancel} globalReset={handleGlobalReset} />
        </PortalWrapper>
      )}
      </div>
    </div>
  );
}

export default App;
