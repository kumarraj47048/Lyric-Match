const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

// Generate a lyric snippet
router.get('/lyrics', gameController.generateLyricSnippet);

// Check user's guess
router.post('/check', gameController.checkAnswer);

module.exports = router;
