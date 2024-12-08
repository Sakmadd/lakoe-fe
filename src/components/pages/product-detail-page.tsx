import { MainContent } from '@/layouts/mainContent';
import { ContentContainer } from '../fragments/container/contentContainer';
import { ProductDetailContent } from '../fragments/product-detail/product-content';
import { dummyProductDetail } from '@/dummy-data/dummyData';

export function ProductDetailPage() {
  const product = dummyProductDetail;
  return (
    <>
      <MainContent>
        <ContentContainer>
          <ProductDetailContent product={product} />
        </ContentContainer>
      </MainContent>
    </>
  );
}
