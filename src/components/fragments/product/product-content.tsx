import { Button, Flex, Spacer, Tabs, Text } from '@chakra-ui/react';
import { TabsProductContent } from './tabs-product-content';
import { dummyProducts } from '@/dummy-data/dummyData';
import { FaPlusCircle } from 'react-icons/fa';

export function ProductContent() {
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
            <Tabs.Trigger value="unpaid">Active</Tabs.Trigger>
            <Tabs.Trigger value="new">Unactive</Tabs.Trigger>
          </Tabs.List>
          <TabsProductContent
            products={dummyProducts}
            tabs_value="all"
            categories={categories}
            sorts={sorts}
          />
        </Tabs.Root>
      </>
    </>
  );
}

const categories = [
  { label: 'Jne', value: 'jne' },
  { label: 'Anter aja', value: 'anteraja' },
  { label: 'Jnt', value: 'jnt' },
];

const sorts = [
  { label: 'Newest', value: 'new' },
  { label: 'Oldest', value: 'old' },
];
