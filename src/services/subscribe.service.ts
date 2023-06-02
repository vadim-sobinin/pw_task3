import axios, { AxiosError } from 'axios';

const API_URL = 'https://internship.purrweb.site/api';

axios.defaults.baseURL = API_URL;

export const SubscribeService = {
  async getSubscribe(token: string) {
    try {
      const response = await axios.get('/subscribe/self', {
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

  async getCodes(token: string) {
    try {
      const response = await axios.get('/code/self', {
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
  async activateCode(token: string, code: string) {
    try {
      const response = await axios.post('/code/activate', {
        headers: { Authorization: `Bearer ${token}` },
        code: code,
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

  async changeSubscribe(token: string, productId: number, subId: number) {
    const data = { productId, subscribeId: subId };
    try {
      const response = fetch(API_URL + '/subscribe/change-product', {
        method: 'post',
        headers: new Headers({
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          accept: 'application/json',
        }),
        body: JSON.stringify(data),
      });

      return response;
    } catch (err) {
      console.log(err);
    }
  },
};
