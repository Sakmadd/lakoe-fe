import api from '@/networks/api';
import { Product } from '@/types/product-type';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ProductDetailContainer } from '../fragments/product-detail/product-detail-container';
import ProductSkeleton from '../skeleton/skeleton-detail-product-page';
import { NotFoundPage } from '../pages/not-found-page';

export function ProductDetailPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);
  const location = useLocation();

  useEffect(() => {
    async function init() {
      try {
        setIsLoading(true);
        setIsNotFound(false);

        const response = await api.GET_PRODUCT_BY_URL(location.pathname);
        if (!response) {
          setIsNotFound(true);
        } else {
          setProduct(response);
        }
      } catch (error) {
        console.error(error);
        setIsNotFound(true);
      } finally {
        setIsLoading(false);
      }
    }
    init();
  }, [location.pathname]);

  if (isLoading) {
    return <ProductSkeleton />;
  }

  if (isNotFound) {
    return <NotFoundPage />;
  }

  return product ? <ProductDetailContainer product={product} /> : null;
}
