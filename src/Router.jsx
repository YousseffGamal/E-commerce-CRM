import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Pages/login/login';
import CRM from "./Pages/crm/CRM";
import Sidebar from "./component/sidebar/Sidebar";
import AddProduct from "./Pages/addProducts/Add Products";
// import Settings from "./Pages/Settings/Setting";
import Orders from './Pages/orders/Orders';
import Products  from './Pages/Products/Products';
import Reports  from './Pages/reports/Reports';
import AddRole from "./Pages/AddRole/AddRole"; 
import BrandPage from "./Pages/BrandPage/BrandPage"; 
import AddAdmin from "./Pages/AddAdmin/AddAdmin"; 
import AddCategory from "./Pages/AddCategory/AddCategory"; 
import AddSubcategory  from "./Pages/AddSubcategory/AddSubcategory"; 
import UsersView  from "./Pages/UsersView/UsersView"; 
import Category from "./Pages/Category/Category"
import Subcategory  from "./Pages/Subcategory/Subcategory"; 
import Roles  from "./Pages/Roles/Roles"; 
import ProtectedRoute from './utiliteis/protectedRoute';
import Brand from './Pages/Brand/Brand';


const AppRouter = () => {
  return (
    <Router>
   
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoute redirectTo="/" />}>
        
        
        <Route path="/crm" element={<CRM />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/addproduct" element={<AddProduct />} />
        {/* <Route path="/Settings" element={<Settings />} /> */}
        <Route path="/orders" element={<Orders />} />
        <Route path="/products" element={<Products />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/addrole" element={<AddRole />} />
        <Route path="/addbrand" element={<BrandPage />} />
        <Route path="/addadmin" element={<AddAdmin />} />
        <Route path="/addcategory" element={<AddCategory />} />
        <Route path="/addsubcategory" element={<AddSubcategory />} />
        <Route path="/usersview" element={<UsersView />} />
        <Route path="/category" element={<Category />} />
        <Route path="/subcategory" element={<Subcategory />} />
        <Route path="/roles" element={<Roles />} />
        <Route path="/brand" element={<Brand />} />




        
        
        </Route>
       
      






      </Routes>
    </Router>
  );
};

export default AppRouter;
