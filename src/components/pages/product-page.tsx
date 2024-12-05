import { MainContent } from '@/layouts/mainContent';
import { ContentContainer } from '../fragments/container/contentContainer';
import { ProductContent } from '../fragments/product/product-content';

export function ProductPage() {
  return (
    <>
      <MainContent>
        <ContentContainer>
          <ProductContent />
        </ContentContainer>
      </MainContent>
    </>
  );
}
