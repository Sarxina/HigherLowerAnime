import React from 'react';

const restartGame = (setGameOver, setScore) => {
    setScore(0);
    setGameOver(false)
}

const GameOverScreen = ({gameOver, setGameOver, score, setScore}) => {
    return (
        <div style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)', /* Dark overlay */
            color: 'white'
        }}>
            <h2>Game Over!</h2>
            <p>Your final score is {score}</p>
            <button onClick={() => restartGame(setGameOver, setScore)}>Retry</button>
        </div>
    );
}

export default GameOverScreen;
