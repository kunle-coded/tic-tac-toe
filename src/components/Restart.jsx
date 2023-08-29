import React from 'react';

function Restart(props) {

    return (
        <div className="restart popup" style={{ visibility: props.restart ? "visible" : "hidden" }}>    
            <div className="restart-card popup-content">
                <div className="restart-title">
                    <h1>Restart Game?</h1>
                </div>
                <div className="win-buttons">
                    <div className="btn btn-quit" onClick={props.cancelRestart}>No, Cancel</div>
                    <div className="btn btn-next" onClick={props.globalReset}>Yes, Restart</div>
                </div>
            </div>
        </div>
    );
}

export default Restart;