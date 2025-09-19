import React from 'react';
import { User, Bot } from 'lucide-react';

/**
 * Chat bubble component for messages
 * @param {Object} props - Component props
 * @param {Object} props.message - Message object
 * @param {string} props.message.sender - 'user' or 'ai'
 * @param {string} props.message.message - Message text
 * @param {string} props.message.timestamp - Message timestamp
 */
const ChatBubble = ({ message }) => {
  const isUser = message.sender === 'user';
  
  return (
    <div className={`flex items-start space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
      {/* Avatar */}
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        isUser 
          ? 'bg-blue-500 text-white' 
          : 'bg-purple-500 text-white'
      }`}>
        {isUser ? <User size={16} /> : <Bot size={16} />}
      </div>
      
      {/* Message bubble */}
      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
        isUser
          ? 'bg-blue-500 text-white ml-auto'
          : 'bg-gray-100 text-gray-900'
      }`}>
        <p className="text-sm">{message.message}</p>
        
        {/* Timestamp */}
        <p className={`text-xs mt-1 ${
          isUser ? 'text-blue-100' : 'text-gray-500'
        }`}>
          {new Date(message.timestamp).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </p>
      </div>
    </div>
  );
};

export default ChatBubble;