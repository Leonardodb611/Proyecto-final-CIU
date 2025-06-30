import React, { useState, useContext } from 'react'
import { useGetUsers } from '../../hooks/useGetUsers'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useRedirectHome } from '../../hooks/useRedirect';
function Login() {
    useRedirectHome()
    const [nickName, setNickName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { users } = useGetUsers();
    const { login } = useContext(AuthContext);


    const PASSWORD_PREDETERMINADA = '123456'; 

    function notifyError() {
        toast.error('Credenciales incorrectas');
    }

    function notifyOk() {
        toast.success('Inicio de sesión exitoso');
    }

    function handleLogin() {
        if (!nickName || !password) {
            toast.error('Por favor, completa todos los campos');
            return;
        }

        const userExists = users.find(
            user => user.nickName.toLowerCase() === nickName.toLowerCase()
        );

        if (userExists && password === PASSWORD_PREDETERMINADA) {
        notifyOk();
        login(userExists);
        console.log('Login hecho, revisá localStorage:', localStorage.getItem('usuario'));
        setTimeout(() => {
            navigate('/home');
        }, 2000);
        }   else {
            notifyError();
        }

    }

    




    return (
    <div className='w-100 bg-dark d-flex justify-content-center align-items-center' >  
        <form className="bg-white d-flex justify-content-center align-items-center flex-column w-50 h-90 rounded">
        <h3 className='mt-4'>Login</h3>
        <div className='p-5 '>
        
        <div data-mdb-input-init className="form-outline mb-4">
            <input type="string" id="nickName" className="form-control" required onChange={(e)=>setNickName(e.target.value)}/>
            <label className="form-label" for="nickName">Nombre de usuario</label>
        </div>

    
    <div data-mdb-input-init className="form-outline mb-4">
        <input  type="password" id="contraseña" className="form-control" onChange={(e)=>setPassword(e.target.value)} required/>
        <label className="form-label" for="contraseña">Contraseña</label>
    </div>

    
    <div className="row mb-4 w-100">
        <div className="col d-flex justify-content-center w-100">
        <button data-mdb-ripple-init type="button" className="btn btn-primary btn-block mb-4 w-100 w-md-50 " onClick={()=> handleLogin() }>Iniciar sesión</button>
        </div>

        
    </div>

    
    
    
    <div className="text-center">
        <p>No tenes cuenta? <Link to="/register">Registrarse</Link></p>
        
    </div>
    </div>
    </form>
        <ToastContainer/>
        </div>
        
    )
}

export default Login