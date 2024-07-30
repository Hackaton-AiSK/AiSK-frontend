import React from 'react';
import '../css/ChatBox.scss';

interface ChatBoxBubbleProps {
    title: string;
}

const ChatBoxBubble: React.FC<ChatBoxBubbleProps> = ({ title }) => {
  return (
    <div className="chat-box-bubble">
      { title }
    </div>
  );
};

export default ChatBoxBubble;