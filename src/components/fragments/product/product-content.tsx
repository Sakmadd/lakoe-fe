import {
  dummyCategories,
  dummyProducts,
  dummySorts,
} from '@/dummy-data/dummyData';
import { Button, Flex, Spacer, Tabs, Text } from '@chakra-ui/react';
import { FaPlusCircle } from 'react-icons/fa';
import { TabsProductContent } from './tabs-product-content';
import { ProductGrouper } from '@/utils/product-grouper';

export function ProductContent() {
  const groupedProduct = ProductGrouper({ products: dummyProducts });
  return (
    <>
      <>
        <Flex alignItems={'center'}>
          <Text as="h1" fontWeight="bold" fontFamily="sans-serif">
            Product List
          </Text>
          <Spacer />
          <Button colorPalette={'gray'} variant="surface" borderRadius={'full'}>
            <FaPlusCircle />
            Add Product
          </Button>
        </Flex>
        <Tabs.Root defaultValue="all">
          <Tabs.List>
            <Tabs.Trigger value="all">All</Tabs.Trigger>
            <Tabs.Trigger value="active">Active</Tabs.Trigger>
            <Tabs.Trigger value="unactive">Unactive</Tabs.Trigger>
          </Tabs.List>
          <TabsProductContent
            products={dummyProducts}
            tabs_value="all"
            categories={dummyCategories}
            sorts={dummySorts}
          />
          <TabsProductContent
            products={groupedProduct.active}
            tabs_value="active"
            categories={dummyCategories}
            sorts={dummySorts}
          />
          <TabsProductContent
            products={groupedProduct.unactive}
            tabs_value="unactive"
            categories={dummyCategories}
            sorts={dummySorts}
          />
        </Tabs.Root>
      </>
    </>
  );
}
