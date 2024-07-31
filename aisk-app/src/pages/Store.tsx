import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { storeListData } from '../data/store';
import '../css/Store.scss';
import Header from '../components/Header';
import Menu from '../components/Menu';
import ChatBox from '../components/ChatBox';
import Info from '../components/Info';
import { UserContext, useUserContext } from '../context/UserContext';
import Order from '../components/Order';

const StorePage: React.FC = () => {
  const { userState, setUserState, userStore, setUserStore } = useUserContext();
  const { id } = useParams<{ id: string }>();
  const store = storeListData.find(store => store.id === Number(id));
  
  if (!store) {
    return <div>Store not found</div>;
  }
  return (
    <div>
        <div className="store-container">
            <Header title={store.name} />
            { userState === 'idle' ? <Info title={'안내'} /> :
              userState === 'ordered' ? <Order title={'주문'} /> :
              <Menu title={'메뉴'} />
            }
            <ChatBox title={'채팅창'} />
        </div>
    </div>
  );
};

export default StorePage;
