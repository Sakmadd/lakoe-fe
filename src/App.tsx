import { Route, Routes } from 'react-router-dom';
import { DashboardPage } from './components/pages/dashboardPage';
import { HomePage } from './components/pages/homePage';
import { OrderPage } from './components/pages/orderPage';
import { ProductDetailPage } from './components/pages/productDetailPage';
import { ProductPage } from './components/pages/productPage';
import { SettingsPage } from './components/pages/settingsPage';
import { BuyerLayout } from './layouts/buyerLayout';
import { SellerLayout } from './layouts/sellerLayout';

export const loggedUser = true;

function App() {
  if (!loggedUser) {
    return (
      <Routes>
        <Route path="/" element={<BuyerLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/:productName" element={<ProductDetailPage />} />
          <Route path="/orders/:orderId" element={<div>order detail</div>} />
        </Route>
      </Routes>
    );
  }
  return (
    <Routes>
      <Route path="/" element={<SellerLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/:productName" element={<ProductDetailPage />} />
        <Route path="/orders/:orderId" element={<div>order detail</div>} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/orders" element={<OrderPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
