import { Flex } from '@chakra-ui/react';
import { ProductCard } from './productCard';

export function ProductContainer() {
  return (
    <>
      <Flex flexWrap={'wrap'} gap={'1rem'} justifyContent={'center'}>
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </Flex>
    </>
  );
}
