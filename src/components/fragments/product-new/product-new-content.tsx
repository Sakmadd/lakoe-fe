import { useProduct } from '@/hooks/use-product';
import { useVariants } from '@/hooks/use-variant';
import { ProductType } from '@/types/types';
import { finalProductFormGenerator } from '@/utils/final-product-form-generator';
import { ProductSchema } from '@/validators/product-new/product-new-schema';
import { Flex } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
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
  const [images, setImages] = useState<File[]>([]);
  const variantsHooks = useVariants();
  const { onPost } = useProduct();
  const { register, handleSubmit, setValue } = useForm<ProductType>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      images: [],
    },
  });

  const onSubmit: SubmitHandler<ProductType> = (data) => {
    setLoading(true);
    onPost(finalProductFormGenerator({ data, images, variantsHooks }));
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex flexDir={'column'} gap={'.5rem'}>
        <ProductInformationSection register={register} setValue={setValue} />
        <ProductDetailSection register={register} setImages={setImages} />
        <ProductVariantSection hooks={variantsHooks} />
        <ProductPriceSection register={register} />
        <ProductManagementSection register={register} />
        <ProductWeightShipmentSection register={register} />
        <ProductSaveSection loading={loading} />
      </Flex>
    </form>
  );
}
