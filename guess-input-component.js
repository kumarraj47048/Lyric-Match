import React from 'react';
import './GuessInput.css';

const GuessInput = ({ guess, setGuess, onSubmit, disabled }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !disabled) {
      onSubmit();
    }
  };

  return (
    