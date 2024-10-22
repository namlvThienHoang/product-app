// services/authService.ts
import { BaseService } from './BaseService';
import { AuthResponse } from '../types/auth';
import config from '@/utils/config';


class AuthService extends BaseService {
  constructor() {
    super(config.BACKEND_URL);
  }

  async login(username: string, password: string): Promise<AuthResponse> {
    return this.post<AuthResponse>('auth/login', { username, password });
  }
}

export const authService = new AuthService();
