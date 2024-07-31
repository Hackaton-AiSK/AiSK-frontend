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
  const { userState, setUserState, userStore, setUserStore, totalAmount} = useUserContext();
  const { id } = useParams<{ id: string }>();
  const store = storeListData.find(store => store.id === Number(id));

  if (!store) {
    return <div>Store not found</div>;
  }

  return (
    <div>
        <div className="store-container">
            <Header title={store.name} />
            {
              userState === 'ordered' ? <p className='order-title'>주문 완료</p> : null
            }
            { userState === 'idle' ? <Info title={'안내'} /> :
              userState === 'ordered' ? <Order title={'주문'} /> :
              userState === 'finished' ? <Final title={'완료'} /> :
              <Menu title={'메뉴'} />
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
            <ChatBox title={'채팅창'} />
        </div>
    </div>
  );
};

export default StorePage;
