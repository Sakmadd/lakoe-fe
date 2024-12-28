import { CONFIGS } from '@/configs/configs';
import {
  CreateOrderRequestDTO,
  CreateOrderResponseDTO,
} from '@/types/order-types';
import { RatesRequestDTO } from '@/types/rates-type';
import { LoginType, RegisterType, UserType } from '@/types/types';
import { SettingsInformationType } from '@/validators/settings/settings-information';
import { SettingsLocationType } from '@/validators/settings/settings-location';
import { SettingsTemplateTypes } from '@/validators/settings/settings-template';
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

  async GETSHOP() {
    try {
      const loggedUser = await this.GET_LOGGED_USER();
      const response: AxiosResponse = await axios.get(
        `/shops/${loggedUser.shop_id}`
      );
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      }
      throw error;
    }
  }

  async UPDATESHOP(data: SettingsInformationType) {
    try {
      const loggedUser = await this.GET_LOGGED_USER();
      const response: AxiosResponse = await axios.patch(
        `/shops/${loggedUser.shop_id}`,
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      }
      throw error;
    }
  }

  async ADDLOCATION(data: SettingsLocationType) {
    try {
      const loggedUser = await this.GET_LOGGED_USER();
      const response: AxiosResponse = await axios.post(
        `/shops/locations/${loggedUser.shop_id}`,
        data
      );
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      }
      throw error;
    }
  }

  async GETLOCATION() {
    try {
      const loggedUser = await this.GET_LOGGED_USER();
      const response: AxiosResponse = await axios.get(
        `/shops/${loggedUser.shop_id}`
      );
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      }
      throw error;
    }
  }

  async UPDATELOCATION(data: SettingsLocationType) {
    try {
      const response: AxiosResponse = await axios.patch(
        `/shops/locations/${data.id}`,
        data
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      }
      throw error;
    }
  }

  async UPDATEMAINLOCATION(id: string | undefined) {
    try {
      const response: AxiosResponse = await axios.patch(
        `/shops/location/${id}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      }
      throw error;
    }
  }

  async DELETELOCATION(id: string | undefined) {
    try {
      const response: AxiosResponse = await axios.delete(
        `/shops/locations/${id}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      }
      throw error;
    }
  }

  async GETTEMPLATE() {
    try {
      const response: AxiosResponse = await axios.get(`/template-message`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      }
      throw error;
    }
  }

  async ADDTEMPLATE(data: SettingsTemplateTypes) {
    try {
      const response: AxiosResponse = await axios.post(
        `/template-message/template`,
        data
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      }
      throw error;
    }
  }

  async UPDATETEMPLATE(data: SettingsTemplateTypes) {
    try {
      const response: AxiosResponse = await axios.patch(
        `/template-message/update/${data.id}`,
        data
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      }
      throw error;
    }
  }

  async DELETETEMPLATE(id: string | undefined) {
    try {
      const response: AxiosResponse = await axios.delete(
        `/template-message/delete/${id}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      }
      throw error;
    }
  }

  async GETDASHBOARDSELLER() {
    try {
      const response: AxiosResponse = await axios.get(`/seller`);
      return response.data.data.payload;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      }
      throw error;
    }
  }

  async GETDASHBOARDGRAPHS() {
    try {
      const response: AxiosResponse = await axios.get(`/seller/graphs`);
      return response.data.data.payload;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      }
      throw error;
    }
  }

  async GETDASHBOARDTABLE() {
    try {
      const response: AxiosResponse = await axios.get(`/seller/all-order`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      }
      throw error;
    }
  }

  async GETORDERLIST() {
    try {
      const response: AxiosResponse = await axios.get(`/invoice`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      }
      throw error;
    }
  }

  async GETORDERDETAIL(id: string | undefined) {
    try {
      const response: AxiosResponse = await axios.get(`/invoice/${id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      }
      throw error;
    }
  }

  async ACCEPTORDER(id: string | undefined) {
    try {
      console.log(id);
      const response: AxiosResponse = await axios.post(`/invoice/accept/${id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      }
      throw error;
    }
  }

  async DECLINEORDER(id: string | undefined) {
    try {
      const response: AxiosResponse = await axios.post(
        `/invoice/decline/${id}`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      }
      throw error;
    }
  }

  async GETWITHDRAWSELLER() {
    try {
      const response: AxiosResponse = await axios.get(`/withdraw/seller`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      }
      throw error;
    }
  }

  async REQUESTWITHDRAW(amount: string) {
    try {
      const response: AxiosResponse = await axios.post(`/withdraw`, {
        amount: amount,
      });
      console.log(response.data);
      return response.data;
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
      console.log(response.data);
      return response.data;
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
      console.log(response.data);

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
  async GET_COURIER_RATES(data: RatesRequestDTO) {
    try {
      const response = await axios.post('/orders/rates', data);

      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      }

      throw error;
    }
  }
  async CREATE_ORDER(
    data: CreateOrderRequestDTO
  ): Promise<CreateOrderResponseDTO> {
    try {
      const response = await axios.post('/orders', data);
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      }

      throw error;
    }
  }
  async GET_INVOICE(id: string) {
    try {
      const response = await axios.get(`/invoice/${id}`);
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      }

      throw error;
    }
  }
}

export default new API();
