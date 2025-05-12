import React, { useState } from 'react'

function Counter({ initialCount }) {
  const [count, setCounter] = useState(initialCount)
  const increment = () => {
    setCounter((prev) => prev + 1)
  }
  const decrement = () => {
    setCounter((prev) => prev - 1);
  }
  const restart = () => {
    setCounter(0)
  }
  const switchSigns = () => {
    setCounter((prev) => prev * -1)
  }

  return (
    <fieldset className='rounded px-3 pb-3 mt-5' style={{ border: "1px solid black" }}>
      <legend className='text-center px-2' style={{ float: "none", width: "fit-content" }}>Counter</legend>

      <h3 data-testid="count" className='text-center'>{count}</h3>

      <button role='increment' data-testid="increment" className='btn btn-success' onClick={increment}>
        Increment
      </button>
      <button data-testid="decrement" className='btn btn-danger' onClick={decrement}>
        Decrement
      </button>
      <button data-testid="restart" className='btn btn-secondary' onClick={restart}>
        Restart
      </button>
      <button data-testid="switchsign" className='btn btn-warning' onClick={switchSigns}>
        Switch Sign
      </button>
    </fieldset>
  );
}
export default Counter
