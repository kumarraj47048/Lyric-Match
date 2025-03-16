import React, { useState, useEffect } from 'react';
import './App.css';
import LyricDisplay from './components/LyricDisplay';
import GuessInput from './components/GuessInput';
import Result from './components/Result';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const [sessionId, setSessionId] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [guess, setGuess] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // API base URL - change this to match your deployment
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api/game';

  const fetchLyrics = async () => {
    setLoading(true);
    setError('');
    setResult(null);
    setGuess('');
    
    try {
      const response = await fetch(`${API_BASE_URL}/lyrics`);
      const data = await response.json();
      
      if (data.success) {
        setSessionId(data.sessionId);
        setLyrics(data.lyricSnippet);
      } else {
        setError('Failed to generate lyrics. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
      console.error('Error fetching lyrics:', err);
    } finally {
      setLoading(false);
    }
  };

  const checkAnswer = async () => {
    if (!guess.trim()) {
      setError('Please enter your guess first.');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${API_BASE_URL}/check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId, guess }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setResult({
          isCorrect: data.isCorrect,
          correctSong: data.correctSong
        });
      } else {
        setError('Failed to check answer. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
      console.error('Error checking answer:', err);
    } finally {
      setLoading(false);
    }
  };

  // Generate lyrics on first load
  useEffect(() => {
    fetchLyrics();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>🎵 Lyric Match 🎵</h1>
        <p>Guess the song title based on the lyrics!</p>
      </header>
      
      <main className="App-main">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <LyricDisplay lyrics={lyrics} />
            
            <GuessInput 
              guess={guess} 
              setGuess={setGuess} 
              onSubmit={checkAnswer} 
              disabled={loading || !lyrics}
            />
            
            {error && <div className="error-message">{error}</div>}
            
            {result && (
              <Result 
                isCorrect={result.isCorrect} 
                correctSong={result.correctSong} 
                onPlayAgain={fetchLyrics}
              />
            )}
            
            <button 
              className="new-lyrics-button" 
              onClick={fetchLyrics}
              disabled={loading}
            >
              {lyrics ? 'Get New Lyrics' : 'Start Game'}
            </button>
          </>
        )}
      </main>
      
      <footer className="App-footer">
        <p>Created for Pangea Tech coding challenge</p>
      </footer>
    </div>
  );
}

export default App;
