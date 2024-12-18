import { useVariants } from '@/hooks/use-variant';
import { ProductType } from '@/types/types';
import { variantsMerger } from '@/utils/variants-merger';
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
import api from '@/networks/api';
import { useNavigate } from 'react-router-dom';

export function ProductNewContent() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const variantsHooks = useVariants();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<ProductType>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      images: [],
    },
  });

  const onSubmit: SubmitHandler<ProductType> = (data) => {
    setLoading(true);
    const body = {
      ...data,
      url_name: data.url,
      is_active: true,
      images: images,
      Variant: variantsMerger(
        variantsHooks.variants,
        variantsHooks.variantOptions
      ),
      VariantOptionCombination: variantsHooks.getValues().variants,
    };

    const formData = new FormData();

    formData.append('name', body.name);
    formData.append('url_name', body.url_name);
    formData.append('category_id', body.category_id);
    formData.append('description', body.description);
    formData.append('minimum_order', body.minimum_order.toString());
    formData.append('price', body.price.toString());
    formData.append('stock', body.stock.toString());
    formData.append('sku', body.sku);
    formData.append('weight', body.weight.toString());
    formData.append('length', body.length.toString());
    formData.append('width', body.width.toString());
    formData.append('height', body.height.toString());
    formData.append('is_active', body.is_active.toString());

    body.images.forEach((file) => {
      formData.append('Images', file);
    });

    formData.append('Variant', JSON.stringify(body.Variant));

    formData.append(
      'VariantOptionCombination',
      JSON.stringify(body.VariantOptionCombination)
    );

    console.log('FormData Entries:');
    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    api.CREATE_PRODUCT(formData).then(() => navigate(`/${body.url_name}`));
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex flexDir={'column'} gap={'.5rem'}>
        <ProductInformationSection
          errors={errors}
          register={register}
          setValue={setValue}
          control={control}
        />
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
