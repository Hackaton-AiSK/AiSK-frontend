import React, { useEffect, useRef, useState } from 'react';
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
import { getMenu } from '../api/store';
import axios from 'axios';

const StorePage: React.FC = () => {
  const [menuList, setMenuList] = useState<number[]>([]);
  const [orderList, setOrderList] = useState<number[]>([]);
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const { userState, setUserState, userStore, agentState, userSetting, setUserStore, totalAmount, setAgentState} = useUserContext();
  const { id } = useParams<{ id: string }>();
  const store = storeListData.find(store => store.id === Number(id));
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioDataArrayRef = useRef<Uint8Array | null>(null);
  const silenceStartRef = useRef<number | null>(null);
  const [transcript, setTranscript] = useState<string>('');
  const [answer, setAnswer] = useState<string>('차가운 커피 하나요.');
  const [repeat, setRepeat] = useState<string>('4 종류의 커피 중 무엇으로 드릴까요? 아메리카노, 라떼, 콜드브루, 에스프레소가 있어요.');
  const { menuText, menuInfo } = { menuText: '전체 메뉴', menuInfo: ` 보여드릴게요. ${userSetting==='blind' ? "menuScript"+'가 준비되어 있어요. ':''}도움이 필요하시면 언제든지 말씀해 주세요.`};
  const { infoText, infoInfo } = { infoText: '', infoInfo: `안녕하세요, ${userStore.name} 입니다. ${userSetting==='blind' ? '전체 메뉴 읽기는 왼쪽 하단, 말 끊기는 오른쪽 하단을 눌러주세요. ':''}무엇을 도와드릴까요?`};
  const { finalText, finalInfo } = {finalText: '주문이 완료되었습니다', finalInfo: '. 주문 번호는 15번입니다. 현장에서 결제해 주세요'};

  useEffect(() => {
    console.log('rendering userState:', userState);
    if (userState === 'menu') {
      setRepeat(menuText);
      setAnswer(menuInfo);
    } else if (userState === 'idle') {
      setRepeat(infoText);
      setAnswer(infoInfo);
    } else if (userState === 'finished') {
      setRepeat(finalText);
      setAnswer(finalInfo);
    }
    else {
      setRepeat(repeat);
      setAnswer(answer);
    }
  }, [userState]);

  useEffect(() => {
    if (isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
    return () => {
      stopRecording();
    };
  }, [isRecording]);

  const startRecording = async () => {
    try {
      if(agentState === 'speaking') setAgentState('listening');

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      // Set up the audio context and analyser for silence detection
      // @ts-ignore 
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 2048;
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);

      audioDataArrayRef.current = new Uint8Array(analyserRef.current.frequencyBinCount);
      silenceStartRef.current = null;

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        // TODO: send post request to send post audioBlob to fastapi server that expects UploadFile
        const formData = new FormData();
        formData.append('file', audioBlob, 'audio.wav');


        // Post request to FastAPI server
        axios.post('https://223.130.155.79:8001/transcribe_and_ask_to_powerful_llm', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(response => {
          setRepeat('');
          setAnswer(response.data.llm_text);
          setAgentState('speaking');
          if(response.data.state === 1){
            setUserState('ordered');
          }
          else if(response.data.state === 2){
            setUserState('finished');
          }
          else if(response.data.state === 0){
            setUserState('filter');
          }
          setMenuList(response.data.now_menu_list);
          setOrderList(response.data.basket);
          console.log(response.data);
        });

        }

      mediaRecorderRef.current.start();
      monitorAudio(); // Start monitoring for silence
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
      analyserRef.current = null;
      audioDataArrayRef.current = null;
      silenceStartRef.current = null;
    }
  };

  const monitorAudio = () => {
    if (!analyserRef.current) return;
    // @ts-ignore
    analyserRef.current.getByteFrequencyData(audioDataArrayRef.current);
    // @ts-ignore
    const averageVolume = audioDataArrayRef.current.reduce((sum, value) => sum + value, 0) / audioDataArrayRef.current.length;
    if (averageVolume < 40) { // Silence threshold
      if (!silenceStartRef.current) {
        silenceStartRef.current = null;
      } else if (Date.now() - silenceStartRef.current > 500) { // 2 seconds of silence
        setIsRecording(false); // Stop recording
      }
    } else {
      silenceStartRef.current = Date.now();
    }

    requestAnimationFrame(monitorAudio);
  };

  const onMenuClick = () => {
    setAgentState('idle');
    setUserState('menu');
  }

  useEffect(() => {
    if (store) {
      (async () => {
        try {
          setIsLoading(true);
          console.log('fetching menu');
          const blob = await getMenu(store.id);
          console.log('blob:', blob);
          const formattedData = blob.menu_list.map((item: any, index: number) => ({
            id: index, // or use a proper id if available in the data
            name: item.NAME,
            price: item.PRICE,
            url: item.URL,
          }));
    
          setMenuItems(formattedData);
        } catch (error) {
          console.error('Error fetching Menu:', error);
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [store]);
  

  if (!store) {
    return <div>Store not found</div>;
  }

  return (
    <div>
        <div className="store-container">
        <div>
      {isRecording ? <p style={{position: 'absolute'}}>Recording...</p> : <p style={{position: 'absolute'}}>Not Recording</p>}
      {audioURL && (
        <div>
          <audio controls src={audioURL}></audio>
          <a href={audioURL} download="audio.wav">Download Recording</a>
        </div>
      )}
      <p>{transcript}</p>
    </div>
            <Header title={store.name} />
            {
              userState === 'ordered' ? <p className='order-title'>주문 완료</p> : null
            }
            { userState === 'idle' ? <Info title={'안내'} /> :
              userState === 'ordered' ? <Order menuList={menuItems} orderList={orderList} title={'주문'} /> :
              userState === 'finished' ? <Final title={'완료'} /> :
              <Menu title={'메뉴'} filter={menuList} menuItems={menuItems}/>
            }{
              userState === 'ordered' ?
              <div className='total-section'>
                <div className='divider'></div>
                <div className='total'>
                  <p className='total-label'>총액</p>
                  <p className='total-amount'>{totalAmount}</p>
                </div>
            </div>
            : null
            }
            <ChatBox title={'채팅창'} repeat={repeat} answer={answer} onListen={() => setIsRecording(true)}/>
        </div>
    </div>
  );
};

export default StorePage;
