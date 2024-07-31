import React from 'react';
import '../css/Order.scss';
import OrderList from './OrderList';

interface OrderProps {
    title: string;
    menuList: any[];
}

const Order: React.FC<OrderProps> = ({ title, menuList }) => {
  return (
    <div className="order-container">
      <OrderList menuList={menuList}/>
    </div>
  );
};

export default Order;