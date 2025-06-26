import { useParams } from 'react-router-dom';
import PostDetail from '../../components/Post_detail/PostDetail';

export function Post() {
  const { id } = useParams();

  return <PostDetail id={id} />;
}
