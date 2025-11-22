import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.scss';

function App() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get('https://rickandmortyapi.com/api/character');
        setCharacters(response.data.results);
      } catch (error) {
        console.error('Ошибка при загрузке персонажей:', error);
      }
    };

    fetchCharacters();
  }, []);

  
  const getEpisodeNumber = (episodeUrl) => {
    const match = episodeUrl.match(/\/episode\/(\d+)$/);
    return match ? `Episode ${match[1]}` : 'Unknown';
  };

  return (
    <div className="app">
      <div className="characters-container">
        {characters.map((character) => {
          const firstEpisode = character.episode[0] || '';
          const episodeDisplay = firstEpisode ? getEpisodeNumber(firstEpisode) : 'Unknown';

          return (
            <div key={character.id} className="character-card">
              <img 
                src={character.image} 
                alt={character.name} 
                className="character-image"
                onError={(e) => {
                  e.target.src = 'https://rickandmortyapi.com/api/character/avatar/18.jpeg'; 
                }}
              />
              <div className="character-info">
                <h3 className="character-name">{character.name}</h3>
                <p className={`character-status ${character.status.toLowerCase()}`}>
                  <span className="status-dot"></span>
                  {character.status} — {character.species}
                </p>
                <div className="character-details">
                  <p className="detail-label">Last known location:</p>
                  <p className="detail-value">{character.location.name}</p>
                </div>
                <div className="character-details">
                  <p className="detail-label">First seen in:</p>
                  <p className="detail-value">{episodeDisplay}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
