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

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

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

    // Create user message
    const userMessage = {
      id: Date.now(),
      message: messageText,
      timestamp: new Date().toISOString(),
      sender: 'user'
    };

    // Add user message to chat
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setLoading(true);

    try {
      // Get AI response
      const aiResponse = await sendMessage(messageText, messages);
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Failed to get AI response:', error);
      // Add error message
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
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center space-x-3 mb-2">
          <Bot className="text-purple-600" size={32} />
          <h1 className="text-2xl font-bold text-gray-900">AI Wellness Assistant</h1>
        </div>
        <p className="text-gray-600">
          A safe space to talk about your feelings and get personalized support
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chat area */}
        <div className="lg:col-span-3">
          <Card className="flex flex-col h-[600px]">
            {/* Messages area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <ChatBubble key={message.id} message={message} />
              ))}
              
              {/* Loading indicator */}
              {loading && (
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center">
                    <Bot size={16} />
                  </div>
                  <div className="bg-gray-100 rounded-2xl px-4 py-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="border-t border-gray-200 p-4">
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message here..."
                  disabled={loading}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-50"
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={loading || !inputMessage.trim()}
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                >
                  <Send size={16} />
                  <span className="hidden sm:inline">Send</span>
                </button>
              </div>
              
              {/* Character count */}
              <p className="text-xs text-gray-500 mt-2 text-right">
                {inputMessage.length}/500
              </p>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Suggested starters */}
          <Card title="Getting Started">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 mb-3">
                <Lightbulb className="text-yellow-500" size={16} />
                <span className="text-sm font-medium text-gray-700">Try asking about:</span>
              </div>
              
              {suggestedStarters.slice(0, 4).map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestedStarter(suggestion)}
                  className="w-full text-left text-sm p-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-gray-700"
                >
                  "{suggestion}"
                </button>
              ))}
            </div>
          </Card>

          {/* Tips */}
          <Card title="Chat Tips">
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>Be honest about your feelings - this is a safe space</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>Take your time - there's no rush to respond</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>Ask for specific advice or coping strategies</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>Remember: this AI provides support, but isn't a replacement for professional help when needed</p>
              </div>
            </div>
          </Card>

          {/* Crisis resources */}
          <Card title="Crisis Resources">
            <div className="space-y-2 text-sm">
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
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