import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ShopPage from './pages/ShopPage';
import { VerifyUserPage } from './pages/VerifyUserPage/verify';

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/' element={<VerifyUserPage />}>
        <Route path=':shop' element={<ShopPage />} />
      </Route>
    </Routes>
  );
};

export default Router;
