import React from 'react';
import '../css/Menu.scss';
import MenuItemList from './MenuitemList';
import { useUserContext } from '../context/UserContext';

interface MenuProps {
    title: string;
    filter : number[];
    menuItems: any[];
}

const Menu: React.FC<MenuProps> = ({ title, filter, menuItems}) => {
  const { userState, setUserState, userStore } = useUserContext();
  return (
    <div className="menu-container" style={ userState === 'menu' ? { paddingBottom:'200px'} : {}}>
      <MenuItemList filter={filter} menuItems={menuItems}/>
    </div>
  );
};

export default Menu;