import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { storeListData } from '../data/store';
import '../css/Store.scss';
import Header from '../components/Header';
import Menu from '../components/Menu';
import ChatBox from '../components/ChatBox';
import Info from '../components/Info';
import { UserContext, useUserContext } from '../context/UserContext';
import Order from '../components/Order';
import Final from '../components/Final';
import { getTts } from '../api/tts';

const StorePage: React.FC = () => {
  const { userState, setUserState, userStore, setUserStore } = useUserContext();
  const { id } = useParams<{ id: string }>();
  const store = storeListData.find(store => store.id === Number(id));

  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  useEffect(() => {
    if (userState === 'idle' && store) {
      (async () => {
        try {
          setIsLoading(true);
          const greetingText = `안녕하세요, ${store.name}입니다. 무엇을 도와드릴까요?`;
          const greetingBlob = await getTts(greetingText);
          
          const audioUrl = URL.createObjectURL(new Blob([greetingBlob]));
          setAudioSrc(audioUrl);
        } catch (error) {
          console.error('Error fetching TTS:', error);
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [userState, store]);

  if (!store) {
    return <div>Store not found</div>;
  }


  return (
    <div>
        <div className="store-container">
            <Header title={store.name} />
            { userState === 'idle' ? <Info title={'안내'} /> :
              userState === 'ordered' ? <Order title={'주문'} /> :
              userState === 'finished' ? <Final title={'완료'} /> :
              <Menu title={'메뉴'} />
            }
            <ChatBox title={'채팅창'} />
            {audioSrc && <audio src={audioSrc} autoPlay />}
        </div>
    </div>
  );
};

export default StorePage;
