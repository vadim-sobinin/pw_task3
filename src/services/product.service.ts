import { productType } from '@/types';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

axios.defaults.baseURL = API_URL;

export const ProductService = {
  async getAll() {
    const { data } = await axios.get<productType[]>('/products');
    return data;
  },
};
