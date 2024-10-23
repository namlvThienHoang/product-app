// services/authService.ts
import { AxiosResponse } from 'axios';
import { AuthResponse } from '../types/auth';
import config from '@/utils/config';
import api from '@/lib/axiosInstance';

class AuthService {
  // Login method
  async login(username: string, password: string): Promise<AuthResponse> {
    try {
      const response: AxiosResponse<AuthResponse> = await api.post<AuthResponse>(`${config.BACKEND_URL}auth/login`, {
        username,
        password
      });
      return response.data;
    } catch (error) {
      // Handle error appropriately
      console.error("Error during login:", error);
      throw error; // re-throwing the error for higher-level handling
    }
  }
}

// Exporting the instance
export const authService = new AuthService();
