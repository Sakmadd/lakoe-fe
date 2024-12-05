import { Flex } from '@chakra-ui/react';
import { ProductDetailSection } from './product-new-sections/product-detail';
import { ProductInformationSection } from './product-new-sections/product-information';
import { ProductManagementSection } from './product-new-sections/product-management';
import { ProductPriceSection } from './product-new-sections/product-price';
import { ProductSaveSection } from './product-new-sections/product-save';
import { ProductVariantSection } from './product-new-sections/product-variant';
import { ProductWeightShipmentSection } from './product-new-sections/product-weight-shipment';

export function ProductNewContent() {
  return (
    <Flex flexDir={'column'} gap={'.5rem'}>
      <ProductInformationSection />
      <ProductDetailSection />
      <ProductVariantSection />
      <ProductPriceSection />
      <ProductManagementSection />
      <ProductWeightShipmentSection />
      <ProductSaveSection />
    </Flex>
  );
}
