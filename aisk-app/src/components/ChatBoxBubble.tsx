import React, { useEffect, useState } from 'react';
import '../css/ChatBox.scss';
import chatBoxBubblePolygon from '../assets/images/polygon.png';

interface ChatBoxBubbleProps {
    repeat: string;
    answer: string;
}

const ChatBoxBubble: React.FC<ChatBoxBubbleProps> = ({ repeat, answer }) => {
  const [animationClass, setAnimationClass] = useState('');
  
  return (
    <div className="chat-box-bubble-container">
      <div key={answer} className="chat-box-bubble">
        <p><span style={{fontWeight: 'bold'}}>{repeat}</span> { answer }</p>
      </div>
      <img src={chatBoxBubblePolygon} className="chat-box-bubble-polygon" alt='' />
    </div>
  );
};

export default ChatBoxBubble;