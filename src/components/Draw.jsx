import React from "react";

function Draw(props) {

    const drawGame = props.draw;
    const nextRound = props.nextRound;
    const gameReset = props.globalReset;

    function resetGame(){
        gameReset();
    }

    function goToNextRound(){
        nextRound();
    }

    return (
        <div className="draw popup" style={{ visibility: drawGame ? "visible" : "hidden" }}>
            <div className="draw-card popup-content">
                <div className="win-title">
                    <h1>It's a Draw</h1>
                </div>
                <div className="win-buttons">
                <div className="btn btn-quit" onClick={resetGame}>Quit</div>
                <div className="btn btn-next" onClick={goToNextRound}>Next round</div>
                </div>
            </div>
        </div>
    );
}

export default Draw;