import React from 'react';
import '../css/Menu.scss';

interface MenuProps {
    title: string;
}

const Menu: React.FC<MenuProps> = ({ title }) => {
  return (
    <div className="menu-container">
      <div>{ title }</div>
    </div>
  );
};

export default Menu;