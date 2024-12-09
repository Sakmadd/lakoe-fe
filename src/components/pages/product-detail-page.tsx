import { dummyProductDetail } from '@/dummy-data/dummyData';
import { useProductDetail } from '@/hooks/use-product-detail';
import { MainContent } from '@/layouts/mainContent';
import { Flex } from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ProductDetailContent } from '../fragments/product-detail/product-content';
import { ProductSpecification } from '../fragments/product-detail/productDetail/product-specification';
import { Toaster } from '../ui/toaster';

const product = dummyProductDetail;

export function ProductDetailPage() {
  const [selectedVariantOption, setSelectedVariantOption] = useState<string[]>(
    []
  );
  const { handleSubmit } = useForm();
  const { preparedProduct } = useProductDetail({
    product,
    selectedVariantOption,
  });

  function onSubmit() {
    console.log('yeay');
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Toaster />
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
      </form>
    </>
  );
}
