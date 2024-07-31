import React from 'react';
import '../css/Menu.scss';
import MenuItemList from './MenuitemList';
import { useUserContext } from '../context/UserContext';

interface MenuProps {
    title: string;
}

const Menu: React.FC<MenuProps> = ({ title }) => {
  const { userState, setUserState, userStore } = useUserContext();
  return (
    <div className="menu-container" style={ userState === 'menu' ? { paddingBottom:'300px'} : {}}>
      <MenuItemList />
    </div>
  );
};

export default Menu;