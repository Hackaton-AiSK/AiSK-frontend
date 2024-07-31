import axios from 'axios';

const API_URL = 'http://223.130.155.79:8000/tts';

export const getTts = async (text: string): Promise<Blob> => {
  try {
    const response = await axios({
        method: 'get',
        url: 'https://223.130.155.79:8001/tts',
        params: { text },
        responseType: 'blob'
    });
    return response.data; 
  } catch (error) {
    console.error('Error fetching TTS', error);
    throw error;
  }
};

/* try {
    const response = await axios({
        method: 'get',
        url: 'http://localhost:8000/tts',
        params: { text },
        responseType: 'blob'
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    setAudioSrc(url);
} catch (err) {
    setError('Failed to convert text to speech. Please try again.');
    console.error(err);
} finally {
    setLoading(false);
}
 */