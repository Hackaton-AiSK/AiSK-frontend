import React from 'react';
import '../css/Order.scss';
import OrderList from './OrderList';

interface OrderProps {
    title: string;
    menuList: any[];
    orderList: any[];
}

const Order: React.FC<OrderProps> = ({ title, menuList, orderList }) => {
  return (
    <div className="order-container">
      <OrderList orderList={orderList} menuList={menuList}/>
    </div>
  );
};

export default Order;