import axios from 'axios';
import Cookies from 'js-cookie';

export const api = axios.create({
  baseURL: 'https://gorest.co.in/public/v2',
  headers: {
    Authorization: `Bearer ${Cookies.get('token')}`,
  },
});
