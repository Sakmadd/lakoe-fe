import { showedCategories } from '@/dummy-data/dummyData';
import { MainContent } from '@/layouts/mainContent';
import { ProductsListType } from '@/types/types';
import { Flex, Spinner, Text } from '@chakra-ui/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { CategoryItem } from '../fragments/buyer/category-item';
import { ContentContainer } from '../fragments/container/contentContainer';
import { ProductList } from '../fragments/product-detail/product-list';
import api from '@/networks/api';

export function HomePage() {
  const categories = showedCategories;
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<ProductsListType[] | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.GET_ALL_PRODUCTS();
      setProducts(response);
    } catch {
      return <>Something went Wrong!</>;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const renderedCategories = useMemo(
    () =>
      categories
        .slice(0, 18)
        .map((cat) => <CategoryItem key={cat.id} category={cat} />),
    [categories]
  );

  return (
    <>
      <MainContent>
        <Flex gap={'2rem'} flexDir={'column'}>
          <ContentContainer>
            <Flex as="ul" flexWrap="wrap" justifyContent={'center'}>
              {renderedCategories}
            </Flex>
          </ContentContainer>
          <ContentContainer>
            {loading ? (
              <Flex justifyContent="center" alignItems="center">
                <Spinner size="xl" color="teal.500" />
              </Flex>
            ) : products && products.length > 0 ? (
              <ProductList products={products} />
            ) : (
              <Text textAlign="center" fontSize="lg">
                Tidak ada produk yang tersedia.
              </Text>
            )}
          </ContentContainer>
        </Flex>
      </MainContent>
    </>
  );
}
