import React, { useEffect, useState } from 'react';
import '../css/ChatBox.scss';
import agent from '../assets/images/agent.png';
import HandButton from './HandButton';
import ChatBoxBubble from './ChatBoxBubble';
import polygon from '../assets/images/polygon.png';
import blur from '../assets/images/blur.svg';
import { useUserContext } from '../context/UserContext';


interface ChatBoxProps {
    title: string;
}

const ChatBox: React.FC<ChatBoxProps> = ({ title }) => {
  const { userState, setUserState, userStore } = useUserContext();
  const { repeat, answer } = { repeat: '차가운 커피 하나요.', answer: '4 종류의 커피 중 무엇으로 드릴까요? 아메리카노, 라떼, 콜드브루, 에스프레소가 있어요.' };
  const { menuText, menuInfo } = { menuText: '전체 메뉴', menuInfo: ' 보여드릴게요. 도움이 필요하시면 언제든지 말씀해 주세요.'};
  const { infoText, infoInfo } = { infoText: '', infoInfo: `안녕하세요, ${userStore.name} 입니다. 무엇을 도와드릴까요?`};

  const [boldText, setBoldText] = useState(infoText);
  const [text, setText] = useState(infoInfo);

  const onMenuClick = () => {
    setUserState('menu');
    console.log('menu clicked');
  }

  useEffect(() => {
    if (userState === 'menu') {
      setBoldText(menuText);
      setText(menuInfo);
    } else if (userState === 'idle') {
      setBoldText(infoText);
      setText(infoInfo);
    } else {
      setBoldText(repeat);
      setText(answer);
    }
  }, [userState]);

  return (
    <div className="chat-box-container">
      <ChatBoxBubble repeat={boldText} 
      answer={text}/>
      <div className='agent-image-box'>
        <img src={agent} className="agent-image" alt='' />
      </div>
      <div className="chat-box-ui">
      { userState !== 'menu' ? <HandButton direction='' onClick={onMenuClick}/> : null }
      { userState !== 'menu' ? <HandButton direction='right' onClick={()=>{}}/> : null }
      </div>
      { userState === 'menu' ? <img src={blur} className="blur" alt='' /> : null }
    </div>
  );
};

export default ChatBox;