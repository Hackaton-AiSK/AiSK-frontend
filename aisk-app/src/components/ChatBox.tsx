import React, { useEffect, useRef, useState } from 'react';
import '../css/ChatBox.scss';
import agent from '../assets/images/agent.png';
import agentListening from '../assets/images/agent_listen.png';
import HandButton from './HandButton';
import ChatBoxBubble from './ChatBoxBubble';
import { useUserContext } from '../context/UserContext';
import wave from '../assets/images/wave.gif';
import { waveform } from 'ldrs'
import axios from 'axios';

waveform.register()

interface ChatBoxProps {
    title: string;
    menuScript?: string;
    repeat: string;
    answer: string;
}

const ChatBox: React.FC<ChatBoxProps> = ({ title, menuScript, repeat, answer }) => {
  const { userState, setUserState, agentState, setAgentState, userStore, userSetting } = useUserContext();

  const onMenuClick = () => {
    setAgentState('idle');
    setUserState('menu');
  }

  return (
    <div className={ userState !== 'menu' ? "chat-box-container":'chat-box-menu-container'}>
      { agentState !== 'listening' ? <ChatBoxBubble
        repeat={repeat}
        answer={answer}/>
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