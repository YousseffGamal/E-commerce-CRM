import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Pages/login/login';
import CRM from "./Pages/crm/CRM";
import Sidebar from "./component/sidebar/Sidebar";
import AddProduct from "./Pages/addProducts/Add Products";
// import Settings from "./Pages/Settings/Setting";
import Orders from './Pages/orders/Orders';
import ManageProducts  from './Pages/editAndDeleteProducts/Edit And Delete Products';
import Reports  from './Pages/reports/Reports';
import AddRole from "./Pages/AddRole/AddRole"; // Adjust the import path as needed
import BrandPage from "./Pages/BrandPage/BrandPage"; // Adjust the import path as needed
import AddAdmin from "./Pages/AddAdmin/AddAdmin"; // Adjust the import path as needed
import AddCategory from "./Pages/AddCategory/AddCategory"; // Adjust the import path as needed
import AddSubcategory  from "./Pages/AddSubcategory/AddSubcategory"; // Adjust the import path as needed
import UsersView  from "./Pages/UsersView/UsersView"; // Adjust the import path as needed
import Category from "./Pages/Category/Category"

import Subcategory  from "./Pages/Subcategory/Subcategory"; // Adjust the import path as needed


const AppRouter = () => {
  return (
    <Router>
   
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/crm" element={<CRM />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/addproduct" element={<AddProduct />} />
        {/* <Route path="/Settings" element={<Settings />} /> */}
        <Route path="/orders" element={<Orders />} />
        <Route path="/manageproducts" element={<ManageProducts />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/addrole" element={<AddRole />} />
        <Route path="/brandpage" element={<BrandPage />} />
        <Route path="/addadmin" element={<AddAdmin />} />
        <Route path="/addcategory" element={<AddCategory />} />
        <Route path="/addsubcategory" element={<AddSubcategory />} />
        <Route path="/usersview" element={<UsersView />} />
        <Route path="/category" element={<Category />} />
        <Route path="/subcategory" element={<Subcategory />} />




      






      </Routes>
    </Router>
  );
};

export default AppRouter;
