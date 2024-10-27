import React from 'react';

const StateBox = ({currentDifficulty, setDifficulty, score}) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            fontFamily: "'rooney-sans', sans-serif",
            fontWeight : '700',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', /* Dark overlay */
            textShadow: `
            1px 1px 0 black, -1px 1px 0 black, 1px -1px 0 black, -1px -1px 0 black,  // Stroke effect
            2px 2px 4px rgba(0, 0, 0, 0.5)`
        }}>
            <p style={{color: 'white', fontSize: '20px', margin: '10px'}}>Current Score {score}</p>
            <p style={{color: 'white', fontSize: '20px', margin: '10px'}}>Current Difficulty: {currentDifficulty}</p>
            <input
                type="text"
                placeholder='Enter Difficulty'
                onChange={(e) => setDifficulty(e.target.value)}>
            </input>
        </div>
    )
}

export default StateBox
