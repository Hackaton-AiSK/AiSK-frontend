import axios from 'axios';

const API_URL = 'http://223.130.155.79:8000/tts';

export const getMenu = async (param: number): Promise<any> => {
  try {
    const response = await axios.post(`https://223.130.155.79:8001/initialize_messages?restaurant_id=${param}`, null, {
      headers: {
        'Accept': 'application/json'
      }
    });
    console.log(response.data);
    return response.data; 
  } catch (error) {
    console.error('Error fetching Menu', error);
    throw error;
  }
};
