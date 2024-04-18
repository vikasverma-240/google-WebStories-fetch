import { useState } from 'react'
import './App.css'
import WebStories from './Components/Webstories.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <WebStories/>
    </>
  )
}

export default App
