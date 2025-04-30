import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { Navbar, NavItem, Nav } from 'reactstrap';
import { logout } from '../features/UserSlice';

function Header() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <Navbar>
        <Nav>
          <NavItem>
            <Link onClick={handleLogout}>
              Logout
            </Link>
          </NavItem>
        </Nav>
      </Navbar>
    </>
  )
}

export default Header;
