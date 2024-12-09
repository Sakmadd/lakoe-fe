import { dummyProductDetail } from '@/dummy-data/dummyData';
import { MainContent } from '@/layouts/mainContent';
import { Flex } from '@chakra-ui/react';
import { ProductDetailContent } from '../fragments/product-detail/product-content';
import { ProductSpecification } from '../fragments/product-detail/productDetail/product-specification';

export function ProductDetailPage() {
  const product = dummyProductDetail;
  return (
    <>
      <MainContent>
        <Flex flexDir={'column'} gap={'1rem'}>
          <ProductDetailContent product={product} />
          <ProductSpecification product={product} />
        </Flex>
      </MainContent>
    </>
  );
}
