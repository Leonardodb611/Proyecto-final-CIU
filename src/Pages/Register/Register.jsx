import React, { useState } from 'react'
import { useGetUsers } from '../../hooks/useGetUsers'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


function Register() {
  const [nickName, setNickName] = useState('')
  const [email, setEmail] = useState('')
  const navigate = useNavigate()
  const usuarios = useGetUsers()
  const setUsuario = (e) =>{
    
    setNickName(e)
  }
  const setEmailNuevo = (e) =>{
    
    setEmail(e)
    console.log(email)
  }

  
  function notifyError(){toast.error('Hubo un error en la solicitud');}
  function notifyErrorUser(){toast.error('Hubo un error: nickName existente o email erroneo');}
  function notifyOk(){toast.success('Usuario creado con exito');}

  
  async function crearUsuario(nombre, emailNuevo) {
 
  if(!usuarios.users.map((nombre) => nombre.nickName).includes(nombre)){
    try{
      let respuesta = await fetch("http://localhost:3001/users", {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({  
          nickName : nombre,
          email: emailNuevo
        })
      })
      if(!respuesta.ok){
        throw new Error ('error en la solicitud', respuesta)
       
      }
      
      const data = await respuesta.json()
      console.log("usuario creado" , data)
      notifyOk()
      setTimeout(()=>{
      navigate('../login')
      }, 3000)
      setNickName('')
      setEmail('')
      
    }
    catch(error){
      console.log(error)
      notifyError()
    }
  }
  else{
    notifyErrorUser()
  }
    
    
  }

  




  return (
    <div className='w-100 bg-dark d-flex justify-content-center align-items-center' >
      
    <form className="bg-white d-flex justify-content-center align-items-center flex-column w-50 h-90 rounded">
      <h3 className='mt-4'>Registro</h3>
  <div className='p-5 '>
    
  <div data-mdb-input-init class="form-outline mb-4">
    <input type="string" id="form2Example1" class="form-control" required onChange={(e)=>setUsuario(e.target.value)}/>
    <label class="form-label" for="form2Example1">Nombre de usuario</label>
  </div>

 
  <div data-mdb-input-init class="form-outline mb-4">
    <input  type="email" id="form2Example2" class="form-control" onChange={(e)=>setEmailNuevo(e.target.value)} required/>
    <label class="form-label" for="form2Example2">Email</label>
  </div>

  
  <div class="row mb-4 w-100">
    <div class="col d-flex justify-content-center w-100">
      <button data-mdb-ripple-init type="submit" class="btn btn-primary btn-block mb-4 w-100 w-md-50 " onClick={()=>crearUsuario(nickName, email) }>Sign in</button>

      
    </div>

    
  </div>

  
  
  
  <div class="text-center">
    <p>Ya tenes cuenta? <a href="../login">Logueate</a></p>
    
  </div>
  </div>
</form>
    <ToastContainer/>
    </div>
    
  )
}

export default Register