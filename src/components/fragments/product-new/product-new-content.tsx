import { ProductType } from '@/types/types';
import { Flex } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ProductInformationSection } from './product-new-sections/product-information';
import { ProductSaveSection } from './product-new-sections/product-save';

export function ProductNewContent() {
  const { register, handleSubmit } = useForm<ProductType>({
    defaultValues: {
      name: '',
      url: '',
      category_id: '',
      is_active: true,
      price: 0,
      sku: '',
      stock: 0,
    },
  });
  const onSubmit: SubmitHandler<ProductType> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex flexDir={'column'} gap={'.5rem'}>
        <ProductInformationSection register={register} setValue={register} />
        {/* <ProductDetailSection />
        <ProductVariantSection />
        <ProductPriceSection />
        <ProductManagementSection />
        <ProductWeightShipmentSection /> */}
        <ProductSaveSection />
      </Flex>
    </form>
  );
}
