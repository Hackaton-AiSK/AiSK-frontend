import React from 'react';
import '../css/Header.scss';

interface HeaderProps {
    title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="header">
      <div className="logo">{ title }</div>
    </header>
  );
};

export default Header;