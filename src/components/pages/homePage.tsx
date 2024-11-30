import { MainContent } from '@/layouts/mainContent';
import { ContentContainer } from '../fragments/container/contentContainer';
import { ProductContainer } from '../fragments/product/productContainer';

export function HomePage() {
  return (
    <>
      <MainContent>
        <ContentContainer>
          <ProductContainer />
        </ContentContainer>
      </MainContent>
    </>
  );
}
