import { CardFeed } from '../../components/card_feed/CardFeed'
import './Home.css'
import { useGetPublications } from '../../hooks/useGetPublications'
function Home() {
  const { publications } = useGetPublications()
  return (
    <main className='container-main-home'>
      {
        publications && publications.map(p => <CardFeed publication = {p} />)
      }
    </main>
  )
}

export default Home