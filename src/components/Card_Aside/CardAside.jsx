import './CardAside.css'
export function CardAside(props){
  return(
    <article className='container-aside-article'>
      <div className='card-aside-left'>
        <div className="card-aside_header">
          <img src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png" alt="" />
        </div>
        <div className="card-aside-rigth">
          <h2 className="card-nick">{props.user.nickName}</h2>
          <p className='card-email'>{props.user.email}</p>
        </div>
      </div>
      <button className='card-aside-button'>Ver Perfil</button>
    </article>
  )
}