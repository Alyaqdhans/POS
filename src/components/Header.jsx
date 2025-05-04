import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { Nav, Button } from 'reactstrap';
import { logout } from '../features/UserSlice';

function Header() {
  const { userList } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const dynamicLink = (e) => (e.isActive ? 'btn btn-primary' : 'btn btn-light')

  return (
    <Nav>
      <NavLink to="/" className={dynamicLink}>
        Home
      </NavLink>

      <NavLink to="/products" className={dynamicLink}>
        Products
      </NavLink>

      <NavLink to="/users" className={dynamicLink}>
        Users ({userList.length})
      </NavLink>

      <NavLink to="/settings" className={dynamicLink}>
        Settings
      </NavLink>

      <Button color="danger" onClick={handleLogout}>
        Logout
      </Button>
    </Nav>
  )
}

export default Header;
