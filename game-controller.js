const LLMService = require('../services/llmService');
const songData = require('../data/songs');

// In-memory cache to store current song for each session
// In a production app, you'd use Redis or a similar solution
const sessionSongs = new Map();

// Generate a lyric snippet
exports.generateLyricSnippet = async (req, res) => {
  try {
    // Generate a session ID or use an existing one
    const sessionId = req.query.sessionId || Date.now().toString();
    
    // Select a random song from our database
    const randomIndex = Math.floor(Math.random() * songData.songs.length);
    const selectedSong = songData.songs[randomIndex];
    
    // Store the selected song for this session
    sessionSongs.set(sessionId, selectedSong);
    
    // Generate lyrics using the LLM
    const lyricsPrompt = `Generate a short, recognizable snippet (2-4 lines) of lyrics from the song "${selectedSong.title}" by ${selectedSong.artist}. Do not include the song title or artist name in the lyrics. Only return the lyric snippet, nothing else.`;
    
    const lyricSnippet = await LLMService.generateContent(lyricsPrompt);
    
    return res.status(200).json({
      success: true,
      sessionId,
      lyricSnippet
    });
  } catch (error) {
    console.error('Error generating lyrics:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to generate lyrics',
      error: error.message
    });
  }
};

// Check if user's guess matches the song title
exports.checkAnswer = async (req, res) => {
  try {
    const { sessionId, guess } = req.body;
    
    if (!sessionId || !sessionSongs.has(sessionId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired session'
      });
    }
    
    const correctSong = sessionSongs.get(sessionId);
    
    // Use the LLM to determine if the guess is correct
    // This approach handles variations in spelling, formatting, etc.
    const checkPrompt = `Compare the following two song titles and determine if they refer to the same song. Just respond with "yes" if they match, or "no" if they don't match. Consider variations, abbreviations, and common misspellings:
    Correct title: "${correctSong.title}"
    User's guess: "${guess}"`;
    
    const llmResponse = await LLMService.generateContent(checkPrompt);
    const isCorrect = llmResponse.toLowerCase().includes('yes');
    
    // Clear the session data after the guess
    if (isCorrect) {
      sessionSongs.delete(sessionId);
    }
    
    return res.status(200).json({
      success: true,
      isCorrect,
      correctSong: isCorrect ? correctSong : correctSong
    });
  } catch (error) {
    console.error('Error checking answer:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to check answer',
      error: error.message
    });
  }
};
