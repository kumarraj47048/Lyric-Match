import React from 'react';
import './LyricDisplay.css';

const LyricDisplay = ({ lyrics }) => {
  if (!lyrics) {
    return <div className="lyric-placeholder">Click "Start Game" to begin!</div>;
  }

  return (
    <div className="lyric-display">
      <div className="lyric-container">
        <div className="quote-mark left">"</div>
        <p className="lyric-text">{lyrics}</p>
        <div className="quote-mark right">"</div>
      </div>
    </div>
  );
};

export default LyricDisplay;
