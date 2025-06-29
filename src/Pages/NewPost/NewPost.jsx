import React, {useState} from 'react'
import { useGetUsers } from '../../hooks/useGetUsers'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

function NewPost() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('usuario')))
      const [contenido, setContenido] = useState('')
      const navigate = useNavigate()
      
      
      const setContenidoNuevo = (e) =>{
        
        setContenido(e)
        
      }
    
    
      
      function notifyError(){toast.error('Hubo un error en la solicitud');}
      
      function notifyOk(){toast.success('Post creado con exito');}

    
    async function crearPost() {
 
    console.log(contenido)    
    try{
        console.log(user.id)
      let respuesta = await fetch("http://localhost:3001/posts", {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({  
          
          description:contenido,
          userId:user.id,
          tagIds:[]
        })
      })
      if(!respuesta.ok){
        throw new Error ('error en la solicitud', respuesta)
       
      }
      
      const data = await respuesta.json()
      console.log("usuario creado" , data)
      notifyOk()
      setTimeout(()=>{
      navigate('../home')
      }, 3000)
      
      
    }
    catch(error){
      console.log(error)
      notifyError()
    }    
  }



  return (
    <div className='w-100 bg-dark d-flex justify-content-center align-items-center' >
      
    <form className="bg-white d-flex justify-content-center align-items-center flex-column w-50 h-90 rounded">
      <h3 className='mt-4'>Crear nuevo Post</h3>
  <div className='p-5 '>
    
  <div data-mdb-input-init class="form-outline mb-4">
    <input  type="string" value={user.nickName} id="form2Example2" class="form-control" />
    <label class="form-label" for="form2Example1">Usuario</label>
  </div>

 
  <div data-mdb-input-init class="form-outline mb-4">
    <textarea  type="string" id="form2Example2" class="form-control" onChange={(e)=>setContenidoNuevo(e.target.value)} required/>
    <label class="form-label" for="form2Example2">Contenido</label>
  </div>

  
  <div class="row mb-4 w-100">
    <div class="col d-flex justify-content-center w-100">
      <button data-mdb-ripple-init type="button" class="btn btn-primary btn-block mb-4 w-100 w-md-50 " onClick={()=>crearPost() }>Publicar</button>
    </div>

    
  </div>

  
  
  
  
  </div>
</form>
    <ToastContainer/>
    </div>
  )
}

export default NewPost