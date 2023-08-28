import React, { useEffect, useRef, useState } from "react";

function Board(props) {

  const [playerMark, setPlayerMark] = useState("X");
  const [player1, setPlayer1] = useState("X");
  const [player2, setPlayer2] = useState("O");
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [drawScore, setDrawScore] = useState(0);

  const chosenMark = props.playerMark;

  useEffect(() => {
    if(chosenMark != null){
      setPlayerMark("O");
      setPlayer1("O");
      setPlayer2("X");
    }
  }, [chosenMark]);


  const gameStarted = props.gameStart;
  let moves = 0;
  const resetRef = useRef(null);
  // const player1 = "X";
  // const player2 = "O";

  function resetGame(){
    props.gameReset();

    // Delete or marked square on reset
    const element = resetRef.current;
    const squareElements = element.childNodes;
    
    squareElements.forEach(el => {
      if(el.textContent != ""){
        el.textContent = "";
      }
      el.classList.remove("mark-cross", "mark-circle");
      el.classList.remove("winning-crosses", "winning-circles");
    })

    if(chosenMark != null){
      setPlayerMark("O");
    } else {
      setPlayerMark("X");
    }

    // Reset scores
    setPlayer1Score(0);
    setPlayer2Score(0);
    setDrawScore(0);

  }

  useEffect(() => {
    if(props.resetGlobal){
      resetGame();
    }
  }, [props.resetGlobal]);

    
    function checkWinner(player){
      
      // Check for a win
      const element = resetRef.current;
      const squareElements = element.childNodes;
      
      const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
      ];

    // Check for a win
    if ((squareElements[0].textContent === player && squareElements[1].textContent === player &&
    squareElements[2].textContent === player) || (squareElements[3].textContent === player &&
    squareElements[4].textContent === player && squareElements[5].textContent === player) || (squareElements[6].textContent === player && squareElements[7].textContent === player &&
    squareElements[8].textContent === player) || (squareElements[0].textContent === player &&
    squareElements[3].textContent === player && squareElements[6].textContent === player) || (squareElements[1].textContent === player && squareElements[4].textContent === player &&
    squareElements[7].textContent === player) || (squareElements[2].textContent === player &&
    squareElements[5].textContent === player && squareElements[8].textContent === player) ||
    (squareElements[0].textContent === player && squareElements[4].textContent === player && squareElements[8].textContent === player) || squareElements[2].textContent === player &&
    squareElements[4].textContent === player && squareElements[6].textContent === player) {

      props.gameWon();

    // Check each winning combination
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        squareElements[a].textContent === player &&
        squareElements[b].textContent === player &&
        squareElements[c].textContent === player
      ) {
        // isWinner = true;

        // Apply the winning classes only to the squares in the winning combination
        combination.forEach(index => {
          const el = squareElements[index];
          if (player === "X") {
            el.classList.add("winning-crosses");
          } else {
            el.classList.add("winning-circles");
          }
        });
    }
    }
      
      // Add score to winner
      if(player === player1){
        setPlayer1Score(player1Score + 1);
      } else {
        setPlayer2Score(player2Score + 1);
      }

      props.winner(player);

      console.log(`${player} wins!`);
      return true;
    }
  }


  function checkDraw(){
    // Check for a draw
    const element = resetRef.current;
    const squareElements = element.childNodes;

    squareElements.forEach((el, index) => {
      // console.log("index", index);
      console.log("moves", moves);
      if(el.textContent != ""){
        moves++;

        if(moves === 9){
        // Add score to draw
        setDrawScore(drawScore + 1);
        props.drawGame();
        console.log("Draw! 😬");

      }
      }
      
    })
  }

  function nextRound(){
    console.log("Next round");
  }

  function playerMove(e){

    const cell = e.target;


    if (cell.textContent) {
      // Abort function execution
      return;
    }

    // cell.textContent = playerMark;
    cell.textContent = playerMark;
      
    if(cell.textContent === "X"){
      cell.classList.add("mark-cross");
    } else { 
      cell.classList.add("mark-circle");
    }
      

    // Check for a win or draw
    if (checkWinner(playerMark)) {
      alert(`${playerMark} wins!`);
      // resetGame();
    } else if (checkDraw()) {
      alert("It's a draw!");
      resetGame();
    } else {
      // currentPlayer = currentPlayer === "X" ? "O" : "X";

      setPlayerMark((prevPlayer) => (prevPlayer === "X" ? "O" : "X"));
    }
  
  }

  return (
    <div className="game-card board" style={{ visibility: gameStarted ? "hidden" : "visible" }}>
      <div className="game-options">
        <div className="marks">
          <div className="marks-x">X</div>
          <div className="marks-o">O</div>
        </div>
        <div className="game-turn">
          {playerMark} Turn
        </div>
        <div className="game-reset" onClick={resetGame}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="0.6em"
            viewBox="0 0 512 512"
          >
            <path
              fill="#192a32"
              d="M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z"
            />
          </svg>
        </div>
      </div>
      <div ref={resetRef} className="square-container" onClick={playerMove}>
          <div className="square square-one"></div>
          <div className="square square-two"></div>
          <div className="square square-three"></div>
          <div className="square square-four"></div>
          <div className="square square-five"></div>
          <div className="square square-six"></div>
          <div className="square square-seven"></div>
          <div className="square square-eight"></div>
          <div className="square square-nine"></div>
      </div>
      <div className="score-card">
        <div className="player--one-score score-btn">
          <div className="score-text">{player1} (You)</div>
          <div className="scores">{player1Score}</div>
        </div>
        <div className="draw-score score-btn">
          <div className="score-text">Ties</div>
          <div className="scores">{drawScore}</div>
        </div>
        <div className="player--two-score score-btn">
          <div className="score-text">{player2} (CPU)</div>
          <div className="scores">{player2Score}</div>
        </div>
      </div>
    </div>
  );
}

export default Board;
