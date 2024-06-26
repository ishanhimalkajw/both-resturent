import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './components/navbar/navbar';
import RegisterForm from './components/register/register';
import LoginForm from './components/login/login';
import CustomerMenu from './components/customer_page/customerMenu';
import CheckoutPage from './components/customer_page/customerCheckout';
import ReviewForm from './components/customer_page/reviewForm';
import AdminDashboard from './components/admin_page/dashboard';
import ManageBranches from './components/admin_page/branches/branches';
import ManageManagers from './components/admin_page/managers/managers';
import ManageWaiters from './components/admin_page/waiters/waiters';
import ManageChefs from './components/admin_page/chefs/chefs';
import ManageSuppliers from './components/admin_page/suppliers/supplier';
import ManageInventory from './components/admin_page/inverntory/inverntory';
import ManageMenuItems from './components/admin_page/menuItems/menuItems';
import ManagerDashboard from './components/manager_page/managerDashboard';
import ManagerWaiters from './components/manager_page/waiters/waiters';
import ManagerChefs from './components/manager_page/chefs/chefs';
import ManagerSuppliers from './components/manager_page/suppliers/supplier';
import ManagerInventory from './components/manager_page/inverntory/inverntory';
import ManagerMenuItems from './components/manager_page/menuItems/menuItems';
import SupplierDashboard from './components/supplier_page/supplierDashboard';
import SupplierInventory from './components/supplier_page/inverntory/inverntory';

const WelcomePage = () => (
  <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
    <h1 className="text-4xl font-bold mb-6">Welcome</h1>
    <div className="flex space-x-4 mb-4">
      <Link
        to="/register"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Register
      </Link>
      <Link
        to="/login"
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Login
      </Link>
    </div>
    <div className="flex space-x-4">
      {/* Button for Admin */}
      <Link
        to="/admin-dashboard"
        className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Admin
      </Link>
      {/* Button for Manager */}
      <Link
        to="/manager-dashboard"
        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Manager
      </Link>
      {/* Button for Supplier */}
      <Link
        to="/supplier-dashboard"
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Supplier
      </Link>
      {/* Button for User */}
      <Link
        to="/menu"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        User Menu
      </Link>
    </div>
  </div>
);

const App = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  return (
    <BrowserRouter>
      {isLoggedIn && <Navbar />}
      <Routes>
        <Route path='/' element={<WelcomePage />} />
        <Route path='/register' element={<RegisterForm />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/menu' element={<CustomerMenu />} />
        <Route path='/checkout' element={<CheckoutPage />} />
        <Route path='/review' element={<ReviewForm />} />

        <Route path='/manager-dashboard' element={<ManagerDashboard />} />
        <Route path="/manager/add-waiter" element={<ManagerWaiters />} />
        <Route path="/manager/add-chef" element={<ManagerChefs />} />
        <Route path="/manager/add-supplier" element={<ManagerSuppliers />} />
        <Route path="/manager/manage-inventory" element={<ManagerInventory />} />
        <Route path="/manager/manage-menuitems" element={<ManagerMenuItems />} />

        <Route path='/admin-dashboard' element={<AdminDashboard />} />
        <Route path="/admin/branches" element={<ManageBranches />} />
        <Route path="/admin/add-manager" element={<ManageManagers />} />
        <Route path="/admin/add-waiter" element={<ManageWaiters />} />
        <Route path="/admin/add-chef" element={<ManageChefs />} />
        <Route path="/admin/add-supplier" element={<ManageSuppliers />} />
        <Route path="/admin/manage-inventory" element={<ManageInventory />} />
        <Route path="/admin/manage-menuitems" element={<ManageMenuItems />} />

        <Route path='/supplier-dashboard' element={<SupplierDashboard />} />
        <Route path="/supplier/manage-inventory" element={<SupplierInventory />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
