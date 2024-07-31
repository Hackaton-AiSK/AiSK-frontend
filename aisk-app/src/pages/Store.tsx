import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { storeListData } from '../data/store';
import '../css/Store.scss';
import Header from '../components/Header';
import Menu from '../components/Menu';
import ChatBox from '../components/ChatBox';
import Info from '../components/Info';
import { UserContext, useUserContext } from '../context/UserContext';

const StorePage: React.FC = () => {
  const { userState, setUserState, setStoreId, setStoreName } = useUserContext();
  const { id } = useParams<{ id: string }>();
  const store = storeListData.find(store => store.id === Number(id));
  
  if (!store) {
    return <div>Store not found</div>;
  } else{
    setStoreId(Number(id));
    setStoreName(store?.store || '');
  }
  
  return (
    <div>
        <div className="store-container">
            <Header title={store.store} />
            { userState !== 'idle' ? <Menu title={'메뉴'} /> : <Info title={'정보'} />}
            <ChatBox title={'채팅창'} />
        </div>
    </div>
  );
};

export default StorePage;
