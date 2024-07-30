import React from 'react';
import '../css/ChatBox.scss';
import agent from '../assets/images/agent.svg';
import HandButton from './HandButton';
import ChatBoxBubble from './ChatBoxBubble';

interface ChatBoxProps {
    title: string;
}

const ChatBox: React.FC<ChatBoxProps> = ({ title }) => {
  return (
    <div className="chat-box-container">
      <div className="chat-box-ui">
        <HandButton title={'말 끊기'} />
        <img src={agent} className="agent-image" alt='' />
        <HandButton title={'말하기'} />
      </div>
      <ChatBoxBubble title={'차가운 커피 하나요. 4 종류의 커피 중 무엇으로 드릴까요? 아메리카노, 라떼, 콜드브루, 에스프레소가 있어요.'} />
    </div>
  );
};

export default ChatBox;