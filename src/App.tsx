import { Route, Routes } from 'react-router-dom';
import { SellerLayout } from './layouts/sellerLayout';
import { HomePage } from './components/pages/homePage';
import { BuyerLayout } from './layouts/buyerLayout';
import { DashboardPage } from './components/pages/dashboardPage';
import { ProductPage } from './components/pages/productPage';
import { OrderPage } from './components/pages/orderPage';
import { SettingsPage } from './components/pages/settingsPage';
import { ProductDetailPage } from './components/pages/productDetailPage';

export const loggedUser = false;

function App() {
  if (!loggedUser) {
    return (
      <Routes>
        <Route path="/" element={<BuyerLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/:productName" element={<ProductDetailPage />} />
        </Route>
      </Routes>
    );
  }
  return (
    <Routes>
      <Route path="/" element={<SellerLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/orders" element={<OrderPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
