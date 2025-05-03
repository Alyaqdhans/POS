import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Settings() {
  const {user} = useSelector((state) => state.users);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login")
  }, [user]);

  return (
    <div className='content'>
      <h1>Settings</h1>
    </div>
  )
}

export default Settings