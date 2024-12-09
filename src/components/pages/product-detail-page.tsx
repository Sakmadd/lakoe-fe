import { dummyProductDetail } from '@/dummy-data/dummyData';
import { useProductDetail } from '@/hooks/use-product-detail';
import { MainContent } from '@/layouts/mainContent';
import { Flex } from '@chakra-ui/react';
import { useState } from 'react';
import { ProductDetailContent } from '../fragments/product-detail/product-content';
import { ProductSpecification } from '../fragments/product-detail/productDetail/product-specification';

const product = dummyProductDetail;

export function ProductDetailPage() {
  const [selectedVariantOption, setSelectedVariantOption] = useState<string[]>(
    []
  );
  const { preparedProduct } = useProductDetail({
    product,
    selectedVariantOption,
  });

  return (
    <>
      <MainContent>
        <Flex flexDir={'column'} gap={'1rem'}>
          <ProductDetailContent
            selectedVariantOption={selectedVariantOption}
            setSelectedVariantOption={setSelectedVariantOption}
            product={preparedProduct}
          />
          <ProductSpecification product={preparedProduct} />
        </Flex>
      </MainContent>
    </>
  );
}
