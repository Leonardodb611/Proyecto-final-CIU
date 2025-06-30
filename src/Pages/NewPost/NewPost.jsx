import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useRedirectLogin } from '../../hooks/useRedirect';
import { useGetTags } from '../../hooks/useGetTags';

function NewPost() {
  useRedirectLogin();
  const { usuario } = useContext(AuthContext);
  const [contenido, setContenido] = useState('');
  const [imagenToPost, setimagenToPost] = useState('');
  const [selectedTagIds, setSelectedTagIds] = useState([]);
  const { tags: allTags, loading, error } = useGetTags();

  const navigate = useNavigate();

    const handleTagChange = (id) => {
    setSelectedTagIds(prev => 
      prev.includes(id) ? prev.filter(tagId => tagId !== id) : [...prev, id]
    );
  };

  const setContenidoNuevo = (e) => {
    setContenido(e);
  };
  const setimagenToPostNuevo = (e) => {
    setimagenToPost(e);
  }
  


  function notifyError() {
    toast.error('Hubo un error en la solicitud');
  }

  function notifyOk() {
    toast.success('Post creado con exito');
  }

  async function crearPost() {
    console.log(contenido);
    console.log(imagenToPost);
    try {
      console.log(usuario.id);
      let respuesta = await fetch('http://localhost:3001/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description: contenido,
          userId: usuario.id,
          tagIds: selectedTagIds,
        }),
      });
      if (!respuesta.ok) {
        throw new Error('error en la solicitud', respuesta);
      }

      const data = await respuesta.json();
      console.log('usuario creado', data);
      if(imagenToPost){
        let respuestaImage = await fetch('http://localhost:3001/postimages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            url: imagenToPost,
            postId: data.id,
          }),
        });
        if(!respuestaImage){
          console.log("no image")
        } else {
          console.log(`Imagen generada con id:${respuestaImage.url}`);
        };
      }

      notifyOk();
      setTimeout(() => {
        navigate('../home');
      }, 3000);
    } catch (error) {
      console.log(error);
      notifyError();
    }
  }

  return (
    
    <div className='w-100 bg-dark d-flex justify-content-center align-items-center'>
      <form className='bg-white d-flex justify-content-center align-items-center flex-column w-50 h-90 rounded'>
        <h3 className='mt-4'>Crear nuevo Post</h3>
        <div className='p-5 '>
          <div data-mdb-input-init class='form-outline mb-4'>
            <input
              type='string'
              value={usuario?.nickName}
              id='form2Example2'
              class='form-control'
            />
            <label class='form-label' for='form2Example1'>
              Usuario
            </label>
          </div>

          <div data-mdb-input-init class='form-outline mb-4'>
            <textarea
              type='string'
              id='form2Example2'
              class='form-control'
              onChange={(e) => setContenidoNuevo(e.target.value)}
              required
            />
            <label class='form-label' for='form2Example2'>
              Contenido
            </label>
          </div>
          <div data-mdb-input-init class='form-outline mb-4'>
              <textarea
                type='string'
                id='form2Example2'
                class='form-control'
                onChange={(e) => setimagenToPostNuevo(e.target.value)}
              />
              <label class='form-label' for='form2Example2'>
                Ruta de imagen
              </label>
            </div>
                      <fieldset className='mb-4'>
            <legend>Selecciona etiquetas:</legend>
            {loading ? (
              <p>Cargando etiquetas...</p>
            ) : error ? (
              <p className='text-danger'>Error al cargar etiquetas</p>
            ) : (
              allTags.map(tag => (
                <label key={tag.id} className='d-block mb-1'>
                  <input
                    type="checkbox"
                    value={tag.id}
                    checked={selectedTagIds.includes(tag.id)}
                    onChange={() => handleTagChange(tag.id)}
                    className='me-2'
                  />
                  {tag.name}
                </label>
              ))
            )}
          </fieldset>
          <div class='row mb-4 w-100'>
            <div class='col d-flex justify-content-center w-100'>
              <button
                data-mdb-ripple-init
                type='button'
                class='btn btn-primary btn-block mb-4 w-100 w-md-50 '
                onClick={() => crearPost()}
              >
                Publicar
              </button>
            </div>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default NewPost;
