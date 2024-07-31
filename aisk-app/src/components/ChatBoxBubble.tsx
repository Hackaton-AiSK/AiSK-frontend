import React, { useEffect, useState } from 'react';
import '../css/ChatBox.scss';
import chatBoxBubblePolygon from '../assets/images/polygon.png';
import { useUserContext } from '../context/UserContext';
import { getTts } from '../api/tts';

interface ChatBoxBubbleProps {
    repeat: string;
    answer: string;
    reverse?: boolean;
}

const ChatBoxBubble: React.FC<ChatBoxBubbleProps> = ({ repeat, answer, reverse }) => {
  const { userState, userStore, setAgentState } = useUserContext();
  const store = userStore;
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  useEffect(() => {
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
  }, [userState, store, answer]);
  
  return (
    <div className="chat-box-bubble-container">
      <div key={answer} className="chat-box-bubble">{
        !reverse ?
        <p><span style={{fontWeight: 'bold'}}>{repeat}</span> { answer }</p>
        : <p>{ answer } <span style={{fontWeight: 'bold'}}>{repeat}</span></p>
        }
      </div>
      <img src={chatBoxBubblePolygon} className="chat-box-bubble-polygon" alt='' />
      {audioSrc && <audio src={audioSrc} autoPlay onEnded={()=>setAgentState('listening')}/>}
    </div>
  );
};

export default ChatBoxBubble;