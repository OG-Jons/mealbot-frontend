import axios from 'axios';

const client = axios.create({
  baseURL:
  import.meta.env.PROD
      ? 'https://mealbot-backend.chunk.moe/'
      : 'http://localhost:8080/',
});

client.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return error;
  }
);

export default {
  subscribe(email) {
    return client.post('user', { email });
  },
  unSubscribe(email) {
    return client.delete('user/' + email);
  },
  getCurrentDay() {
    return client.get('day').then((res) => res.data);
  },
};
