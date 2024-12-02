import { Flex } from '@chakra-ui/react';
import { ProductDetailImage } from './productDetail/productDetailImage';
import { ProductDetailText } from './productDetail/productDetailText';

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
