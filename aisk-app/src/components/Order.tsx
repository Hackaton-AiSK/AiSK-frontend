import React from 'react';
import '../css/Order.scss';
import OrderList from './OrderList';

interface OrderProps {
    title: string;
}

const Order: React.FC<OrderProps> = ({ title }) => {
  return (
    <div className="order-container">
      <OrderList />
    </div>
  );
};

export default Order;