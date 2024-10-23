// services/authService.ts
import { BaseService } from './BaseService';
import { AuthResponse, UserResponse } from '../types/auth';
import config from '@/utils/config';


class AuthService extends BaseService {
  constructor() {
    super();
  }

  async login(username: string, password: string): Promise<AuthResponse> {
    return this.post<AuthResponse>('auth/login', { username, password });
  }

  async getAuthUser(): Promise<UserResponse> {
    return this.get<UserResponse>('auth/me');
  }
}

export const authService = new AuthService();
