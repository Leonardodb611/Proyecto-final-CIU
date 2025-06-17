import { elegirUnaImagen } from '../../utils/images'
import './CardFeed.css'
import { Link } from 'react-router-dom'
export function CardFeed({ publication }){
  const img = elegirUnaImagen()
  return(
    <article className='conteiner-card_feed'>
      <div className="conteiner-card_feed-header">
        <div className="card_feed-img">
          <div className="img">
            <img src={img} alt="" />
          </div>
        </div>
        <div className="card_feed-username">
          <h2>{publication.User.nickName}</h2>
          <p>{publication.updatedAt.split('T')[0]}</p>
        </div>
      </div>
      <div className="conteiner-card_feed-body">
        <div className="card_feed-imgs">
          <h2>Aqui irian las imagenes</h2>
        </div>
        <div className='card_feed-description'>
          <p>{publication.description}</p>
        </div>
      </div>
      <div className="conteiner-card_feed-footer">
        <h2>❤️</h2>
        <h2>🗨️</h2>
        <Link to={`./post/${publication.id}`}>
          <h2 className='r'>⤵︎</h2>
        </Link>
      </div>
    </article>
  )
}