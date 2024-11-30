import { Route, Routes } from 'react-router-dom';
import { SellerLayout } from './layouts/sellerLayout';
import { HomePage } from './components/pages/homePage';
import { BuyerLayout } from './layouts/buyerLayout';

const loggedUser = true;

function App() {
  if (!loggedUser) {
    return (
      <Routes>
        <Route path="/" element={<BuyerLayout />}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    );
  }
  return (
    <Routes>
      <Route path="/" element={<SellerLayout />}>
        <Route index element={<HomePage />} />
      </Route>
    </Routes>
  );
}

export default App;
