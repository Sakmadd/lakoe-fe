import { MainContent } from '@/layouts/mainContent';
import { Flex } from '@chakra-ui/react';
import { CategoryItem } from '../fragments/buyer/category-item';
import { ContentContainer } from '../fragments/container/contentContainer';
import { ProductList } from '../fragments/product-detail/product-list';
import { showedCategories } from '@/dummy-data/dummyData';

export function HomePage() {
  const categories = showedCategories;
  return (
    <>
      <MainContent>
        <Flex gap={'2rem'} flexDir={'column'}>
          <ContentContainer>
            <Flex as="ul" flexWrap="wrap" justifyContent={'center'}>
              {categories.slice(0, 18).map((cat) => (
                <CategoryItem key={cat.id} category={cat} />
              ))}
            </Flex>
          </ContentContainer>
          <ContentContainer>
            <ProductList />
          </ContentContainer>
        </Flex>
      </MainContent>
    </>
  );
}
