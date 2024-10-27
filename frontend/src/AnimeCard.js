// src/AnimeCard.js

import React from 'react';

const displayRank = (rank) => {
    if (rank === -1) return '???'
    else return rank
}

const AnimeCard = ({rank, title, image}) => {
    return (
        <div style={{
            width: '50vw',
            height: '100vw',
            overflow: 'hidden',
            position: 'relative',
            fontFamily: "'rooney-sans', sans-serif"
            }}>
            <img
              src={image}
              alt={title}
              style={{width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                      filter: 'brightness(70%)'}}
            />
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                //alignItems: 'center',
                width: '80%'
            }}>
              <h1 style={{color: 'white',
                          fontSize : '62px',
                          fontWeight : '700',
                          textTransform: 'capitalize',
                          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                          margin: '1'
                          }}>{title}</h1>
              <p style={{
                         color: 'yellow',
                         fontSize : '48px',
                         fontWeight : '700',
                         textTransform: 'capitalize',
                         textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                        }}>Rank: {displayRank(rank)}</p>
            </div>
        </div>
    );
};

export default AnimeCard
