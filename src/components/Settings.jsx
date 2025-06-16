import React from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import { Nav, NavLink as NL } from 'reactstrap'
import SettingsIndex from "./settings/index";
import Categories from "./settings/Categories";
import Suppliers from "./settings/Suppliers";
import Customers from "./settings/Customers";
import Outlets from "./settings/Outlets";
import Payments from "./settings/Payments";

function Settings() {
  const location = useLocation()

  return (
    <div className='content'>
      <Nav tabs className='Tabs mt-5'>
        <NL active={location.pathname === '/settings'}>
          <Link className='link' to='/settings'>System</Link>
        </NL>
        <NL active={location.pathname === '/settings/categories'}>
          <Link className='link' to='/settings/categories'>Categories</Link>
        </NL>
        <NL active={location.pathname === '/settings/customers'}>
          <Link className='link' to='/settings/customers'>Customers</Link>
        </NL>
        <NL active={location.pathname === '/settings/suppliers'}>
          <Link className='link' to='/settings/suppliers'>Suppliers</Link>
        </NL>
        <NL active={location.pathname === '/settings/payments'}>
          <Link className='link' to='/settings/payments'>Payments</Link>
        </NL>
        <NL active={location.pathname === '/settings/outlets'}>
          <Link className='link' to='/settings/outlets'>Outlets</Link>
        </NL>
      </Nav>

      <Routes>
        <Route path="/" element={<SettingsIndex />} />
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