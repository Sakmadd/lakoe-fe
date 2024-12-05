import { MainContent } from '@/layouts/mainContent';
import { ContentContainer } from '../fragments/container/contentContainer';
import { ProductDetailContent } from '../fragments/product-detail/product-content';

export function ProductDetailPage() {
  return (
    <>
      <MainContent>
        <ContentContainer>
          <ProductDetailContent />
        </ContentContainer>
      </MainContent>
    </>
  );
}
