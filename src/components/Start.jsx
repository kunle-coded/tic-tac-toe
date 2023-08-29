import React, { useEffect, useState } from "react";

function Start(props) {
  const startGame = props.startFunc;

  function handlePlay() {
    startGame();
  }

  return (
    <div
      style={{ visibility: props.start ? "hidden" : "visible" }}
      className="game-card start"
    >
      <div className="start-title">
        <h1>Tic Tac Toe</h1>
      </div>
      <div className="start-marks">
        <div className="start-cross">X</div>
        <div className="start-circle">O</div>
      </div>
      <div className="start-play" onClick={handlePlay}>
        Play
      </div>
    </div>
  );
}

export default Start;
