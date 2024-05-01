import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Products from './Pages/Products/Products';
import SignIn from './Pages/SignIn/SignIn';
import SignUp from './Pages/SignUp/SignUp';
import Orders from './Pages/Orders/Orders';
import CreateProducts from './Pages/CreateProducts/CreateProducts';
import Checkout from './Pages/Checkout/Checkout';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/products" Component={Products} />
        <Route path="/" Component={Home} />
        <Route path="/sign-in" Component={SignIn} />
        <Route path="/sign-up" Component={SignUp} />
        <Route path="/orders" Component={Orders} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/admin/create-products" Component={CreateProducts} />
      </Routes>
    </Router>
  );
};

export default App;
