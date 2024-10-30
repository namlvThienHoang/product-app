
export type Product = {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    code: string;
    meta: {
      createdAt: string;
      updatedAt: string;
    };
    thumbnail: string;
    images: string[];
  };
  

export interface ProductResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}


