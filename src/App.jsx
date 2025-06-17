import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home/Home'
import Users from './Pages/User/UserProfile'
import Navigation from './components/Navigation'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navigation/> 
      <Routes>
        
        <Route path='/' element={<Home/>}/>
        <Route path='/users' element={<Users/>}/>
      </Routes>
    </>
  )
}

export default App
