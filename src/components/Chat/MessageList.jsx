import React from 'react';

function MessageList({ messages, isTyping, typingUser }) {
  return (
    <div className="message-list">
      {messages.map((message, index) => (
        <div key={index} className="message">
          <strong>{message.username}: </strong>
          <span>{message.text}</span>
        </div>
      ))}

      {/* Display typing indicator if a user is typing */}
      {isTyping && typingUser && (
        <div className="typing-indicator">
          <em>{typingUser} is typing...</em>
        </div>
      )}
    </div>
  );
}

export default MessageList;
