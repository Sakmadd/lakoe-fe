import { useVariants } from '@/hooks/use-variant';
import { ProductType } from '@/types/types';
import { Flex } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ProductInformationSection } from './product-new-sections/product-information';
import { ProductSaveSection } from './product-new-sections/product-save';
import { ProductVariantSection } from './product-new-sections/product-variant';
import { ProductWeightShipmentSection } from './product-new-sections/product-weight-shipment';

export function ProductNewContent() {
  const variantsHooks = useVariants();
  const { register, handleSubmit, control } = useForm<ProductType>({
    defaultValues: {
      variants: variantsHooks.getValues().variants,
    },
  });
  const onSubmit: SubmitHandler<ProductType> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex flexDir={'column'} gap={'.5rem'}>
        <ProductInformationSection
          register={register}
          setValue={register}
          control={control}
        />
        {/* <ProductDetailSection register={register} /> */}
        <ProductVariantSection hooks={variantsHooks} />
        {/* <ProductPriceSection register={register} /> */}
        {/* <ProductManagementSection register={register} /> */}
        <ProductWeightShipmentSection register={register} />
        <ProductSaveSection />
      </Flex>
    </form>
  );
}
