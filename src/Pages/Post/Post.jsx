import { useParams } from 'react-router-dom'

export function Post(){
  const { id } = useParams()
  return(
    <h2> Esto es del Post de id {id}</h2>
  )
}