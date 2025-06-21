import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home.jsx'
import UserProfile from './Pages/User/UserProfile.jsx'
import { Header } from './components/Header/Header'
import { Post } from './pages/Post/Post.jsx'
import Register from './Pages/Register/Register.jsx'
function App() {
  return (
    <div className='container-principal'>
      <Header />
      <Routes>
        <Route path='/home/' element={<Home/>}/>
        <Route path='/user/my-profile' element={<UserProfile/>}/>
        <Route path='/post/:id' element={<Post />} />
      </Routes>
    </div>
  )
}

export default App
