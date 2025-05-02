import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Home() {
  const {user} = useSelector((state) => state.users);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login")
  }, [user]);

  return (
    <>
      <h1>Welcome</h1>
    </>
  )
}

export default Home;
