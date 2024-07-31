import React from 'react';
import '../css/Order.scss';

interface OrderProps {
    title: string;
}

const Order: React.FC<OrderProps> = ({ title }) => {
  return (
    <div className="order-container">
      <p className="order-title">주문 내역</p>
    </div>
  );
};

export default Order;