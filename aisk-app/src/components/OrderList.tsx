import React, { useEffect, useState } from 'react';
import { fetchOrders } from '../api/orderList';
import { orderListData } from '../data/order';
import '../css/OrderList.scss';
import { useNavigate } from 'react-router-dom';
import OrderItem from './OrderItem';
import { useUserContext } from '../context/UserContext';
import { Order } from '../type/order';

const OrderList: React.FC = () => {
  const { totalAmount, setTotalAmount } = useUserContext();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();


  useEffect(() => {
    const getOrders = async () => {
      try {
        const data = orderListData;
        setTotalAmount(orderListData.reduce((sum, item) => sum + (item.menu.price * item.number), 0));
        setOrders(data);
      } catch (err) {
        setError('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    getOrders();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="order-list">
      {orders.map((order, index) => (
        <OrderItem key={index} order={order} />
      ))}
    </div>
  );
};

export default OrderList;
