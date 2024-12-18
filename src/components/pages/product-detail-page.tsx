import api from '@/networks/api';
import { Product } from '@/types/product-type';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ProductDetailContainer } from '../fragments/product-detail/product-detail-container';
import { NotFoundPage } from './not-found-page';
import { newDummyProductDetail } from '@/dummy-data/dummyData';

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
  });

  if (!product) {
    return (
      <>
        <NotFoundPage />
      </>
    );
  }
  return (
    <>
      <ProductDetailContainer product={newDummyProductDetail} />
    </>
  );
}
