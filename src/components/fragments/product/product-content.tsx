import { dummyCategories, dummySorts } from '@/dummy-data/dummyData';
import api from '@/networks/api';
import { SellerProductListType } from '@/types/types';
import { ProductGrouper } from '@/utils/product-grouper';
import { Button, Flex, Spacer, Spinner, Tabs, Text } from '@chakra-ui/react';
import { useEffect, useState, useMemo, useCallback } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { TabsProductContent } from './tabs-product-content';

export function ProductContent() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<SellerProductListType[] | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProduct = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.GET_SHOP_PRODUCTS();
      setProducts(response);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const groupedProduct = useMemo(() => {
    if (!products) return { active: [], unactive: [] };
    return ProductGrouper({ products });
  }, [products]);

  if (loading) {
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
  );
}
