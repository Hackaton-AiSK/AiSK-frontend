import React from 'react';
import '../css/Menu.scss';
import MenuItemList from './MenuitemList';

interface MenuProps {
    title: string;
}

const Menu: React.FC<MenuProps> = ({ title }) => {
  return (
    <div className="menu-container">
      <MenuItemList />
    </div>
  );
};

export default Menu;