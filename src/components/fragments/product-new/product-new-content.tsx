import { Flex } from '@chakra-ui/react';
import { ProductInformationSection } from './product-new-sections/product-information';
import { ProductDetailSection } from './product-new-sections/product-detail';
import { ProductVariantSection } from './product-new-sections/product-variant';
import { ProductPriceSection } from './product-new-sections/product-price';
import { ProductManagementSection } from './product-new-sections/product-management';

export function ProductNewContent() {
  return (
    <Flex flexDir={'column'} gap={'.5rem'}>
      <ProductInformationSection />
      <ProductDetailSection />
      <ProductVariantSection />
      <ProductPriceSection />
      <ProductManagementSection />
    </Flex>
  );
}
