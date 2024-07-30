import React from 'react';
import '../css/Header.scss';
import { useNavigate } from 'react-router-dom';
import cancel from '../assets/images/cancel.svg';

interface HeaderProps {
    title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
    const navigate = useNavigate();

    const handleBackClick = () => {
      navigate(-1);
    };

  return (
    <header className="header">
      <div className="store-name">{ title }</div>
      <img src={cancel} className="cancel" alt='' onClick={handleBackClick} />
    </header>
  );
};

export default Header;