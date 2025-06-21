import './CommentInput.css';
import { useSendComment } from '../../hooks/useSendComment.js';
export function CommentInput({ comment, idPost, updateUsers, publications }) {
  const {
    textAlertComment,
    commentSend,
    updateCommentText,
    setCommentText,
    handleComment,
    commentText,
    showSpinner,
  } = useSendComment(updateUsers, publications);
  // Funcion para cancerlas
  const cancel = () => {
    setCommentText('');
    comment.setComment(false);
  };
  return (
    <div className={`form-comment ${comment.comment ? 'block' : ''}`}>
      <input
        onChange={updateCommentText}
        type='text'
        maxLength={500}
        value={commentText}
      />
      <div className='btns-comment'>
        { showSpinner && (
          <div className='spinner-border m-1 custom-spinner-send-comment' role='status'>
            <span className='sr-only'></span>
          </div>
        )}
        <span
          className={`text-comment-send ${commentSend ? 'show' : ''} ${
            textAlertComment === 'No se pudo enviar el comentario'
              ? 'color-red'
              : ''
          }`}
        >
          {textAlertComment}
        </span>

        <button className='comentar' onClick={() => handleComment(idPost)} disabled = {showSpinner? true : false}>
          Comentar
        </button>
        <button className='cancelar' onClick={cancel}>
          Cancelar
        </button>
      </div>
    </div>
  );
}
