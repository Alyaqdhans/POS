import React from 'react'
import { useNavigate } from 'react-router-dom'

function NotFound() {
  const navigate = useNavigate()

  return (
    <div className='notfound'>
      <header>404</header>
      <h1>The page you are trying to access doesn't exist :(</h1>
      <button className='btn btn-primary' onClick={() => navigate(-1)}>Go Back</button>
    </div>
  )
}

export default NotFound