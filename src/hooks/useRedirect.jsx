import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';
export const useRedirectLogin = ()=>{
  const navigate=useNavigate()
  const { usuario } = useContext(AuthContext);
  if(!usuario){
    navigate('/login')
  }
} 

export const useRedirectHome = () => {
  const navigate=useNavigate()
  const { usuario } = useContext(AuthContext);
  if(usuario){
    navigate('/home')
  }
}