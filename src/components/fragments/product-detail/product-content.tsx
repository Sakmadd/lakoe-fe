import { ProductType } from '@/types/types';
import { Flex } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { ContentContainer } from '../container/contentContainer';
import { ProductDetailImage } from './productDetail/product-detail-image';
import { ProductDetailText } from './productDetail/product-detail-text';
interface Props {
  product: ProductType;
}

export function ProductDetailContent({ product }: Props) {
  const [selectedVariantOption, setSelectedVariantOption] = useState<string[]>(
    []
  );
  const selectedCombination = useMemo(() => {
    const selectedValues = selectedVariantOption
      .map((option) => option.split(' - ')[1])
      .sort();

    return product.variant_option_combinations!.find((variant) => {
      const variantValues = variant.name.split(' - ').sort();
      return JSON.stringify(variantValues) === JSON.stringify(selectedValues);
    });
  }, [selectedVariantOption, product.variant_option_combinations]);

  useEffect(() => {
    console.log(selectedCombination);
  });

  return (
    <>
      <ContentContainer>
        <Flex gap={'2rem'} padding={'1rem'}>
          <ProductDetailImage product={product} />
          <ProductDetailText
            selectedVariantOption={selectedVariantOption}
            setSelectedVariantOption={setSelectedVariantOption}
            product={product}
          />
        </Flex>
      </ContentContainer>
    </>
  );
}
