import { codesType } from '@/types';
import axios, { AxiosError } from 'axios';
import ky from 'ky';

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

  async changeHoldCodes(token: string, selectedCodes: codesType[], subId: number) {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const codesIds = selectedCodes.map((code) => Number(code.id));
      const bodyParameters = { codesIds, subscribeId: subId };

      const { data } = await axios.put<{ id: number; username: string; email: string }>(
        `${API_URL}/code/manage`,
        bodyParameters,
        config,
      );
      return data;
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
