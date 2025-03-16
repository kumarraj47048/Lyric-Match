import React from 'react';
import './Result.css';

const Result = ({ isCorrect, correctSong, onPlayAgain }) => {
  return (
    <div className={`result-container ${isCorrect ? 'correct' : 'incorrect'}`}>
      {isCorrect ? (
        <div className="correct-result">
          <h2>🎉 Correct! 🎉</h2>
          <p>Great job! You correctly identified:</p>
          <p className="song-title">"{correctSong.title}" by {correctSong.artist}</p>
        </div>
      ) : (
        <div className="incorrect-result">
          <h2>Not quite right...</h2>
          <p>The correct answer was:</p>
          <p className="song-title">"{correctSong.title}" by {correctSong.artist}</p>
        </div>
      )}
      <button className="play-again-button" onClick={onPlayAgain}>
        Play Again
      </button>
    </div>
  );
};

export default Result;
