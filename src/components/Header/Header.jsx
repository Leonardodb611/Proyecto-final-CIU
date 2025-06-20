import { UserRound,House, Search,BadgePlus,LogOut } from 'lucide-react';
import './Header.css';
import { Link } from 'react-router-dom';
export function Header() {
  return (
    <header className='conteiner-header'>
      <div className='conteiner-logo'>
        <h2 className='container-logo-title'>ℛ𝑒𝒹-𝒜𝓃𝓉𝒾𝒮𝑜𝒸𝒾𝒶𝓁</h2>
        <ul className='header-container-navbar'>
          <Link className='header-conteiner-item' to={'/home/'}>

            <House className='header-item-icon'/>
            <span className="header-item-text">
              Inicio
            </span>
          </Link>
          <li className='header-conteiner-item'>
            <Search className='header-item-icon'/>
            <span className="header-item-text">
              Buscar
            </span>
          </li>
          <li className='header-conteiner-item'>
            <BadgePlus  className='header-item-icon'/>
            <span className="header-item-text">
              Publicar
            </span>
          </li>
        </ul>
      </div>
      <div className='conteiner-user'>
        <ul className='header-container-navbar'>
          <Link className='header-conteiner-item' to={'/user/myprofile'}>
            <UserRound  className='header-item-icon'/>
            <span className="header-item-text">
              Mi Perfil
            </span>
          </Link>
          <li className='header-conteiner-item'>
            <LogOut  className='header-item-icon'/>
            <span className="header-item-text">
              Cerrar Sesión
            </span>
          </li>
        </ul>
      </div>
    </header>
  );
}
