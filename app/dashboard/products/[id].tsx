// pages/products/[id].tsx
import { GetStaticPaths, GetStaticProps } from 'next';
import { productService } from '@/services/productService';
import { Product } from '@/types/product';
import { useProducts } from '@/hooks/useProducts';

interface ProductPageProps {
  product: Product;
}

export default function ProductPage({ product }: ProductPageProps) {
  return (
    <>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p>{product.price}</p>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { products, isLoading, isError } = useProducts();
  const paths = products.map((product) => ({
    params: { id: product.id.toString() },
  }));

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const product = await productService.getProductById(params?.id as string);
  return {
    props: {
      product,
    },
    revalidate: 60, // Tái tạo trang mỗi 60 giây
  };
};
