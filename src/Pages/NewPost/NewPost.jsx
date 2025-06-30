import React, { useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useRedirectLogin } from '../../hooks/useRedirect';
import { useGetTags } from '../../hooks/useGetTags';
import { cambiarTitulo } from '../../utils/util';

function NewPost() {
  cambiarTitulo('Postear');
  useRedirectLogin();

  const { usuario } = useContext(AuthContext);
  const [contenido, setContenido] = useState('');
  const [imagenesToPost, setImagenesToPost] = useState([]); // ahora es array
  const [selectedTagIds, setSelectedTagIds] = useState([]);

  const { tags: allTags, loading, error } = useGetTags();
  const navigate = useNavigate();

  const handleTagChange = (id) => {
    setSelectedTagIds((prev) =>
      prev.includes(id) ? prev.filter((tagId) => tagId !== id) : [...prev, id]
    );
  };

  function notifyError() {
    toast.error('Hubo un error en la solicitud');
  }

  function notifyOk() {
    toast.success('Post creado con éxito');
  }

  async function crearPost() {
    try {
      const respuesta = await fetch('http://localhost:3001/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description: contenido,
          userId: usuario.id,
          tagIds: selectedTagIds,
        }),
      });

      if (!respuesta.ok) throw new Error('Error en la solicitud');

      const data = await respuesta.json();

      // Enviar múltiples imágenes
      for (const imagenUrl of imagenesToPost) {
        await fetch('http://localhost:3001/postimages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            url: imagenUrl,
            postId: data.id,
          }),
        });
      }

      notifyOk();
      setTimeout(() => navigate('../home'), 3000);
    } catch (error) {
      console.log(error);
      notifyError();
    }
  }

  return (
    <div className='w-100 bg-dark d-flex justify-content-center align-items-center'>
      <form className='bg-white d-flex justify-content-center align-items-center flex-column w-50 h-90 rounded'>
        <h3 className='mt-4'>Crear nuevo Post</h3>
        <div className='p-5'>

          {/* Contenido */}
          <div className='form-outline mb-4'>
            <textarea
              className='form-control'
              onChange={(e) => setContenido(e.target.value)}
              required
              placeholder="Contenido del post..."
            />
            <label className='form-label'>Contenido</label>
          </div>

          {/* Imágenes (varias) */}
          <div className='form-outline mb-4'>
            <textarea
              className='form-control'
              onChange={(e) =>
                setImagenesToPost(
                  e.target.value
                    .split(',')
                    .map((url) => url.trim())
                    .filter((url) => url !== '')
                )
              }
              placeholder="Pega una o más URLs de imágenes (una por línea)"
            />
            <label className='form-label'>URLs de imágenes</label>
          </div>

          {/* Etiquetas */}
          <fieldset className='mb-4'>
            <legend>Selecciona etiquetas:</legend>
            {loading ? (
              <p>Cargando etiquetas...</p>
            ) : error ? (
              <p className='text-danger'>Error al cargar etiquetas</p>
            ) : (
              allTags.map((tag) => (
                <label key={tag.id} className='d-block mb-1'>
                  <input
                    type='checkbox'
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

          {/* Botón */}
          <div className='row mb-4 w-100'>
            <div className='col d-flex justify-content-center w-100'>
              <button
                type='button'
                className='btn btn-primary btn-block mb-4 w-100 w-md-50'
                onClick={crearPost}
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
