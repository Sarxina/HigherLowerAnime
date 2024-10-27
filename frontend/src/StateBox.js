import React from 'react';

const StateBox = ({currentDifficulty, setDifficulty, score}) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column'
        }}>
            <p style={{color: 'white'}}>Current Score {score}</p>
            <p style={{color: 'white'}}>Current Difficulty: {currentDifficulty}</p>
            <input
                type="text"
                placeholder='Enter Difficulty'
                onChange={setDifficulty}>
            </input>
        </div>
    )
}

export default StateBox
