import React, { useEffect, useState } from 'react';
import '../css/OrderList.scss';
import { Order } from '../type/order';

interface OrderItemProps {
    order: Order;
    menuList: any[];
}

const OrderItem: React.FC<OrderItemProps> = ({ order, menuList }) => {

    return (
        <div className="order-item" 
        >
            <p>{order.menu.name}</p>
            <p>{order.number}개</p>
            <p>{order.menu.price}원</p>
        </div>
    );
};

export default OrderItem;