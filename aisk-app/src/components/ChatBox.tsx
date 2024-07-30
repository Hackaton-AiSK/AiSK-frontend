import React from 'react';
import '../css/ChatBox.scss';
import agent from '../assets/images/agent.png';
import HandButton from './HandButton';
import ChatBoxBubble from './ChatBoxBubble';
import polygon from '../assets/images/polygon.png';

interface ChatBoxProps {
    title: string;
}

const ChatBox: React.FC<ChatBoxProps> = ({ title }) => {
  return (
    <div className="chat-box-container">
      <ChatBoxBubble repeat={'차가운 커피 하나요.'} answer={'4 종류의 커피 중 무엇으로 드릴까요? 아메리카노, 라떼, 콜드브루, 에스프레소가 있어요.'} />
      
      <div className="chat-box-ui">
        <HandButton title={'말 끊기'} direction='' />
        {/* <img src={agent} className="agent-image" alt='' /> */}
        <HandButton title={'말하기'} direction='right'/>
      </div>
      <div className='agent-image-box'>
        <img src={agent} className="agent-image" alt='' />
      </div>
    </div>
  );
};

export default ChatBox;