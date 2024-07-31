import React, { useContext, useEffect, useState } from 'react';
import StoreList from '../components/StoreList';
import '../css/Home.scss';
import { UserContext, useUserContext } from '../context/UserContext';
import bg from '../assets/images/home_bg.svg'
import qr from '../assets/images/qr.svg'
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
    const { userState, setUserState } = useUserContext();
    const navigate = useNavigate();
    setUserState('idle');
    useEffect(() => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
    }, []);

    window.addEventListener("resize", () => {
        console.log("resize");
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
        console.log(vh);
    });

    return (
    <div className='container'>
        <p className='welcome-text'>가게를 선택해 주세요!</p>
        <StoreList />
        <div className='qr-container'>
            <div className='qr-button' onClick={() => navigate('/qr')}>
                <img src={qr} className='qr-image' alt='' />
            </div>
        </div>
        <p className='home-qr-text'>QR 찍어서 가게 선택하기</p>
        <img src={bg} className='home-bg' alt='' />
    </div>
    );
};

export default Home;