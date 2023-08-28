import React from "react";

function Draw(props) {

    const drawGame = props.draw;

    return (
        <div className="draw" style={{ visibility: drawGame ? "visible" : "hidden" }}>
            <div className="draw-card">
                <h1>Draw!</h1>
                <button onClick={props.resetGame}>Play Again</button>
            </div>
        </div>
    );
}

export default Draw;