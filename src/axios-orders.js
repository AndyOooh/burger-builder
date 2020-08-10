import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-599f2.firebaseio.com/',
});

instance.defaults.headers.common['Athorization'] = 'AUTH TOKEN FROM INSTANCE';

export default instance;
