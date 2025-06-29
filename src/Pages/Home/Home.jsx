import { CardFeed } from '../../components/Card_feed/CardFeed'
import './Home.css'
import { useGetPublications } from '../../hooks/useGetPublications'
import { CardAside } from '../../components/Card_Aside/CardAside'
import { useGetTenUsers } from '../../hooks/useGetTenUsers'
import { cambiarTitulo } from '../../utils/util'
import { useRedirectLogin } from '../../hooks/useRedirect.jsx'
function Home() {
  useRedirectLogin()
  const { publications, setPublications } = useGetPublications()
  const { users } = useGetTenUsers()
  cambiarTitulo('Inicio')
  return (<>
    <main className='container-main-home'>
      {
        publications ? publications.map(p => <CardFeed publication = {p} key={p.id} updateUsers={setPublications} publications = {publications}/>)
        : <span style={{color: 'white', fontWeight: '600'}}>No se pudieron cargar las publicaciones</span>
      }
    </main>
    <aside className='container-aside-home'>
      <h2 className="title-aside">Sugerencias de perfiles</h2>
      {
        users ? users.map(u => <CardAside user={u} key={u.id}/>) 
        : <span style={{color: 'white', fontWeight: '600'}}>No se pudieron cargar los usuarios</span>
      }
    </aside>
    </>
  )
}

export default Home