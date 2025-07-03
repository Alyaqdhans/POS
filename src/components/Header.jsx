import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom';
import { Nav, Button, Spinner } from 'reactstrap';
import { getUsers, logout } from '../features/UserSlice';
import { MdLogout } from 'react-icons/md';
import { FaCog, FaHome, FaUsers } from "react-icons/fa";
import { BiSolidPackage } from "react-icons/bi";

function Header() {
  const { user, userList, status } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getUsers());
  }, [navigate]);

  const handleLogout = () => {
    dispatch(logout());
  };

  const dynamicLink = (e) => (e.isActive ? 'btn btn-primary' : 'btn btn-light')

  return (
    <Nav className='Nav'>
      <NavLink to="/" className={dynamicLink}><FaHome/> Home</NavLink>

      {
        (user.permissions.products.read == true) &&
        <NavLink to="/products" className={dynamicLink}><BiSolidPackage/> Products</NavLink>
      }

      {
        (user.permissions.users.read == true) &&
        <NavLink to="/users" className={dynamicLink}><FaUsers/> Users ({userList.length})</NavLink>
      }

      <NavLink to="/settings" className={dynamicLink}><FaCog/> Settings</NavLink>

      <span className='userInfo'>
        <Button disabled>{user?.username}</Button>
        <Button color='danger' onClick={handleLogout} disabled={status === "pendingLogout"}>
          {(status === "pendingLogout") ? <Spinner size='sm' /> : <MdLogout size={22} />}
        </Button>
      </span>
    </Nav>
  )
}

export default Header;
