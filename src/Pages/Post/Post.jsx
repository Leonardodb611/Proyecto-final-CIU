import { useParams } from 'react-router-dom'
import PostDetail from '../../components/Post_detail/PostDetail'
import { cambiarTitulo } from '../../utils/util'

export function Post(){
  const { id } = useParams()
  cambiarTitulo('AHSJDHJASHD')
  return(
    <PostDetail id={id} />
  )
}