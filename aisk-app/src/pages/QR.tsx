import React, { useContext, useState } from 'react';
import '../css/Home.scss';
import QRreader from '../components/QRreader';

const QR: React.FC = () => {

    return (
        <QRreader />
    );
    return (
    <div className='container'>
        QR코드 페이지
        <QRreader />
    </div>
    );
};

export default QR;