import React from 'react'
import Counter from './Counter';

function Settings() {
  return (
    <div className='content'>
      <h1>Settings</h1>
      <Counter initialCount={5} />
    </div>
  )
}

export default Settings