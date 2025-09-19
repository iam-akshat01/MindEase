// Mock AI chat service - Frontend only implementation

/**
 * Mock AI responses for the chat assistant
 */
const mockResponses = [
  "I understand how you're feeling. It's completely normal to experience ups and downs. Would you like to talk more about what's on your mind?",
  "That sounds challenging. Remember that seeking help is a sign of strength, not weakness. What small step could you take today to feel a bit better?",
  "Thank you for sharing that with me. It takes courage to open up. Have you tried any relaxation techniques like deep breathing or meditation?",
  "I hear you, and your feelings are valid. Sometimes it helps to break big problems into smaller, manageable pieces. What's one thing you could focus on right now?",
  "It's great that you're reaching out for support. That shows real self-awareness. Have you considered talking to a counselor about this?",
  "I'm glad you feel comfortable sharing with me. Remember, this feeling is temporary and you have the strength to get through this. What usually helps you feel more grounded?",
  "That's a very human thing to experience. Sometimes our minds can be our own worst critics. What would you say to a friend who was going through the same thing?"
];

/**
 * Sends a message to the AI assistant (mock implementation)
 * @param {string} message - User's message
 * @param {Array} chatHistory - Previous chat messages
 * @returns {Promise<Object>} AI response
 */
export const sendMessage = async (message, chatHistory = []) => {
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Simple keyword-based responses for better simulation
  let response = mockResponses[Math.floor(Math.random() * mockResponses.length)];

  // Add some context-aware responses
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('anxious') || lowerMessage.includes('anxiety')) {
    response = "I understand that anxiety can feel overwhelming. Try this: Take 5 deep breaths - inhale for 4 counts, hold for 4, exhale for 4. This can help activate your body's relaxation response. Would you like me to guide you through a longer breathing exercise?";
  } else if (lowerMessage.includes('depressed') || lowerMessage.includes('sad')) {
    response = "I'm sorry you're feeling this way. Depression can make everything seem harder, but you're taking a positive step by reaching out. Small actions can make a difference - even just getting sunlight or taking a short walk can help. Are there any activities that usually bring you some joy?";
  } else if (lowerMessage.includes('stress') || lowerMessage.includes('overwhelmed')) {
    response = "Feeling stressed is your mind and body's way of telling you something needs attention. Let's try to break things down: What's the most pressing thing on your mind right now? Sometimes tackling one thing at a time can make everything feel more manageable.";
  } else if (lowerMessage.includes('sleep') || lowerMessage.includes('tired')) {
    response = "Sleep is so important for mental health. Poor sleep can affect mood, concentration, and stress levels. Have you tried establishing a bedtime routine? Things like limiting screen time before bed and keeping a consistent sleep schedule can really help.";
  } else if (lowerMessage.includes('thank you') || lowerMessage.includes('thanks')) {
    response = "You're very welcome! I'm here to support you. Remember, taking care of your mental health is an ongoing journey, and you're doing great by being proactive about it. Is there anything else I can help you with today?";
  }

  return {
    id: Date.now(),
    message: response,
    timestamp: new Date().toISOString(),
    sender: 'ai'
  };
};

/**
 * Gets chat history for a user (mock implementation)
 * @param {number} userId - User ID
 * @returns {Promise<Array>} Chat history
 */
export const getChatHistory = async (userId) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 600));

  // Return empty history for new sessions
  // In a real app, this would fetch from database
  return [];
};

/**
 * Gets suggested conversation starters
 * @returns {Array} Array of suggested messages
 */
export const getSuggestedStarters = () => {
  return [
    "I'm feeling overwhelmed with school work",
    "I've been having trouble sleeping lately",
    "I'm feeling anxious about upcoming exams",
    "I don't know how to manage my stress",
    "I'm feeling lonely and isolated",
    "I want to improve my mental health habits"
  ];
};