import React, { useEffect, useState } from 'react';
import '../css/ChatBox.scss';
import agent from '../assets/images/agent.png';
import agentListening from '../assets/images/agent_listen.png';
import HandButton from './HandButton';
import ChatBoxBubble from './ChatBoxBubble';
import { useUserContext } from '../context/UserContext';
import wave from '../assets/images/wave.gif';
import { waveform } from 'ldrs'

waveform.register()

interface ChatBoxProps {
    title: string;
    menuScript?: string;
}

const ChatBox: React.FC<ChatBoxProps> = ({ title, menuScript }) => {
  const { userState, setUserState, agentState, setAgentState, userStore, userSetting } = useUserContext();

  const { repeat, answer } = { repeat: '차가운 커피 하나요.', answer: '4 종류의 커피 중 무엇으로 드릴까요? 아메리카노, 라떼, 콜드브루, 에스프레소가 있어요.' };
  const { menuText, menuInfo } = { menuText: '전체 메뉴', menuInfo: ` 보여드릴게요. ${userSetting==='blind' ? menuScript+'가 준비되어 있어요. ':''}도움이 필요하시면 언제든지 말씀해 주세요.`};
  const { infoText, infoInfo } = { infoText: '', infoInfo: `안녕하세요, ${userStore.name} 입니다. ${userSetting==='blind' ? '전체 메뉴 읽기는 왼쪽 하단, 말 끊기는 오른쪽 하단을 눌러주세요. ':''}무엇을 도와드릴까요?`};
  const { finalText, finalInfo } = {finalText: '현장에서 결제해주세요.', finalInfo: '주문이 완료되었습니다. 주문 번호는 15번입니다. 음식이 모두 준비되면 가져다 드릴게요.'};

  const [boldText, setBoldText] = useState(infoText);
  const [text, setText] = useState(infoInfo);

  const onMenuClick = () => {
    setAgentState('idle');
    setUserState('menu');
  }

  useEffect(() => {
    console.log('rendering userState:', userState);
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
      { agentState !== 'listening' ? <ChatBoxBubble reverse={userState === 'finished' ? true : false}
        repeat={boldText}
        answer={text}/>
      : 
      <div className='wave-image-box'>
        <l-waveform size="35" stroke="3.5" speed="1" color="#3870A4" ></l-waveform>
      </div>
      }
      <div className='agent-image-box'>
      {agentState === 'listening' ? <img src={agentListening} className="agent-side-image" alt='' />
       : <img src={agent} className="agent-image" alt='' />}
      </div>
      { (userState !== 'menu') && (userState !== 'finished') ? <div className="chat-box-ui">
        <HandButton direction='' onClick={onMenuClick}/>
        <HandButton direction='right' onClick={()=>setAgentState('listening')}/> 
        {/* <HandButton direction='right' onClick={()=>setAgentState(agentState === 'listening'? 'speaking' : 'listening')}/>  */}
      </div>
      : null }
    </div>
  );
};

export default ChatBox;