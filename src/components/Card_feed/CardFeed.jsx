import './CardFeed.css';
import { Link } from 'react-router-dom';
import { CarrouselImages } from '../CarrouselImages/CarrouselImages';
// Importacion de Componentes de Lucide
import { Heart, MessageCircle, SquareArrowOutUpRight } from 'lucide-react';
import { useState } from 'react';
import { CommentInput } from '../CommentInput/CommentInput';
export function CardFeed({ publication, updateUsers, publications }) {
  // Estado de comentarios
  const [comment, setComment] = useState(false)
  //Estado de Likes
  const [liked,setLiked] = useState(false)
  // Funcion para dar like
  const handleLike = (id) => {

    let num = 1
    if(liked){
      num = -1
      setLiked(false)
    }else{
      setLiked(true)
    }
    const publicationsUpdate = publications.map(p => {
      if(p.id === id){
        p.likes = p.likes + num
      }
      return p
    })
    updateUsers(publicationsUpdate)
  }
  return (
    <article className='conteiner-card_feed'>
      <div className='conteiner-card_feed-header'>
        <div className='card_feed-img'>
          <div className='img'>
            <img src='https://s3.ppllstatics.com/lasprovincias/www/pre2017/multimedia/RC/201501/12/media/cortadas/avatar--235x235.jpg' alt='' />
          </div>
        </div>
        <div className='card_feed-username'>
          <h2>{publication.User.nickName}</h2>
          <p>{publication.updatedAt.split('T')[0]}</p>
        </div>
      </div>
      <div >
        <div className='card_feed-description'>
          <p>{publication.description}</p>
        </div>
        {publication.images.length > 0 && <CarrouselImages images={publication.images} />}
      </div>
      <div className='conteiner-card_feed-footer'>
        <div
          className='conteiner-card_feed-footer-icons-left'
        >
          <div
            title={`${liked ? 'No' : 'Dar'} Me gusta`}
            onClick = {()=>{handleLike(publication.id)}}
            className={`conteiner-heart btn-footer ${liked ? 'liked':''}`}>
            <Heart className='btn-card-feed' fill={liked ? 'rgba(255, 4, 4, 0.616)':'none'}/>
            <span className='comment-num'>{publication.likes}</span>
          </div>
          <div 
          onClick={()=>setComment(!comment)}
          className='conteiner-comment btn-footer' 
          title='Comentar'>
            <MessageCircle className='btn-card-feed btn-comment'></MessageCircle>
            <span className='comment-num'>{publication.comments.length}</span>
          </div>
        </div>
        <div title='Ver Publicacion' className='btn-footer conteiner-btn-publication'>
          <Link to={`/post/${publication.id}`} className='conteiner-btn-publication'>
            <span className='btn-footer-text-view-publication'>Ver Publicacion</span>
            <SquareArrowOutUpRight className='btn-card-feed' />
          </Link>
        </div>
      </div>
      <CommentInput comment={{comment,setComment}} idPost = {publication.id} publications={publications} updateUsers = {updateUsers}/>
    </article>
  );
}
