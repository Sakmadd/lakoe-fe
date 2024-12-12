import { Toaster, toaster } from '@/components/ui/toaster';
import { dummyProductDetail } from '@/dummy-data/dummyData';
import { useProductDetail } from '@/hooks/use-product-detail';
import { MainContent } from '@/layouts/mainContent';
import { ProductType } from '@/types/types';
import { Flex } from '@chakra-ui/react';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { ProductDetailContent } from '../fragments/product-detail/product-content';
import { ProductSpecification } from '../fragments/product-detail/productDetail/product-specification';

const product = dummyProductDetail;

export function ProductDetailPage() {
  const navigate = useNavigate(); // Initialize navigate
  const { handleSubmit, setValue } = useForm<ProductType>();
  const [selectedVariantOption, setSelectedVariantOption] = useState<string[]>(
    []
  );
  const { preparedProduct, selectedCombination } = useProductDetail({
    product,
    selectedVariantOption,
  });

  const onSubmit: SubmitHandler<ProductType> = (data) => {
    if (selectedVariantOption.length < preparedProduct.variants!.length) {
      toaster.create({
        title: 'Select All Product Variants',
        description: `You must select all ${preparedProduct.variants!.length} product variants before continuing.`,
        duration: 3000,
        type: 'error',
      });
      return;
    }

    const checkoutProduct: ProductType = {
      ...preparedProduct,
      selected_variant: selectedVariantOption,
      selected_combination: selectedCombination,
      checkout_quantity: data.checkout_quantity,
    };

    delete checkoutProduct.variants;
    delete checkoutProduct.variant_option_combinations;

    navigate('/checkout', { state: { checkoutProduct } });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Toaster />
        <MainContent>
          <Flex flexDir={'column'} gap={'1rem'}>
            <ProductDetailContent
              setvalue={setValue}
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
