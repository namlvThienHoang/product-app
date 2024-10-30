import { Product, ProductResponse } from '@/types/product';
import { BaseService } from './BaseService';
import { CreateProductSchema, GetProductsSchema, UpdateProductSchema } from '@/lib/validations';

class ProductService extends BaseService {
  async getProducts(input: GetProductsSchema) {
    return this.getFilter('products', input);
  }

  async getProductById(id: number): Promise<Product> {
    return this.get<Product>(`products/${id}`);
  }

  async createProduct(input: CreateProductSchema): Promise<Product> {
    return this.create<Product>('products/add', input);
  }

  async updateProduct(id: number, input : UpdateProductSchema): Promise<Product> {
    return this.update<Product>(`products/${id}`, input);
  }

  async updateProducts(input: {
    ids: number[]
    category?: Product["category"]
  }): Promise<Product> {
    return this.update<Product>(`products/update`, input);
  }

  async delProduct(id: number): Promise<Product> {
    return this.delete<Product>(`products/${id}`);
  }

  async delProducts(input: { ids: number[] }): Promise<Product> {
    return this.deletes<Product>(`products/delete`, input);
  }
}

export const productService = new ProductService();
