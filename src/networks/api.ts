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
      const response: AxiosResponse = await axios.get(
        `http://localhost:3000/v1/users/self`
      );

      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      }

      throw error;
    }
  }
  async REGISTER(data: RegisterType): Promise<AxiosResponse> {
    try {
      return await axios.post(`http://localhost:3000/v1/auth/register`, data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      }
      throw error;
    }
  }
  async LOGIN(data: LoginType): Promise<string> {
    try {
      const response: AxiosResponse = await axios.post(
        'http://localhost:3000/v1/auth/login',
        data
      );
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
}

export default new API();
