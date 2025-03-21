import { useState } from 'react'
import Header from './Header/Header'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header />
    </>
  )
}

export default App
