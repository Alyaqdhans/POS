import React from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import { Nav, NavLink } from 'reactstrap'
import System from "./settings/System";
import Categories from "./settings/Categories";
import Suppliers from "./settings/Suppliers";
import Customers from "./settings/Customers";
import Outlets from "./settings/Outlets";
import Payments from "./settings/Payments";
import { LuPackageOpen, LuUsersRound, LuWrench } from "react-icons/lu";
import { MdLabelOutline } from 'react-icons/md';
import { FaCodeBranch, FaRegCreditCard } from 'react-icons/fa';

function Settings() {
  const location = useLocation()

  return (
    <div className='content'>
      <Nav tabs className='Tabs mt-5'>
        <NavLink tag={Link} className='link' to='/settings' active={location.pathname === '/settings'}>
          <LuWrench/> System
        </NavLink>
        <NavLink tag={Link} className='link' to='/settings/categories' active={location.pathname === '/settings/categories'}>
          <MdLabelOutline/> Categories
        </NavLink>
        <NavLink tag={Link} className='link' to='/settings/customers' active={location.pathname === '/settings/customers'}>
          <LuUsersRound/> Customers
        </NavLink>
        <NavLink tag={Link} className='link' to='/settings/suppliers' active={location.pathname === '/settings/suppliers'}>
          <LuPackageOpen/> Suppliers
        </NavLink>
        <NavLink tag={Link} className='link' to='/settings/payments' active={location.pathname === '/settings/payments'}>
          <FaRegCreditCard/> Payments
        </NavLink>
        <NavLink tag={Link} className='link' to='/settings/outlets' active={location.pathname === '/settings/outlets'}>
          <FaCodeBranch/> Outlets
        </NavLink>
      </Nav>

      <Routes>
        <Route path="/" element={<System />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/suppliers" element={<Suppliers />} />
        <Route path="/Payments" element={<Payments />} />
        <Route path="/Outlets" element={<Outlets />} />
      </Routes>
    </div>
  )
}

export default Settings