import React, { useEffect } from 'react'
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { Nav, NavLink } from 'reactstrap'
import System from "./settings/System";
import Categories from "./settings/Categories";
import Suppliers from "./settings/Suppliers";
import Customers from "./settings/Customers";
import Branches from "./settings/Branches";
import Payments from "./settings/Payments";
import { LuPackageOpen, LuUsersRound, LuWrench } from "react-icons/lu";
import { MdLabelOutline } from 'react-icons/md';
import { FaCodeBranch, FaRegCreditCard } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../features/CategorySlice';
import { getCustomers } from '../features/CustomerSlice';
import { getSuppliers } from '../features/SupplierSlice';

function Settings() {
  const location = useLocation();
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const { categoryList } = useSelector((state) => state.categories);
  const { customerList } = useSelector((state) => state.customers);
  const { supplierList } = useSelector((state) => state.suppliers);

  useEffect(() => {
    dispatch(getCategories())
    dispatch(getCustomers());
    dispatch(getSuppliers());
  }, [navigate]);

  return (
    <div className='content'>
      <Nav tabs className='Tabs'>
        <NavLink tag={Link} className='link' to='/settings' active={location.pathname === '/settings'}>
          <LuWrench/> System
        </NavLink>
        <NavLink tag={Link} className='link' to='/settings/categories' active={location.pathname === '/settings/categories'}>
          <MdLabelOutline/> Categories ({categoryList.length})
        </NavLink>
        <NavLink tag={Link} className='link' to='/settings/customers' active={location.pathname === '/settings/customers'}>
          <LuUsersRound/> Customers ({customerList.length})
        </NavLink>
        <NavLink tag={Link} className='link' to='/settings/suppliers' active={location.pathname === '/settings/suppliers'}>
          <LuPackageOpen/> Suppliers ({supplierList.length})
        </NavLink>
        <NavLink tag={Link} className='link' to='/settings/payments' active={location.pathname === '/settings/payments'}>
          <FaRegCreditCard/> Payments
        </NavLink>
        <NavLink tag={Link} className='link' to='/settings/branches' active={location.pathname === '/settings/branches'}>
          <FaCodeBranch/> Branches
        </NavLink>
      </Nav>

      <Routes>
        <Route path="/" element={<System />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/suppliers" element={<Suppliers />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/branches" element={<Branches />} />
      </Routes>
    </div>
  )
}

export default Settings