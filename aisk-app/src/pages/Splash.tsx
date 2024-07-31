import React, { useEffect, useState } from 'react';
import '../css/Splash.scss';
import logo from '../assets/images/logo.svg';

const Splash: React.FC = () => {

    const [isFadingOut, setIsFadingOut] = useState<boolean>(false);

    useEffect(() => {
        const timer = setTimeout(() => {
          // Navigate to home screen after 1 second
          window.location.href = '/home'; // Adjust to your routing setup
        }, 1000);
    
        return () => clearTimeout(timer); // Clean up timer on unmount
      }, []);

    return (
    <div className='container'>
        <img src={logo} className='logo' alt='주문바다 로고' />
        <p className='name'>주문바다</p>
    </div>
    );
};

export default Splash;