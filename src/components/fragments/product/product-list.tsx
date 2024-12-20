import { useProduct } from '@/hooks/use-product';
import { SellerProductListType } from '@/types/types';
import { Box } from '@chakra-ui/react';
import React, { useState } from 'react';
import { ProductCheckAll } from './product-check-all';
import { ProductItem } from './product-item';

interface Props {
  products: SellerProductListType[];
  filter: React.ReactNode;
}

export default function ProductList({ products, filter }: Props) {
  const { onDelete, onToggleProduct } = useProduct();
  const [checkedProduct, setCheckedProduct] = useState<SellerProductListType[]>(
    []
  );

  async function batchToggleHandler(checkedProduct: SellerProductListType[]) {
    try {
      const batch: string[] = [];
      checkedProduct.map((product) => batch.unshift(product.id));
      onToggleProduct(batch);
    } catch (error) {
      console.log(error);
    }
  }

  async function batchDeleteHandler(checkedProduct: SellerProductListType[]) {
    try {
      const batch: string[] = [];
      checkedProduct.map((product) => batch.unshift(product.id));
      onDelete(batch);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box display="flex" flexDirection="column" gap="0.5rem">
      {filter}
      <ProductCheckAll
        batchDeleteHandler={batchDeleteHandler}
        batchToggleHandler={batchToggleHandler}
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
