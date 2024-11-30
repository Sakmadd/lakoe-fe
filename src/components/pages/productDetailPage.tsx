import { MainContent } from '@/layouts/mainContent';
import { Flex } from '@chakra-ui/react';
import { ContentContainer } from '../fragments/container/contentContainer';
import { ProductDetailImage } from '../fragments/product/productDetail/productDetailImage';
import { ProductDetailText } from '../fragments/product/productDetail/productDetailText';

export function ProductDetailPage() {
  return (
    <>
      <MainContent>
        <ContentContainer>
          <Flex gap={'2rem'} padding={'1rem'}>
            <ProductDetailImage />
            <ProductDetailText />
          </Flex>
        </ContentContainer>
      </MainContent>
    </>
  );
}
