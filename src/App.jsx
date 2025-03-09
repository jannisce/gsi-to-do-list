import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <h1>Project</h1>
      <div className=''>
        <button onClick={() => setCount((count) => count + 1)} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
          count is {count}
        </button>
      </div>
    </div>
  )
}

export default App
