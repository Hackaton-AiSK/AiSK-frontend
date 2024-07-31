import React from 'react';
import exampleImage from '../assets/images/example_coffee.svg';
import '../css/MenuList.scss';
import { MenuItem } from '../type/menuItem';

const menuItems: MenuItem[] = [
  { id: 1, url: '/home', name: '아메리카노', price: 3000 },
  { id: 2, url: '/about', name: '라떼', price: 2000 },
  { id: 3, url: '/services', name: '아이스티', price: 3000 },
  { id: 4, url: '/contact', name: '딸기라뗴', price: 4000},
  { id: 5, url: '/home', name: '아메리카노', price: 3000 },
  { id: 6, url: '/about', name: '라떼', price: 2000},
  { id: 7, url: '/services', name: '아이스티', price: 3000},
  { id: 8, url: '/contact', name: '딸기라뗴', price: 4000 },
  { id: 9, url: '/home', name: '아메리카노', price: 3000 },
  { id: 10, url: '/about', name: '라떼', price: 2000 },
  { id: 11, url: '/services', name: '아이스티', price: 3000 },
  { id: 12, url: '/contact', name: '딸기라뗴', price: 4000 },
];

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