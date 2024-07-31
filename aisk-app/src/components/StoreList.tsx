import React, { useEffect, useState } from "react";
import { fetchStores } from "../api/storeList";
import { storeListData } from "../data/store";
import "../css/StoreList.scss";
import { useNavigate } from "react-router-dom";
import StoreItem from "./StoreItem";
import { useUserContext } from "../context/UserContext";
import { Store } from "../type/store";
import axios from "axios";

const StoreList: React.FC = () => {
  const { userState, setUserState, setUserStore } = useUserContext();
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleItemClick = (store: Store) => {
    setUserState("idle");
    setUserStore(store);
    navigate(`/store/${store.id}`);
  };

  // use get request to fetch store data from server https://223.130.155.79:8001/get_restaurants
  useEffect(() => {
    const getStores = async () => {
      try {
        axios
          .get("https://223.130.155.79:8001/get_restaurants")
          .then((response) => {
            const data = response.data;
            /* json data is stored in data variable, parse json data to store variable the below are the example of json data
          [
            {
              "name": "탐앤탐즈 카이스트점",
              "address": "KAIST 김병호IT융합빌딩(N1) 2층",
              "distance": "0.43km"
            },
            {
              "name": "온천 칼국수",
              "address": "대전 유성구 온천북로 61",
              "distance": "2.04km"
            },
            {
              "name": "리코타코",
              "address": "대전 유성구 대학로155번길 29 101호",
              "distance": "1.49km"
        }]
        */
            const storeList: Store[] = data.map((store: any) => {
              return {
                id: 0, // id is not provided in the json data
                name: store.name,
                address: store.address,
                description: store.distance,
              };
            });
            setStores(storeList);
            
          });
      } catch (err) {
        setError("Failed to fetch stores");
      } finally {
        setLoading(false);
      }
    };

    getStores();
  }, []);

  useEffect(() => {
    const getStores = async () => {
      try {
        const data = storeListData;
        setStores(data);
      } catch (err) {
        setError("Failed to fetch stores");
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
        <StoreItem
          key={index}
          store={store}
          onClick={() => handleItemClick(store)}
        />
      ))}
    </div>
  );
};

export default StoreList;
