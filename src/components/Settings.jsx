import React from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import { Nav, NavLink as NL } from 'reactstrap'
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
        <Link className='link' to='/settings'>
          <NL active={location.pathname === '/settings'}><LuWrench/> System</NL>
        </Link>
        <Link className='link' to='/settings/categories'>
          <NL active={location.pathname === '/settings/categories'}><MdLabelOutline/> Categories</NL>
        </Link>
        <Link className='link' to='/settings/customers'>
          <NL active={location.pathname === '/settings/customers'}><LuUsersRound/> Customers</NL>
        </Link>
        <Link className='link' to='/settings/suppliers'>
          <NL active={location.pathname === '/settings/suppliers'}><LuPackageOpen/> Suppliers</NL>
        </Link>
        <Link className='link' to='/settings/payments'>
          <NL active={location.pathname === '/settings/payments'}><FaRegCreditCard/> Payments</NL>
        </Link>
        <Link className='link' to='/settings/outlets'>
          <NL active={location.pathname === '/settings/outlets'}><FaCodeBranch/> Outlets</NL>
        </Link>
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