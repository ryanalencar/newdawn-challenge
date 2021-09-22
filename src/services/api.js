import axios from 'axios';
import { YOUTUBE_API_KEY } from 'react-native-dotenv';

const api = axios.create({
  baseURL: `https://www.googleapis.com/youtube/v3/videos?${YOUTUBE_API_KEY}&part=snippet&chart=mostPopular`
});

export default api;
