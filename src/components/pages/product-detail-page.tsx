import api from '@/networks/api';
import { Product } from '@/types/product-type';
import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ProductDetailContainer } from '../fragments/product-detail/product-detail-container';
import ProductSkeleton from '../skeleton/skeleton-detail-product-page';

export function ProductDetailPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const location = useLocation();

  useEffect(() => {
    async function init() {
      try {
        const response = await api.GET_PRODUCT_BY_URL(location.pathname);
        setProduct(response);
      } catch (error) {
        console.log(error);
      }
    }
    init();
  }, [location.pathname]);

  const productDetail = useMemo(() => {
    return product ? (
      <ProductDetailContainer product={product} />
    ) : (
      <ProductSkeleton />
    );
  }, [product]);

  return <>{productDetail}</>;
}
