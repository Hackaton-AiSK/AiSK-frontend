import React, { useEffect, useState } from 'react';
import '../css/ChatBox.scss';
import agent from '../assets/images/agent.png';
import HandButton from './HandButton';
import ChatBoxBubble from './ChatBoxBubble';
import { useUserContext } from '../context/UserContext';
import wave from '../assets/images/wave.gif';

interface ChatBoxProps {
    title: string;
}

const ChatBox: React.FC<ChatBoxProps> = ({ title }) => {
  const { userState, setUserState, userStore } = useUserContext();

  const { repeat, answer } = { repeat: '차가운 커피 하나요.', answer: '4 종류의 커피 중 무엇으로 드릴까요? 아메리카노, 라떼, 콜드브루, 에스프레소가 있어요.' };
  const { menuText, menuInfo } = { menuText: '전체 메뉴', menuInfo: ' 보여드릴게요. 도움이 필요하시면 언제든지 말씀해 주세요.'};
  const { infoText, infoInfo } = { infoText: '', infoInfo: `안녕하세요, ${userStore.name} 입니다. 무엇을 도와드릴까요?`};
  const { finalText, finalInfo } = {finalText: '현장에서 결제해주세요.', finalInfo: '주문이 완료되었습니다. 주문 번호는 15번입니다. 음식이 모두 준비되면 가져다 드릴게요.'};
  const [ agentState, setAgentState ] = useState('idle');

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
    } else if (userState === 'finished') {
      setBoldText(finalText);
      setText(finalInfo);
    }
    else {
      setBoldText(repeat);
      setText(answer);
    }
  }, [userState]);

  return (
    <div className={ userState !== 'menu' ? "chat-box-container":'chat-box-menu-container'}>
      { agentState === 'idle' ? <ChatBoxBubble reverse={userState === 'finished' ? true : false}
        repeat={boldText}
        answer={text}/>
      : <div className='wave-image-box'><img src={wave} className="wave-image" alt='' /></div>
      }
      <div className='agent-image-box'>
        <img src={agent} className="agent-image" alt='' />
      </div>
      { (userState !== 'menu') && (userState !== 'finished') ? <div className="chat-box-ui">
        <HandButton direction='' onClick={onMenuClick}/>
        <HandButton direction='right' onClick={()=>{}}/> 
      </div>
      : null }
    </div>
  );
};

export default ChatBox;