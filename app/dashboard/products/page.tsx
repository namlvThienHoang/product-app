"use client"
import ProductCard from '@/components/product-card';
import { useProducts } from '@/hooks/useProducts';

export default function ProductPage() {
    const { products, isLoading, isError } = useProducts();

    if (isLoading) return <p>Loading products...</p>;
    if (isError) return <p>Failed to load products</p>;

    return (
        <>
            <h1>Product List</h1>
            <div className="product-grid">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </>
    )
}
