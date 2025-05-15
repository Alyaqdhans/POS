import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { Nav, Button, Spinner } from 'reactstrap';
import { getUsers, logout } from '../features/UserSlice';
import { MdLogout } from 'react-icons/md';

function Header() {
  const { user, userList, status } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };

  const dynamicLink = (e) => (e.isActive ? 'btn btn-primary' : 'btn btn-light')

  return (
    <Nav>
      <NavLink to="/" className={dynamicLink}>Home</NavLink>

      {
        (user.permissions.products.read == true) &&
        <NavLink to="/products" className={dynamicLink}>Products</NavLink>
      }

      {
        (user.permissions.users.read == true) &&
        <NavLink to="/users" className={dynamicLink}> Users ({userList.length})</NavLink>
      }

      <NavLink to="/settings" className={dynamicLink}>Settings</NavLink>

      <Button color='danger' onClick={handleLogout} disabled={status === "pendingLogout"}>
        {(status === "pendingLogout") ? <Spinner size='sm' /> : <MdLogout size={22} />}
      </Button>
    </Nav>
  )
}

export default Header;
