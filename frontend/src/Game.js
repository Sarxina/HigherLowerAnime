// src/Game.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AnimeCard from './AnimeCard';
import StateBox from './StateBox';
import GameOverScreen from './GameOverScreen';

const Game = () => {
  // Move state variables inside the component
  const [currentAnime, setCurrentAnime] = useState(null);
  const [nextAnime, setNextAnime] = useState(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [difficulty, setDifficulty] = useState(100)

  // Define functions and hooks before the return statement
  const fetchAnime = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/anime/random');
      return response.data;
    } catch (error) {
      console.error('Error fetching anime', error);
      return null;
    }
  };

  useEffect(() => {
    const startGame = async () => {
      const firstAnime = await fetchAnime();
      const secondAnime = await fetchAnime();
      setCurrentAnime(firstAnime);
      setNextAnime(secondAnime);
    };
    startGame();
  }, []);

  const handleGuess = async (guess) => {
    const isCorrect =
      (guess === 'higher' && nextAnime.rank < currentAnime.rank) ||
      (guess === 'lower' && nextAnime.rank > currentAnime.rank);

    if (isCorrect) {
      setScore(score + 1);
      setCurrentAnime(nextAnime);
      const newAnime = await fetchAnime();
      setNextAnime(newAnime);
    } else {
      setGameOver(true);
    }
  };

  const getTitle = (anime) => {
    if (anime.title_english) return anime.title_english
    else if (anime.title) return anime.title
    else return 'Could Not Find Title :('
  }

  const renderGameOver = () => {
    return (
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        alignContent: 'center'
      }}>
        <GameOverScreen
        gameOver={gameOver}
        setGameOver={setGameOver}
        score={score}
        setScore={setScore}/>
      </div>
    )
  }

  const renderGame = () => (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      position: 'relative'
    }}>
      {/* The container for the two sides */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        position: 'absolute'
      }}>
        {/* left side */}
        <div>
          <AnimeCard
            rank={currentAnime.rank}
            image={currentAnime.images.webp.large_image_url}
            title={getTitle(currentAnime)}/>
        </div>
        {/* right side */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          position : 'relative',
          height : '100%',
        }}>
          <div>
            <AnimeCard
              rank={'???'}
              image={nextAnime.images.webp.large_image_url}
              title={getTitle(nextAnime)}/>
          </div>
          <div style={{
            position : 'absolute',
            display: 'flex',
            alignItems: 'center',
            height: '33%',
            width: '100%',
            justifyContent: 'center',
            padding: '0 5%',
            boxSizing: 'border-box'
          }}>
            <button style={{ flex: '1', margin: '10px', fontSize: '88px'}} onClick={() => handleGuess('higher')}>Higher</button>
            <button style={{ flex: '1', margin: '10px', fontSize: '32px'}} onClick={() => handleGuess('lower')}>Lower</button>
          </div>
        </div>
      </div>
      <div style={{
        position: 'absolute',
        display: 'flex',
        alignItems : 'center',
        justifyContent : 'center',
        width : '100%'
      }}>
        <StateBox currentDifficulty={difficulty} setDifficulty={setDifficulty} score={score} />
      </div>
    </div>
  );

  // Single return statement at the end
  return (
    <div>
      <div>
        { !currentAnime || !nextAnime
          ? <div>Loading...</div>
          : renderGame()}
      </div>
      {gameOver
      ? renderGameOver()
      : null
     }
    </div>
  );
};

export default Game;

// Will get back to this
{/* <div>
<p>
  Is "{nextAnime.title_english}" ranked higher or lower than "{currentAnime.title_english}"?
</p>

</div> */}
