import { MainContent } from '@/layouts/mainContent';
import { ContentContainer } from '../fragments/container/contentContainer';
import { OrderContent } from '../fragments/order/order-content';

export function OrderPage() {
  return (
    <>
      <MainContent>
        <ContentContainer>
          <OrderContent />
        </ContentContainer>
      </MainContent>
    </>
  );
}
