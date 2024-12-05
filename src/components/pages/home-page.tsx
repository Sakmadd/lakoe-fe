import { MainContent } from '@/layouts/mainContent';
import { ContentContainer } from '../fragments/container/contentContainer';
import { ProductList } from '../fragments/product-detail/product-list';

export function HomePage() {
  return (
    <>
      <MainContent>
        <ContentContainer>
          <ProductList />
        </ContentContainer>
      </MainContent>
    </>
  );
}
