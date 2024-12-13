import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AdminPage } from './components/pages/admin-page';
import { CheckoutPage } from './components/pages/checkout-page';
import { HomePage } from './components/pages/home-page';
import OrderDetail from './components/pages/order-detail';
import { OrderPage } from './components/pages/order-page';
import { ProductDetailPage } from './components/pages/product-detail-page';
import { ProductNewPage } from './components/pages/product-new-page';
import { ProductPage } from './components/pages/product-page';
import { DashboardPage } from './components/pages/seller-dashboard-page';
import { SettingsPage } from './components/pages/settings-page';
import SettingsShop from './components/pages/settings-shop';
import { BuyerLayout } from './layouts/buyerLayout';
import { SellerLayout } from './layouts/sellerLayout';
import { UserType } from './types/types';
import { dummyLoggedUser } from './dummy-data/dummyData';
import { LoginPage } from './components/pages/login-page';
import { RegisterPage } from './components/pages/register-page';

function App() {
  const [loggedUser] = useState<UserType | null>(dummyLoggedUser);
  if (loggedUser) {
    if (loggedUser.role === 'SELLER') {
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
          </Route>
        </Routes>
      );
    } else if (loggedUser.role === 'ADMIN') {
      return (
        <Routes>
          <Route path="/" element={<BuyerLayout />}>
            <Route index element={<AdminPage />} />
          </Route>
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
      </Route>
    </Routes>
  );
}

export default App;
