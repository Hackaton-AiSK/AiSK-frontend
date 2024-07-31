import React, { useContext, useState } from 'react';
import '../css/QR.scss';
import QRreader from '../components/QRreader';
import { useNavigate } from 'react-router-dom';

const QR: React.FC = () => {

    const navigate = useNavigate();

    return (
    <div className='container'>
        <p className='qr-text'>QR 찍어서 가게 선택하기</p>
        <QRreader />
        <div className='return'>
            <div className='return-btn' onClick={() => navigate('/')}>
                <p className='return-text'>취소하기</p>
            </div>
        </div>
    </div>
    );
};

export default QR;