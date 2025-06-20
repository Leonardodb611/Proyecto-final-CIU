import { elegirUnaImagen } from '../../utils/images';
import './CardFeed.css';
import { Link } from 'react-router-dom';
import { CarrouselImages } from '../CarrouselImages/CarrouselImages';
// Importacion de Componentes de Lucide
import { Heart, MessageCircle, SquareArrowOutUpRight } from 'lucide-react';
export function CardFeed({ publication }) {
  const img = elegirUnaImagen();
  return (
    <article className='conteiner-card_feed'>
      <div className='conteiner-card_feed-header'>
        <div className='card_feed-img'>
          <div className='img'>
            <img src={img} alt='' />
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
          title='Dar Me gusta'
        >
          <div className='conteiner-heart btn-footer'>
            <Heart className='btn-card-feed' />
            <span className='comment-num'>{publication.likes}</span>
          </div>
          <div className='conteiner-comment btn-footer' title='Comentar'>
            <MessageCircle className='btn-card-feed btn-comment'></MessageCircle>
            <span className='comment-num'>{publication.comments.length}</span>
          </div>
        </div>
        <div title='Ver Publicacion' className='btn-footer'>
          <Link to={`./post/${publication.id}`}>
            <SquareArrowOutUpRight className='btn-card-feed' />
          </Link>
        </div>
      </div>
    </article>
  );
}
