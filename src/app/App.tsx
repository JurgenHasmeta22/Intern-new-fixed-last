import AppNavigate from './AppNavigate'
import PrivateRoute from './private-route';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import TestPage from '../pages/test'
import DashboardPage from '../pages/dashboard/DashboardPage'
import LoginPage from "../pages/login/LoginPage"
import RegisterPage from "../pages/register/RegisterPage"
import ErrorPage from "../pages/error/ErrorPage"
import ProductItemPage from "../pages/productItem/ProductItemPage"
import CartPage from "../pages/cart/CartPage"
import UserProfilePage from "../pages/user/UserProfilePage"
import CheckoutPage from "../pages/checkout/CheckoutPage"
import CreateBankAccountPage from "../pages/bankAccount/CreateBankAccountPage"

import "../app/App.css"

const App = () => {

  return (

    <BrowserRouter>

      <AppNavigate />

      <Routes>

        <Route index element={<Navigate replace to="/login" />} />

        <Route path="*" element={<ErrorPage/>} />

        <Route path="/dashboard" element={<PrivateRoute><DashboardPage/></PrivateRoute>} />

        <Route path="/login" element={<PrivateRoute isPageLogin><LoginPage /></PrivateRoute>} />        
        <Route path="/register" element= {<PrivateRoute isPageLogin><RegisterPage /></PrivateRoute>} />

        <Route path="/products/:id" element= {<PrivateRoute><ProductItemPage /></PrivateRoute>} />

        <Route path="/:username/cart" element= {<PrivateRoute><CartPage /></PrivateRoute>} />
        
        <Route path="/profile/:username" element= {<PrivateRoute><UserProfilePage /></PrivateRoute>} />
        <Route path="/transaction/:id/checkout" element= {<PrivateRoute><CheckoutPage /></PrivateRoute>} />
        
        <Route path="/profile/:username/:tab" element = { <UserProfilePage /> } />
        <Route path="/profile/:username/:tab/page/:pageNumber" element = { <UserProfilePage /> } />
        
        <Route path="/createBankAccount" element= {<PrivateRoute><CreateBankAccountPage /></PrivateRoute>} />

      </Routes>

    </BrowserRouter>

  );

};

export default App;