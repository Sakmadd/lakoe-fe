import { MainContent } from '@/layouts/mainContent';
import { ContentContainer } from '../fragments/container/contentContainer';
import { OrderContent } from '../fragments/order/order-content';
import { useSelector } from 'react-redux';
import { StoreState } from '@/redux/store';
import { UnSetShopPage } from './unset-shop-page';

export function OrderPage() {
  const loggedUser = useSelector((state: StoreState) => state.loggedUser.value);

  const hasNullPropertyInShop = loggedUser?.Shop
    ? Object.values(loggedUser.Shop).some((value) => value === null)
    : true;

  if (loggedUser && hasNullPropertyInShop) {
    return (
      <>
        <MainContent>
          <UnSetShopPage />
        </MainContent>
      </>
    );
  }
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
