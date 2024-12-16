import { MainContent } from '@/layouts/mainContent';
import { ContentContainer } from '../fragments/container/contentContainer';
import { ProductContent } from '../fragments/product/product-content';
import { useSelector } from 'react-redux';
import { StoreState } from '@/redux/store';
import { UnSetShopPage } from './unset-shop-page';

export function ProductPage() {
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
          <ProductContent />
        </ContentContainer>
      </MainContent>
    </>
  );
}
