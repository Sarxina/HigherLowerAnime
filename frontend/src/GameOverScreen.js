import React from 'react';

const GameOverScreen = ({gameOver, setGameOver, score, setScore, startGame}) => {
    return (
        <div style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)', /* Dark overlay */
            color: 'white'
        }}>
            <h2>Game Over!</h2>
            <p>Your final score is {score}</p>
            <button onClick={startGame}>Retry</button>
        </div>
    );
}

export default GameOverScreen;
