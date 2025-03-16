const Groq = require('groq-sdk');

// Initialize the Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

class LLMService {
  static async generateContent(prompt) {
    try {
      const completion = await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: prompt,
          }
        ],
        model: "llama3-70b-8192",  // You can change to your preferred model
      });

      return completion.choices[0]?.message?.content || 'No response from LLM';
    } catch (error) {
      console.error('Error calling Groq API:', error);
      throw new Error(`LLM service error: ${error.message}`);
    }
  }
}

module.exports = LLMService;
