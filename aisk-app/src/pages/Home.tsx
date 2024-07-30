import React, { useContext, useState } from 'react';
import StoreList from '../components/StoreList';
import '../css/Home.scss';
import { UserContext, useUserContext } from '../context/UserContext';

const Home: React.FC = () => {
    const { user, setUser } = useUserContext();
    const [query, setQuery] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    return (
    <div className='container'>
            <p className='welcome-text'>가게를 선택해 주세요!</p>
            <div className='flex'>
                <div className="search-bar">
                    <input
                        type="text"
                        value={query}
                        onChange={handleInputChange}
                        placeholder="가게 코드를 입력하세요"
                    />
                </div>
                <img src="https://img.icons8.com/ios/452/search--v1.png" className="icon" alt="search" />
            </div>
        <StoreList />
    </div>
    );
};

export default Home;