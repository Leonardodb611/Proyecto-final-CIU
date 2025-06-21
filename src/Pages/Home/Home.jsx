import { CardFeed } from '../../components/Card_feed/CardFeed'
import './Home.css'
import { useGetPublications } from '../../hooks/useGetPublications'
import { CardAside } from '../../components/Card_Aside/CardAside'
import { useGetTenUsers } from '../../hooks/useGetTenUsers'
function Home() {
  const { publications, setPublications } = useGetPublications()
  const { users } = useGetTenUsers()
  return (<>
    <main className='container-main-home'>
      {
        publications && publications.map(p => <CardFeed publication = {p} key={p.id} updateUsers={setPublications} publications = {publications}/>)
      }
    </main>
    <aside className='container-aside-home'>
      <h2 className="title-aside">Sugerencias de perfiles</h2>
      {
        users && users.map(u => <CardAside user={u} key={u.id}/>)
      }
    </aside>
    </>
  )
}

export default Home