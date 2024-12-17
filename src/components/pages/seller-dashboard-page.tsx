import { MainContent } from '@/layouts/mainContent';
import { DashboardStats } from '../fragments/dashboard/dashboardStats/dashboard-content';
import { useSelector } from 'react-redux';
import { StoreState } from '@/redux/store';
import { UnSetShopPage } from './unset-shop-page';

export function DashboardPage() {
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
        <DashboardStats />
      </MainContent>
    </>
  );
}
