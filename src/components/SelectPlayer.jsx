import React, { useState } from "react";

function SelectPlayer(props) {

  const [isSelected, setSelected] = useState("X");

  const selectPlayer = props.playerFunc;
  const playerSelected = props.playerSel;
  const playerMark = props.mark;

  function handleSelect(e) {
    const selected = e.target;
    let unSelected;

    if(e.target.nextElementSibling != null){
      unSelected = e.target.nextElementSibling;
    } else if(e.target.previousElementSibling != null){
      unSelected = e.target.previousElementSibling;
    }
    
    if(selected.classList.contains("selected-mark")){
      selected.classList.remove("selected-mark");
      unSelected.classList.add("selected-mark");
    }

    if(isSelected != selected.textContent){
      setSelected(selected.textContent);
    }

    playerMark(selected.textContent);
    
  }

  function handlePlayer(){
    selectPlayer();
  }

  return (
    <div className="game-card select-player" style={{ visibility: playerSelected ? "hidden" : "visible" }}>
      <div className="mark-text">
        <div className="mark-text-x">X</div>
        <div className="mark-text-o">O</div>
      </div>
      <div className="player-mark">
        <div className="mark-info">Pick player 1's mark</div>
        <div className="select-mark" onClick={(e) => {handleSelect(e)}}>
          <div className="mark">X</div>
          <div className="mark selected-mark">O</div>
        </div>
        <div className="mark-confirm">Remember: {isSelected} goes first</div>
      </div>
      <div className="player-options">
        <div className="btn-pl player-cpu" onClick={handlePlayer}>New Game (vs CPU)</div>
        <div className="btn-pl player-player" onClick={handlePlayer}>New Game (vs Player)</div>
      </div>
    </div>
  );
}
export default SelectPlayer;
