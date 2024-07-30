import React, { useEffect, useState } from 'react';
import '../css/StoreList.scss';
import { Store } from './StoreList';

interface StoreItemProps {
    store: Store;
    onClick: (id: number) => void;
}

const StoreItem: React.FC<StoreItemProps> = ({ store, onClick }) => {

    return (
        <div className="store-item" onClick={() => onClick(store.id)}
        >
            <h1>{store.store}</h1>
            <div className='flex'>
            <p>{store.address}</p>
            <p>{store.description}</p>
            </div>
        </div>
    );
};

export default StoreItem;