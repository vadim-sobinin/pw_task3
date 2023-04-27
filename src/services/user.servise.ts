import { productType } from '@/types';
import axios, { AxiosError } from 'axios';

const API_URL = 'https://internship.purrweb.site/api';

axios.defaults.baseURL = API_URL;

type registerDataType = {
  username: string;
  email: string;
  password: string;
};

type loginDataType = {
  email: string;
  password: string;
};

type getUserInfo = {
  token: string;
};

// https://internship.purrweb.site/api/users/sing-up
// https://internship.purrweb.site/api/users/sign-up
export const UserService = {
  async register({ username, email, password }: registerDataType) {
    try {
      const response = await axios.post('/users/sign-up', {
        email,
        username,
        password,
      });
      return response;
    } catch (err) {
      const error = err as AxiosError;
      if (error.response) {
        return error.response.data;
      } else if (error.request) {
        return error.request.data;
      } else {
        alert(`Error ${error.message}`);
      }
    }
  },
  async login({ email, password }: loginDataType) {
    try {
      const response = await axios.post('/users/sign-in', {
        email,
        password,
      });

      return response;
    } catch (err) {
      const error = err as AxiosError;
      if (error.response) {
        return error.response.data;
      } else if (error.request) {
        return error.request.data;
      } else {
        alert(`Error ${error.message}`);
      }
    }
  },

  async getUserInfo({ token }: getUserInfo) {
    try {
      const response = await axios.get('/users/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response;
    } catch (err) {
      const error = err as AxiosError;
      if (error.response) {
        return error.response.data;
      } else if (error.request) {
        return error.request.data;
      } else {
        alert(`Error ${error.message}`);
      }
    }
  },
};
