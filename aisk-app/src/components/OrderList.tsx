import React, { useEffect, useState } from 'react';
import { fetchOrders } from '../api/orderList';

import '../css/OrderList.scss';
import { useNavigate } from 'react-router-dom';
import OrderItem from './OrderItem';
import { useUserContext } from '../context/UserContext';
import { Order } from '../type/order';

interface OrderListProps {
  menuList: any[];
  orderListD: any[];
}

const OrderList: React.FC<OrderListProps> = ({menuList, orderListD}) => {
  const { totalAmount, setTotalAmount } = useUserContext();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {

    console.log('menuList:', menuList);
    const getOrders = async () => {
      try {
        const orderListData = [];
        // iterate through key and value of  orderListD
        for (const [key, value] of Object.entries(orderListD)) {
          orderListData.push({
            menu: menuList.find((menu) => menu.ID === key),
            number: value,
          });
        }
        // @ts-ignore
        setTotalAmount(orderListData.reduce((sum, item) => sum + (item.menu.price * item.number), 0));
        setOrders(orderListData);
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
        <OrderItem key={index} order={order} menuList={menuList}/>
      ))}
    </div>
  );
};

export default OrderList;
