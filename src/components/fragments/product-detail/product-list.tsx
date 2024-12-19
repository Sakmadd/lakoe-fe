import { ProductsListType } from '@/types/types';
import { formatRupiah } from '@/utils/format-rp';
import { Flex } from '@chakra-ui/react';
import { ProductCard } from './product-card';

interface Props {
  products: ProductsListType[];
}

export function ProductList({ products }: Props) {
  return (
    <>
      <Flex flexWrap={'wrap'} gap={'1rem'} justifyContent={'center'}>
        {products.map((product) => (
          <ProductCard
            key={product.url_name}
            url={`/${product.url_name}`}
            image={product.Images}
            title={product.name}
            price={formatRupiah(product.price)}
          />
        ))}
      </Flex>
    </>
  );
}
