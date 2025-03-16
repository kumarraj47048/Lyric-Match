import React from 'react';
import './GuessInput.css';

const GuessInput = ({ guess, setGuess, onSubmit, disabled }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !disabled) {
      onSubmit();
    }
  };

  return (
    <div className="guess-input-container">
      <input
        type="text"
        className="guess-input"
        placeholder="Enter song title..."
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
      />
      <button 
        className="check-button"
        onClick={onSubmit}
        disabled={disabled || !guess.trim()}
      >
        Check Answer
      </button>
    </div>
  );
};

export default GuessInput;
