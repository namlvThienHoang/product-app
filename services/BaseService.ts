import axios, { AxiosInstance, AxiosResponse } from 'axios';

export class BaseService {
  private axiosInstance: AxiosInstance;

  constructor(baseUrl: string) {
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // Generic GET method
  async get<T>(endpoint: string): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.get(endpoint);
      return response.data;  // Đảm bảo trả về kết quả trong mọi trường hợp
    } catch (error) {
      return this.handleError(error, `GET from ${endpoint}`);  // Trả về lỗi
    }
  }

  // Generic POST method
  async post<T>(endpoint: string, data: any): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.post(endpoint, data);
      return response.data;
    } catch (error) {
      return this.handleError(error, `POST to ${endpoint}`);
    }
  }

  // Generic PUT method
  async put<T>(endpoint: string, data: any): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.put(endpoint, data);
      return response.data;
    } catch (error) {
      return this.handleError(error, `PUT to ${endpoint}`);
    }
  }

  // Generic DELETE method
  async delete<T>(endpoint: string): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.delete(endpoint);
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
