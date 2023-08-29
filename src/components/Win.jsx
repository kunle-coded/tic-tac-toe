import React from "react";

function Win(props) {
    const gameWon = props.win;
    const nextRound = props.nextRound;
    const gameReset = props.globalReset;

    function resetGame(){
        gameReset();
    }

    function goToNextRound(){
        nextRound();
    }

    return (
        <div className="win popup" style={{ visibility: gameWon ? "visible" : "hidden" }}>
            <div className="win-card popup-content">
                <div className="win-info">You won!</div>
                <div className="win-title">
                    <h1>{props.winner} Takes the round</h1>
                </div>
                <div className="win-buttons">
                <div className="btn btn-quit" onClick={resetGame}>Quit</div>
                <div className="btn btn-next" onClick={goToNextRound}>Next round</div>
                </div>
            </div>
        </div>
    );
}

export default Win;