import { useState } from 'react'
import './CommentInput.css'
import { sendComment } from '../../utils/util.js'
export function CommentInput({comment,idPost,updateUsers, publications}){
  // Estado de input
  const [commentText,setCommentText] = useState('')
  // Funcion para actualizar contenido de comentario
  const updateCommentText = (e)=>{
    setCommentText(e.target.value)
  }
  // Funcion de comentari
  const handleComment = async (idPost)=>{
    const newComment = await sendComment(commentText,idPost,1)
    if(newComment){
      const newPublics = publications.map(p=>{
        if(p.id === idPost){
          p.comments.push(newComment)
        }
        return p
      })
      setCommentText('')
      updateUsers(newPublics)
      comment.setComment(!comment)
    }else{
      alert('No se pudo comentar')
    }
  }

  // Funcion para cancerlas
  const cancel = ()=>{
    comment.setComment(false)
    setCommentText('')
  }
  return(
    <div className={`form-comment ${comment.comment? 'block':''}`}>
      <input 
        onChange={updateCommentText}
        type="text" 
        maxLength={500}/>
      <div className='btns-comment'>
        <button className='comentar' onClick={()=>handleComment(idPost)}>Comentar</button>
        <button 
          className='cancelar' 
          onClick={cancel}>
          Cancelar
          </button>
      </div>
    </div>
  )
}