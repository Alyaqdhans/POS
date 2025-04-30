import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
  const {user} = useSelector((state) => state.users);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user)
      navigate("/login")
  }, [user]);

  return (
    <div className='home'>
      <h1>Welcome</h1>
    </div>
  )
}

export default Home;
