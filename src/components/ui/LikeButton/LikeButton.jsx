// Importacion de iconos
import { Heart } from 'lucide-react';
// Importacion de estados
import { useState } from 'react';

export function LikeButton({ publication,publications, updateUsers }) {
  //Estado de Likes
  const [liked, setLiked] = useState(false);
  // Funcion para dar like
  const handleLike = (id) => {
    let num = 1;
    if (liked) {
      num = -1;
      setLiked(false);
    } else {
      setLiked(true);
    }
    const publicationsUpdate = publications.map((p) => {
      if (p.id === id) {
        p.likes = p.likes + num;
      }
      return p;
    });
    updateUsers(publicationsUpdate);
  };
  return (
    <div
      title={`${liked ? 'No' : 'Dar'} Me gusta`}
      onClick={() => {
        handleLike(publication.id);
      }}
      className={`conteiner-heart btn-footer ${liked ? 'liked' : ''}`}
    >
      <Heart
        className='btn-card-feed'
        fill={liked ? 'rgba(255, 4, 4, 0.616)' : 'none'}
      />
      <span className='comment-num'>{publication.likes}</span>
    </div>
  );
}
