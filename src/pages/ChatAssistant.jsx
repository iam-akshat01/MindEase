import React, { useState, useEffect, useRef } from 'react';
import { sendMessage, getSuggestedStarters } from '../services/chatService';
import { useAuth } from '../context/AuthContext';
import ChatBubble from '../components/ChatBubble';
import Card from '../components/Card';
import { Send, Bot, Lightbulb } from 'lucide-react';

/**
 * AI Chat Assistant page for mental health support
 */
const ChatAssistant = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestedStarters] = useState(getSuggestedStarters());
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize chat with welcome message
  useEffect(() => {
    const welcomeMessage = {
      id: 'welcome',
      message: `Hi ${user.name}! I'm here to support you with your mental wellness journey. Feel free to share what's on your mind, and I'll do my best to help. Remember, I'm here to listen and provide guidance, but for urgent concerns, please reach out to a counselor or crisis helpline.`,
      timestamp: new Date().toISOString(),
      sender: 'ai'
    };
    setMessages([welcomeMessage]);
  }, [user.name]);

  const handleSendMessage = async (messageText = inputMessage.trim()) => {
    if (!messageText) return;

    const userMessage = {
      id: Date.now(),
      message: messageText,
      timestamp: new Date().toISOString(),
      sender: 'user'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setLoading(true);

    try {
      const aiResponse = await sendMessage(messageText, messages);
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Failed to get AI response:', error);
      const errorMessage = {
        id: Date.now() + 1,
        message: "I'm sorry, I'm having trouble responding right now. Please try again in a moment.",
        timestamp: new Date().toISOString(),
        sender: 'ai'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestedStarter = (suggestion) => {
    handleSendMessage(suggestion);
  };

  return (
    <div
      className="max-w-6xl mx-auto px-6 py-8 
                 bg-gradient-to-b from-cyan-50 via-blue-50 to-indigo-100 
                 min-h-screen"
    >
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center space-x-3 mb-3">
          <Bot className="text-purple-600 drop-shadow-sm" size={36} />
          <h1 className="text-3xl font-bold text-gray-900">AI Wellness Assistant</h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          A calming space to talk, reflect, and receive thoughtful guidance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chat area */}
        <div className="lg:col-span-3">
          <Card
            className="flex flex-col h-[650px] rounded-2xl 
                       shadow-lg border border-gray-200 
                       bg-white/70 backdrop-blur-lg"
          >
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 
                            scrollbar-thin scrollbar-thumb-purple-200 
                            scrollbar-track-transparent">
              {messages.map((message) => (
                <ChatBubble key={message.id} message={message} />
              ))}

              {loading && (
                <div className="flex items-center space-x-3 animate-pulse">
                  <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center shadow-sm">
                    <Bot size={16} />
                  </div>
                  <div className="bg-purple-50 text-purple-700 rounded-xl px-4 py-2 shadow-sm">
                    Typing…
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-gray-100 p-4 bg-white/80 rounded-b-2xl backdrop-blur">
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message here..."
                  disabled={loading}
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl 
                             focus:ring-2 focus:ring-purple-500 focus:border-purple-400 
                             disabled:bg-gray-50 transition"
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={loading || !inputMessage.trim()}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 
                             text-white rounded-xl shadow-md hover:shadow-lg 
                             hover:from-purple-600 hover:to-purple-700 
                             disabled:bg-gray-300 disabled:cursor-not-allowed 
                             transition flex items-center space-x-2"
                >
                  <Send size={16} />
                  <span className="hidden sm:inline">Send</span>
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-2 text-right">
                {inputMessage.length}/500
              </p>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Suggested starters */}
          <Card
            title="Getting Started"
            className="rounded-2xl shadow-md border border-gray-100 bg-white/70 backdrop-blur"
          >
            <div className="space-y-2">
              <div className="flex items-center space-x-2 mb-3">
                <Lightbulb className="text-yellow-500" size={16} />
                <span className="text-sm font-medium text-gray-700">Try asking about:</span>
              </div>
              {suggestedStarters.slice(0, 4).map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestedStarter(suggestion)}
                  className="w-full text-left text-sm p-3 rounded-xl 
                             bg-gradient-to-r from-gray-50 to-gray-100 
                             hover:from-purple-50 hover:to-purple-100 
                             text-gray-700 transition shadow-sm"
                >
                  "{suggestion}"
                </button>
              ))}
            </div>
          </Card>

          {/* Tips */}
          <Card
            title="Chat Tips"
            className="rounded-2xl shadow-md border border-gray-100 bg-white/70 backdrop-blur"
          >
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <p>Be honest about your feelings - this is a safe space</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <p>Take your time - there's no rush to respond</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <p>Ask for specific advice or coping strategies</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <p>
                  Remember: this AI provides support, but isn't a replacement for professional help
                  when needed
                </p>
              </div>
            </div>
          </Card>

          {/* Crisis resources */}
          <Card
            title="Crisis Resources"
            className="rounded-2xl shadow-md border border-gray-100 bg-white/70 backdrop-blur"
          >
            <div className="space-y-2 text-sm">
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 shadow-sm">
                <p className="font-medium text-red-800 mb-1">In Crisis?</p>
                <p className="text-red-700 mb-2">
                  If you're having thoughts of self-harm, please reach out immediately:
                </p>
                <div className="space-y-1 text-red-800">
                  <p>• Crisis Text Line: Text HOME to 741741</p>
                  <p>• National Suicide Prevention Lifeline: 988</p>
                  <p>• Emergency Services: 911</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ChatAssistant;
