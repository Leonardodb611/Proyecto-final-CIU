import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home/Home'
import Users from './Pages/User/UserProfile'
import Navigation from './components/Navigation'
import { Header } from './components/Header/Header'
import { Post } from './pages/Post/Post.jsx'
function App() {
  return (
    <>
    <Header />
    <Navigation/> 
      <Routes>
        
        <Route path='/' element={<Home/>}/>
        <Route path='/users' element={<Users/>}/>
        <Route path='/post/:id' element={<Post />} />
      </Routes>
    </>
  )
}

export default App
