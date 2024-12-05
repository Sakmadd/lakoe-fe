import { ProductType } from '@/types/types';
import { Flex } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ProductInformationSection } from './product-new-sections/product-information';
import { ProductSaveSection } from './product-new-sections/product-save';
import { ProductDetailSection } from './product-new-sections/product-detail';
import { ProductPriceSection } from './product-new-sections/product-price';
import { ProductManagementSection } from './product-new-sections/product-management';
import { ProductWeightShipmentSection } from './product-new-sections/product-weight-shipment';

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
        <ProductDetailSection register={register} />
        {/* <ProductVariantSection /> */}
        <ProductPriceSection register={register} />
        <ProductManagementSection register={register} />
        <ProductWeightShipmentSection register={register} />
        <ProductSaveSection />
      </Flex>
    </form>
  );
}
