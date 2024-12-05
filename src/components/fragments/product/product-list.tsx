import { ProductType } from '@/types/types';
import { Box } from '@chakra-ui/react';
import React, { useState } from 'react';
import { ProductCheckAll } from './product-check-all';
import { ProductItem } from './product-item';

interface Props {
  products: ProductType[];
  filter: React.ReactNode;
}

export default function ProductList({ products, filter }: Props) {
  const [checkedProduct, setCheckedProduct] = useState<ProductType[]>([]);

  return (
    <Box display="flex" flexDirection="column" gap="0.5rem">
      {filter}
      <ProductCheckAll
        checkedProduct={checkedProduct}
        setCheckedProduct={setCheckedProduct}
        products={products}
      />
      <Box display="flex" flexDirection="column" gap="0.8rem">
        {products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            checkedProduct={checkedProduct}
            setCheckedProduct={setCheckedProduct}
          />
        ))}
      </Box>
    </Box>
  );
}
