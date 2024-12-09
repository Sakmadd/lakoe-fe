import { ProductType } from '@/types/types';
import { Flex } from '@chakra-ui/react';
import { ContentContainer } from '../container/contentContainer';
import { ProductDetailImage } from './productDetail/product-detail-image';
import { ProductDetailText } from './productDetail/product-detail-text';
interface Props {
  product: ProductType;
  selectedVariantOption: string[];
  setSelectedVariantOption: React.Dispatch<React.SetStateAction<string[]>>;
}

export function ProductDetailContent({
  product,
  selectedVariantOption,
  setSelectedVariantOption,
}: Props) {
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
