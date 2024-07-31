import React from 'react';
import exampleImage from '../assets/images/example_coffee.svg';
import '../css/MenuList.scss';
import { MenuItem } from '../type/menuItem';
import { menuItems } from '../data/menu';

const MenuItemList: React.FC = () => {
  return (
    <div className="menu-grid-container">
      {menuItems.map(item => (
        <div key={item.id} className="menu-grid-item">
          <img className='menu-image' src={exampleImage} alt="example" />
          <p style={{fontSize: '20px'}}>{item.name}</p>
          <p>{item.price}원</p>
        </div>
      ))
      }
    </div>
  );
};

export default MenuItemList;