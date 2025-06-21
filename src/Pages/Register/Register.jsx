import React, { useState } from 'react'
import { useGetUsers } from '../../hooks/useGetUsers'
import 'bootstrap/dist/css/bootstrap.min.css';



function Register() {
  const [nickName, setNickName] = useState('')
  const [email, setEmail] = useState('')

  const setUsuario = (e) =>{
    
    setNickName(e)
  }
  const setEmailNuevo = (e) =>{
    
    setEmail(e)
    console.log(email)
  }

  async function crearUsuario(nombre, emailNuevo) {
    
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
      
    }
    catch(error){
      console.log(error)
    }
    
  }






  return (
    <div className='w-100 bg-dark d-flex justify-content-center align-items-center' >
    <form className="bg-white d-flex justify-content-center align-items-center flex-column w-50 h-90 rounded">
  <div className='p-5 '>
  <div data-mdb-input-init class="form-outline mb-4">
    <input type="string" id="form2Example1" class="form-control" onChange={(e)=>setUsuario(e.target.value)}/>
    <label class="form-label" for="form2Example1">Nombre de usuario</label>
  </div>

 
  <div data-mdb-input-init class="form-outline mb-4">
    <input  type="email" id="form2Example2" class="form-control" onChange={(e)=>setEmailNuevo(e.target.value)}/>
    <label class="form-label" for="form2Example2">Email</label>
  </div>

  
  <div class="row mb-4 w-100">
    <div class="col d-flex justify-content-center w-100">
      <button data-mdb-ripple-init type="button" class="btn btn-primary btn-block mb-4 w-100 w-md-50 " onClick={()=>crearUsuario(nickName, email)}>Sign in</button>

      
    </div>

    
  </div>

  
  
  
  <div class="text-center">
    <p>You are a member? <a href="#!">login</a></p>
    
  </div>
  </div>
</form>
    
    </div>
  )
}

export default Register