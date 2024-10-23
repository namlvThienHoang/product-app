import { Product, ProductResponse } from '@/types/product';
import { BaseService } from './BaseService';

class ProductService extends BaseService {
  async getProducts(): Promise<ProductResponse> {
    return this.get<ProductResponse>('products');
  }

  async getProductById(id: string): Promise<Product> {
    return this.get<Product>(`products/${id}`);
  }
}

export const productService = new ProductService();
