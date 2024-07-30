import React, { useEffect, useState } from 'react';
import { fetchStores } from '../api/storeList';
import { storeListData } from '../data/store';
import '../css/StoreList.scss';
import { useNavigate } from 'react-router-dom';
import StoreItem from './StoreItem';

export interface Store {
  id: number;
  store: string;
  address: string;
  description: string;
}

const StoreList: React.FC = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleItemClick = (id: number) => {
    navigate(`/store/${id}`);
  };

  useEffect(() => {
    const getStores = async () => {
      try {
        const data = storeListData;
        setStores(data);
      } catch (err) {
        setError('Failed to fetch stores');
      } finally {
        setLoading(false);
      }
    };

    getStores();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="store-list">
      {stores.map((store, index) => (
        <StoreItem key={index} store={store} onClick={handleItemClick} />
      ))}
    </div>
  );
};

export default StoreList;
