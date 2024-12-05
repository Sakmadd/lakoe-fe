import { Flex } from '@chakra-ui/react';
import { ProductDetailImage } from './product-detail/product-detail-image';
import { ProductDetailText } from './product-detail/product-detail-text';

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
