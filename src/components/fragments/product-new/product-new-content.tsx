import { useVariants } from '@/hooks/use-variant';
import { ProductType } from '@/types/types';
import { variantsMerger } from '@/utils/variants-merger';
import { Flex } from '@chakra-ui/react';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ProductDetailSection } from './product-new-sections/product-detail';
import { ProductInformationSection } from './product-new-sections/product-information';
import { ProductManagementSection } from './product-new-sections/product-management';
import { ProductPriceSection } from './product-new-sections/product-price';
import { ProductSaveSection } from './product-new-sections/product-save';
import { ProductVariantSection } from './product-new-sections/product-variant';
import { ProductWeightShipmentSection } from './product-new-sections/product-weight-shipment';

export function ProductNewContent() {
  const [loading, setLoading] = useState(false);
  const variantsHooks = useVariants();
  const { register, handleSubmit, control, setValue } = useForm<ProductType>();

  const onSubmit: SubmitHandler<ProductType> = (data) => {
    setLoading(true);
    const body: ProductType = {
      ...data,
      variants: variantsMerger(
        variantsHooks.variants,
        variantsHooks.variantOptions
      ),
      variant_option_combinations: variantsHooks.getValues().variants,
    };
    console.log(body);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex flexDir={'column'} gap={'.5rem'}>
        <ProductInformationSection
          register={register}
          setValue={setValue}
          control={control}
        />
        <ProductDetailSection register={register} />
        <ProductVariantSection hooks={variantsHooks} />
        <ProductPriceSection register={register} />
        <ProductManagementSection register={register} />
        <ProductWeightShipmentSection register={register} />
        <ProductSaveSection loading={loading} />
      </Flex>
    </form>
  );
}
