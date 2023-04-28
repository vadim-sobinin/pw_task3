import { productType, subscribeType } from '@/types';
import axios, { AxiosError } from 'axios';

const LOCAL_API_URL = 'http://localhost:3000/api';
const API_URL = 'https://internship.purrweb.site/api';

// axios.defaults.baseURL = API_URL;

export const ProductService = {
  async getAll() {
    const { data } = await axios.get<productType[]>(`${LOCAL_API_URL}/products`);
    return data;
  },
  async buyProduct(priceId: number, token: string) {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const bodyParameters = {
        priceId: priceId,
      };
      const { data } = await axios.post<subscribeType>(
        `${API_URL}/payments/buy`,
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
