import { Route, Routes } from 'react-router-dom';
import { BuyerLayout } from './layouts/buyerLayout';
import { HomePage } from './components/pages/home-page';
import { ProductDetailPage } from './components/pages/product-detail-page';
import { SellerLayout } from './layouts/sellerLayout';
import { ProductNewPage } from './components/pages/product-new-page';
import { DashboardPage } from './components/pages/seller-dashboard-page';
import { ProductPage } from './components/pages/product-page';
import { OrderPage } from './components/pages/order-page';
import { SettingsPage } from './components/pages/settings-page';
import OrderDetail from './components/pages/order-detail';
import SettingsShop from './components/pages/settings-shop';
import { AdminPage } from './components/pages/admin-page';
import { dummyLoggedUser } from './dummy-data/dummyData';

const loggedUser = dummyLoggedUser;

function App() {
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

export default App;
