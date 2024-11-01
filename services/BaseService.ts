import api from '@/lib/axiosInstance';
import { GetProductsSchema } from '@/lib/validations';
import axios, {  AxiosResponse } from 'axios';


export class BaseService {
    // Generic GET method
    async getFilter(endpoint: string, params: GetProductsSchema) {
      try {
        const response = await api.get(endpoint, { params });
        return response.data;  // Đảm bảo trả về kết quả trong mọi trường hợp
      } catch (error) {
        return this.handleError(error, `GET from ${endpoint}`);  // Trả về lỗi
      }
    }


  // Generic GET method
  async get<T>(endpoint: string): Promise<T> {
    try {
      const response: AxiosResponse<T> = await api.get(endpoint);
      return response.data;  // Đảm bảo trả về kết quả trong mọi trường hợp
    } catch (error) {
      return this.handleError(error, `GET from ${endpoint}`);  // Trả về lỗi
    }
  }

  // Generic POST method
  async create<T>(endpoint: string, data: any): Promise<T> {
    try {
      const response: AxiosResponse<T> = await api.post(endpoint, data);
      return response.data;
    } catch (error) {
      return this.handleError(error, `POST to ${endpoint}`);
    }
  }

  // Generic PUT method
  async update<T>(endpoint: string, data: any): Promise<T> {
    try {
      const response: AxiosResponse<T> = await api.put(endpoint, data);
      return response.data;
    } catch (error) {
      return this.handleError(error, `PUT to ${endpoint}`);
    }
  }

    // Generic PUT method
    async updates<T>(endpoint: string, data: any): Promise<T> {
      try {
        const response: AxiosResponse<T> = await api.put(endpoint, data);
        return response.data;
      } catch (error) {
        return this.handleError(error, `PUT to ${endpoint}`);
      }
    }

  // Generic DELETE method
  async delete<T>(endpoint: string): Promise<T> {
    try {
      const response: AxiosResponse<T> = await api.delete(endpoint);
      return response.data;
    } catch (error) {
      return this.handleError(error, `DELETE from ${endpoint}`);
    }
  }

  async deletes<T>(endpoint: string, data: any): Promise<T> {
    try {
      const response: AxiosResponse<T> = await api.delete(endpoint, data);
      return response.data;
    } catch (error) {
      return this.handleError(error, `DELETE from ${endpoint}`);
    }
  }

  // Error handler to process axios errors
  private handleError(error: any, action: string): never {
    if (axios.isAxiosError(error)) {
      console.error(`Error during ${action}:`, error.response?.data || error.message);
      throw new Error(`Failed to ${action}: ${error.response?.data?.message || error.message}`);
    } else {
      throw new Error(`Unexpected error during ${action}: ${error.message}`);
    }
  }
}
