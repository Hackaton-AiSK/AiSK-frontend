import axios from 'axios';

const API_URL = 'https://api.example.com/stores';

export const fetchStores = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching stores', error);
    throw error;
  }
};