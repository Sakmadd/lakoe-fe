import { Flex } from '@chakra-ui/react';
import { ContentContainer } from '../container/contentContainer';
import { ProductDetailImage } from './productDetail/product-detail-image';
import { ProductDetailText } from './productDetail/product-detail-text';
import { UseFormSetValue } from 'react-hook-form';
import { Product } from '@/types/product-type';
interface Props {
  product: Product;
  selectedVariantOption: string[];
  setSelectedVariantOption: React.Dispatch<React.SetStateAction<string[]>>;
  setvalue: UseFormSetValue<Product>;
}

export function ProductDetailContent({
  product,
  selectedVariantOption,
  setSelectedVariantOption,
  setvalue,
}: Props) {
  return (
    <>
      <ContentContainer>
        <Flex gap={'2rem'} padding={'1rem'}>
          <ProductDetailImage product={product} />
          <ProductDetailText
            setvalue={setvalue}
            selectedVariantOption={selectedVariantOption}
            setSelectedVariantOption={setSelectedVariantOption}
            product={product}
          />
        </Flex>
      </ContentContainer>
    </>
  );
}
