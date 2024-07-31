import React, { useEffect, useState, useRef } from 'react';
import '../css/ChatBox.scss';
import chatBoxBubblePolygon from '../assets/images/polygon.png';
import { useUserContext } from '../context/UserContext';
import { getTts } from '../api/tts';
import axios from 'axios';

interface ChatBoxBubbleProps {
    repeat: string;
    answer: string;
}

const ChatBoxBubble: React.FC<ChatBoxBubbleProps> = ({ repeat, answer }) => {
  const { userState, userStore, setAgentState, agentState } = useUserContext();
  const store = userStore;
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const onEndedAudio = () => {
    if(userState === 'finished') return;
    setAgentState('listening');
  }

  useEffect(() => {
    if(answer==='' && repeat==='') return;
    if (store) {
      (async () => {
        try {
          setIsLoading(true);
          const greetingText = `${repeat} ${answer}`;
          const greetingBlob = await getTts(greetingText);
          setAgentState('speaking');
          const audioUrl = URL.createObjectURL(new Blob([greetingBlob]));
          setAudioSrc(audioUrl);
        } catch (error) {
          console.error('Error fetching TTS:', error);
                  } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [answer]);
  
  return (
    <div className="chat-box-bubble-container">
      <div key={answer} className="chat-box-bubble">
        <p><span style={{fontWeight: 'bold'}}>{repeat}</span> { answer }</p>
      </div>
      <img src={chatBoxBubblePolygon} className="chat-box-bubble-polygon" alt='' />
      {audioSrc && <audio src={audioSrc} autoPlay onEnded={onEndedAudio}/>}
    </div>
  );
};

export default ChatBoxBubble;