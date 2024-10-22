import { Product, ProductResponse } from '@/types/product';
import { BaseService } from './BaseService';
import config from '@/utils/config';

class ProductService extends BaseService {
  constructor() {
    super(config.BACKEND_URL);
  }

  async getProducts(): Promise<ProductResponse> {
    return this.get<ProductResponse>('products');
  }

  async getProductById(id: string): Promise<Product> {
    return this.get<Product>(`products/${id}`);
  }
}

export const productService = new ProductService();
