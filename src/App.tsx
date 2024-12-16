import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { AdminPage } from './components/pages/admin-page';
import { CheckoutPage } from './components/pages/checkout-page';
import { HomePage } from './components/pages/home-page';
import { LoginPage } from './components/pages/login-page';
import OrderDetail from './components/pages/order-detail';
import { OrderPage } from './components/pages/order-page';
import { ProductDetailPage } from './components/pages/product-detail-page';
import { ProductNewPage } from './components/pages/product-new-page';
import { ProductPage } from './components/pages/product-page';
import ProfileShop from './components/pages/profile-shop';
import ProfileShopMe from './components/pages/profile-shop-me';
import { RegisterPage } from './components/pages/register-page';
import { DashboardPage } from './components/pages/seller-dashboard-page';
import { SettingsPage } from './components/pages/settings-page';
import SettingsShop from './components/pages/settings-shop';
import { BuyerLayout } from './layouts/buyerLayout';
import { SellerLayout } from './layouts/sellerLayout';
import { StoreState } from './redux/store';
import { useEffect } from 'react';
import {
  unSetLoggedUser,
  setLoggeduser,
} from './redux/features/logged-user-slice';
import { UserType } from './types/types';
import api from './networks/api';
import { setPreloaded } from './redux/features/is-preloaded-slice';

function App() {
  const dispatch = useDispatch();
  const isPreloaded = useSelector(
    (state: StoreState) => state.isPreloaded.value
  );
  const loggedUser = useSelector((state: StoreState) => state.loggedUser.value);
  console.log(loggedUser);

  useEffect(() => {
    async function initializeApp() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          dispatch(unSetLoggedUser());
          return;
        }
        const loggedUser: UserType = await api.GET_LOGGED_USER();
        if (loggedUser) {
          dispatch(setLoggeduser(loggedUser));
        }
      } catch {
        dispatch(unSetLoggedUser());
      } finally {
        dispatch(setPreloaded(false));
      }
    }
    initializeApp();
  }, [dispatch]);

  if (isPreloaded) {
    return (
      <>
        <>LOAD DULU BANH</>
      </>
    );
  }
  if (loggedUser) {
    if (loggedUser.role === 'seller') {
      return (
        <Routes>
          <Route path="/" element={<SellerLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/:productName" element={<ProductDetailPage />} />
            <Route path="/products/new" element={<ProductNewPage />} />
            {/* <Route path="/orders/:orderId" element={<OrderItem} /> */}
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/orders" element={<OrderPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/orders/:id" element={<OrderDetail />} />
            <Route path="/settings/shop" element={<SettingsShop />} />
            <Route path="/profile/shop" element={<ProfileShopMe />} />
            <Route path="/profile/shop/:id" element={<ProfileShop />} />
            <Route path="/profile/shop" element={<ProfileShopMe />} />
            <Route path="/profile/shop/:id" element={<ProfileShop />} />
          </Route>
        </Routes>
      );
    } else if (loggedUser.role === 'admin') {
      return (
        <Routes>
          <Route path="/" element={<BuyerLayout />}>
            <Route index element={<AdminPage />} />
          </Route>
          <Route path="/profile/shop/:id" element={<ProfileShop />} />
          <Route path="/profile/shop/:id" element={<ProfileShop />} />
        </Routes>
      );
    }
  }
  return (
    <Routes>
      <Route path="/" element={<BuyerLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/:productName" element={<ProductDetailPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/orders/:orderId" element={<OrderDetail />} />
        <Route path="/profile/shop/:id" element={<ProfileShop />} />
        <Route path="/profile/shop/:id" element={<ProfileShop />} />
      </Route>
    </Routes>
  );
}

export default App;
