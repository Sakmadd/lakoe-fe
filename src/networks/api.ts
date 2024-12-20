import { CONFIGS } from '@/configs/configs';
import { LoginType, RegisterType, UserType } from '@/types/types';
import axios, { AxiosResponse } from 'axios';

axios.defaults.baseURL = CONFIGS.API_URL;
axios.defaults.headers.common['Authorization'] = GET_TOKEN();

export function SET_TOKEN(payload: string): void {
  localStorage.setItem('token', payload);
}
function GET_TOKEN(): string | null {
  const token = `Bearer ${localStorage.getItem('token')}`;
  return token;
}

class API {
  async GET_LOGGED_USER(): Promise<UserType> {
    try {
      const response: AxiosResponse = await axios.get(`/users/self`);
      return response.data.data.payload;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      }

      throw error;
    }
  }
  async REGISTER(data: RegisterType): Promise<AxiosResponse> {
    try {
      return await axios.post(`/auth/register`, data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      }
      throw error;
    }
  }
  async LOGIN(data: LoginType): Promise<string> {
    try {
      const response: AxiosResponse = await axios.post('/auth/login', data);
      if (response.data.error) {
        throw new Error(response.data.message);
      }
      const token: string = response.data.data.token;
      console.log(response.data);

      SET_TOKEN(token);

      return token;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      }

      throw error;
    }
  }
  async CREATE_PRODUCT(data: FormData) {
    try {
      const response = await axios.post('/products', data);
      console.log(response);

      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      }

      throw error;
    }
  }
  async GET_ALL_PRODUCTS() {
    try {
      const response = await axios.get('/products');
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      }

      throw error;
    }
  }
  async GET_SHOP_PRODUCTS() {
    try {
      const response = await axios.get('/products/shop');
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      }

      throw error;
    }
  }
  async GET_PRODUCT_BY_URL(url: string) {
    try {
      const response = await axios.get(`/products/url${url}`);
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      }

      throw error;
    }
  }
  async TOGGLE_ACTIVE_SINGLE(id: string) {
    try {
      const response = await axios.patch(`/products/${id}/toggle`);
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      }

      throw error;
    }
  }
  async TOGGLE_ACTIVE_BATCH(id: string[]) {
    try {
      const response = await axios.patch(`/products/batch-toggle`, id);
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      }

      throw error;
    }
  }
  async EDIT_PRICE_SINGLE(id: string, amount: string[]) {
    try {
      const response = await axios.patch(`/products/price/${id}`, amount);
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      }

      throw error;
    }
  }
  async EDIT_STOCK_SINGLE(id: string, amount: string[]) {
    try {
      const response = await axios.patch(`/products/stock/${id}`, amount);
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      }

      throw error;
    }
  }
  async DELETE_PRODUCT_BATCH(id: string[]) {
    try {
      const response = await axios.delete(`/products/batch-delete`, {
        data: id,
      });
      console.log(response.data.data);

      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      }

      throw error;
    }
  }
  async GET_ALL_CATEGORIES() {
    try {
      const respone = await axios.get('/products/categories');
      return respone.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      }

      throw error;
    }
  }
}

export default new API();
