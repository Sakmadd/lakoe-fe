import { Flex } from '@chakra-ui/react';
import { ProductDetailImage } from './productDetail/product-detail-image';
import { ProductDetailText } from './productDetail/product-detail-text';

export function ProductDetailContent() {
  return (
    <>
      <Flex gap={'2rem'} padding={'1rem'}>
        <ProductDetailImage />
        <ProductDetailText />
      </Flex>
    </>
  );
}
