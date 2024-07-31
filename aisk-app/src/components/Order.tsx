import React from 'react';
import '../css/Order.scss';
import OrderList from './OrderList';

interface OrderProps {
    title: string;
}

const Order: React.FC<OrderProps> = ({ title }) => {
  return (
    <div className="order-container">
      <p className="order-title">주문 내역</p>

      <OrderList />

      <div className='total-section'>
        <div className='divider'></div>
        <div className='total'>
          <p className='total-label'>총액</p>
          <p className='total-amount'>00000</p>
        </div>
      </div>
    
    </div>
  );
};

export default Order;