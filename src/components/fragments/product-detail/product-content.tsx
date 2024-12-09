import { Flex } from '@chakra-ui/react';
import { ProductDetailImage } from './productDetail/product-detail-image';
import { ProductDetailText } from './productDetail/product-detail-text';
import { ProductType } from '@/types/types';
import { ContentContainer } from '../container/contentContainer';
interface Props {
  product: ProductType;
}

export function ProductDetailContent({ product }: Props) {
  return (
    <>
      <ContentContainer>
        <Flex gap={'2rem'} padding={'1rem'}>
          <ProductDetailImage product={product} />
          <ProductDetailText product={product} />
        </Flex>
      </ContentContainer>
    </>
  );
}
