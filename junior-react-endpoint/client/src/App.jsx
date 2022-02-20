import './App.css';

import {
  Routes,
  Route
} from "react-router-dom";
import LayoutPage from './components/LayoutPage/LayoutPage';
import HomePage from './components/HomePage/HomePage';
import ProductDetailsPage from './components/ProductDetailsPage/ProductDetailsPage';
import ProductListPage from './components/ProductListPage/ProductListPage';
import CartPage from './components/CartPage/CartPage';

function App() {
  return (
    <div className="container">
     <Routes>
      <Route path="/" element={<LayoutPage />}>
        <Route index element={<HomePage />} />
        <Route path='/:productsCategory/list' element={<ProductListPage />} />
        <Route path='/details' element={<ProductDetailsPage />} />
        <Route path='/cart' element={<CartPage />} />

      </Route>
    </Routes>
    </div>
  );
}

export default App;
