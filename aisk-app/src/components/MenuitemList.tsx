import React from 'react';
import exampleImage from '../assets/images/example_coffee.svg';
import '../css/MenuList.scss';
import { MenuItem } from '../type/menuItem';
// import { menuItems } from '../data/menu';
interface MenuItemListProps {
  filter : number[];
  menuItems: any[];
}

const MenuItemList: React.FC<MenuItemListProps> = ({ filter, menuItems }) => {
  const filteredMenuItems = filter.length ? menuItems.filter(item => filter.includes(Number(item.id)+1)) : menuItems;

  console.log(menuItems);
  console.log(filter);

  return (
    <div className="menu-grid-container">
      {filteredMenuItems.map(item => (
        <div key={item.ID} className="menu-grid-item">
          <img className='menu-image' src={exampleImage} alt="example" />
          <p style={{fontSize: '18px'}}>{item.name}</p>
          <p>{item.price}원</p>
        </div>
      ))}
    </div>
  );
};

export default MenuItemList;