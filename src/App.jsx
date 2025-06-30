import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home/Home.jsx'
import UserProfile from './Pages/User/UserProfile.jsx'
import { Header } from './components/Header/Header'
import { Post } from './pages/Post/Post.jsx'
import Register from './Pages/Register/Register.jsx'
import Login from './Pages/Login/Login.jsx'
import NewPost from './Pages/NewPost/NewPost.jsx'
import { UserAside } from './Pages/UserAside/UserAside.jsx'
import Search from './Pages/Search/Search.jsx'
function App() {
  return (
    <div className="container-principal">
      <Header />
      <Routes>
        <Route path="/home/" element={<Home />} />
        <Route path="/user/my-profile" element={<UserProfile />} />
        <Route path="/user/:id" element={<UserAside />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<Search />} />
        <Route path="/publicar" element={<NewPost />} />
        <Route path="*" element={<Navigate to="/home/" />} />
      </Routes>
    </div>
  );
}

export default App
