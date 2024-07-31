import React from 'react';
import '../css/Order.scss';
import OrderList from './OrderList';

interface OrderProps {
    title: string;
    menuList: any[];
    orderListD: any[];
}

const Order: React.FC<OrderProps> = ({ title, menuList, orderListD }) => {
  return (
    <div className="order-container">
      <OrderList orderList={orderListD} menuList={menuList}/>
    </div>
  );
};

export default Order;