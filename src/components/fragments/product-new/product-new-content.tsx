import { useVariants } from '@/hooks/use-variant';
import {
  ProductType,
  VariantOptionCombinationType,
  VariantType,
} from '@/types/types';
import { Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ProductSaveSection } from './product-new-sections/product-save';
import { ProductVariantSection } from './product-new-sections/product-variant';
import { variantsMerger } from '@/utils/variants-merger';
import { ProductPriceSection } from './product-new-sections/product-price';

export function ProductNewContent() {
  const [variantOptionCombinations, setVariantOptionCombinations] = useState<
    VariantOptionCombinationType[]
  >([]);

  const { register, handleSubmit, setValue } = useForm<ProductType>({
    defaultValues: {
      variants: [],
      variant_option_combinations: [],
    },
  });

  const variantsHooks = useVariants();

  const variants: VariantType[] = variantsMerger(
    variantsHooks.variants,
    variantsHooks.variantOptions
  );

  useEffect(() => {
    setValue('variants', variants);
    setValue('variant_option_combinations', variantOptionCombinations);
  }, [variantOptionCombinations, setValue, variantsHooks, variants]);

  const onSubmit: SubmitHandler<ProductType> = (data) => {
    console.log(variantOptionCombinations);
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex flexDir={'column'} gap={'.5rem'}>
        {/* <ProductInformationSection
          register={register}
          setValue={register}
          control={control}
        /> */}
        {/* <ProductDetailSection register={register} /> */}
        <ProductVariantSection hooks={variantsHooks} />
        <ProductPriceSection register={register} />
        {/* <ProductManagementSection register={register} /> */}
        {/* <ProductWeightShipmentSection register={register} /> */}
        <ProductSaveSection
          setVariantOptionCombinations={setVariantOptionCombinations}
          variantsHandleSubmit={variantsHooks.handleSubmit}
        />
      </Flex>
    </form>
  );
}
