import React, { useEffect, useState } from 'react';
import '../css/ChatBox.scss';
import chatBoxBubblePolygon from '../assets/images/polygon.png';

interface ChatBoxBubbleProps {
    repeat: string;
    answer: string;
    reverse?: boolean;
}

const ChatBoxBubble: React.FC<ChatBoxBubbleProps> = ({ repeat, answer, reverse }) => {
  const [animationClass, setAnimationClass] = useState('');
  
  return (
    <div className="chat-box-bubble-container">
      <div key={answer} className="chat-box-bubble">{
        !reverse ?
        <p><span style={{fontWeight: 'bold'}}>{repeat}</span> { answer }</p>
        : <p>{ answer } <span style={{fontWeight: 'bold'}}>{repeat}</span></p>
        }
      </div>
      <img src={chatBoxBubblePolygon} className="chat-box-bubble-polygon" alt='' />
    </div>
  );
};

export default ChatBoxBubble;