import React from 'react';
import { useParams } from 'react-router-dom';
import { storeListData } from '../data/store';
import '../css/Store.scss';
import Header from '../components/Header';
import Menu from '../components/Menu';
import ChatBox from '../components/ChatBox';
import Info from '../components/Info';

const StorePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const store = storeListData.find(store => store.id === Number(id));

  if (!store) {
    return <div>Store not found</div>;
  }

  return (
    <div>
        <div className="store-container">
            <Header title={store.store} />
            <Menu title={'메뉴'} />
            {/* <Info title={'정보'} /> */}
            <ChatBox title={'채팅창'} />
        </div>
    </div>
  );
};

export default StorePage;
