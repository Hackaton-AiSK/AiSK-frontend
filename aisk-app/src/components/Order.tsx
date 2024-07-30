import React from 'react';
import '../css/Order.scss';

interface OrderProps {
    title: string;
}

const Order: React.FC<OrderProps> = ({ title }) => {
  return (
    <div className="order-container">
      <div>{ title }</div>
    </div>
  );
};

export default Order;