import axios from 'axios';

const API_URL = 'https://api.example.com/orders';

export const fetchOrders = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching orders', error);
    throw error;
  }
};