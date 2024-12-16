import { Flex } from '@chakra-ui/react';
import { ProductCard } from './product-card';
import { formatRupiah } from '@/utils/format-rp';
import { dummyProductList } from '@/dummy-data/dummyData';

export function ProductList() {
  const products = dummyProductList;

  return (
    <>
      <Flex flexWrap={'wrap'} gap={'1rem'} justifyContent={'center'}>
        {products.map((product) => (
          <ProductCard
            key={product.name}
            url={product.url}
            image={product.image}
            title={product.name}
            price={formatRupiah(product.price)}
          />
        ))}
      </Flex>
    </>
  );
}
