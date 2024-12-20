import { dummyCategories, dummySorts } from '@/dummy-data/dummyData';
import { useProduct } from '@/hooks/use-product';
import { Button, Flex, Spacer, Spinner, Tabs, Text } from '@chakra-ui/react';
import { FaPlusCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { TabsProductContent } from './tabs-product-content';

export function ProductContent() {
  const navigate = useNavigate();

  const { products, isLoading, groupedProducts } = useProduct();

  if (isLoading) {
    return (
      <Flex justifyContent="center" alignItems="center" h="50vh">
        <Spinner size="xl" color="teal.500" />
      </Flex>
    );
  }

  if (!products) {
    return (
      <Flex justifyContent="center" alignItems="center" h="50vh">
        <Text fontSize="lg">Produk kosong banh</Text>
      </Flex>
    );
  }

  return (
    <>
      <Flex alignItems="center" mb={4}>
        <Text as="h1" fontWeight="bold" fontFamily="sans-serif">
          Product List
        </Text>
        <Spacer />
        <Button
          colorScheme="teal"
          variant="subtle"
          borderRadius="full"
          onClick={() => navigate('/products/new')}
        >
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
          products={products}
          tabs_value="all"
          categories={dummyCategories}
          sorts={dummySorts}
        />
        <TabsProductContent
          products={groupedProducts.active}
          tabs_value="active"
          categories={dummyCategories}
          sorts={dummySorts}
        />
        <TabsProductContent
          products={groupedProducts.unactive}
          tabs_value="unactive"
          categories={dummyCategories}
          sorts={dummySorts}
        />
      </Tabs.Root>
    </>
  );
}
