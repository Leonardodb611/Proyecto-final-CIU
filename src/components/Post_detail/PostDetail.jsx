import './PostDetail.css';
import { useEffect, useState } from 'react';
import { useGetPostDetail } from '../../hooks/useGetPostDetail';
import { CarrouselImages } from '../CarrouselImages/CarrouselImages';
import { CommentInput } from '../CommentInput/CommentInput';
import { Heart } from 'lucide-react';

const PostDetail = ({ id }) => {
  const { post, comments = [], images = [], loading, tags = [] } = useGetPostDetail(id);

  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [localComments, setLocalComments] = useState([]);
  const [commentVisible, setCommentVisible] = useState(false);

  useEffect(() => {
    if (post) {
      setLikes(post.likes ?? 0);
      setLiked(false);
      setLocalComments(comments);
    }
  }, [post, comments]);

  const handleLike = () => {
    const change = liked ? -1 : 1;
    setLikes((prev) => prev + change);
    setLiked((prev) => !prev);
  };

  if (loading) return <p className="post-detail-loading">Cargando publicación...</p>;
  if (!post) return <p className="post-detail-error">No se encontró la publicación.</p>;

  return (
    <div className="post-detail-container">
      <div className="post-detail-header">
        <div className="post-detail-avatar">
          <img
            src="https://s3.ppllstatics.com/lasprovincias/www/pre2017/multimedia/RC/201501/12/media/cortadas/avatar--235x235.jpg"
            alt="avatar"
          />
        </div>
        <div className="post-detail-userinfo">
          <h2>{post.User?.nickName || 'Usuario'}</h2>
          <p>{post.updatedAt?.split('T')[0]}</p>
        </div>
      </div>

      <div className="post-detail-description">
        <p>{post.description}</p>
      </div>

      {images.length > 0 && (
        <div className="post-detail-carousel">
          <CarrouselImages images={images} />
        </div>
      )}

      <div
        className={`post-detail-heart ${liked ? 'liked' : ''}`}
        onClick={handleLike}
        title={`${liked ? 'No' : 'Dar'} Me gusta`}
      >
        <Heart className="post-detail-icon" fill={liked ? 'rgba(255, 4, 4, 0.616)' : 'none'} color="red" />
        <span className="post-detail-like-count">{likes}</span>
      </div>

      <div className="post-detail-tags">
        <h3>Tags</h3>
        {tags.length === 0 ? (
          <p className="post-detail-no-tags">No hay tags aún.</p>
        ) : (
          <ul>
            {tags.map((t) => (
              <li key={t.id}>{t.name}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="post-detail-comments">
        <h3>
          Comentarios{' '}
          <button onClick={() => setCommentVisible(!commentVisible)}>
            {commentVisible ? 'Cancelar' : 'Comentar'}
          </button>
        </h3>
        {localComments.length === 0 ? (
          <p className="post-detail-no-comments">No hay comentarios aún.</p>
        ) : (
          <ul>
            {localComments.map((c) => (
              <li key={c.id} className="post-detail-comment-item">
                <strong>{c.User?.nickName || 'Usuario'}:</strong> {c.content}
              </li>
            ))}
          </ul>
        )}
        <CommentInput
          comment={{ comment: commentVisible, setComment: setCommentVisible }}
          idPost={post.id}
          publications={[post]}
          updateUsers={(newPosts) => {
            if (newPosts[0]?.comments) {
              setLocalComments(newPosts[0].comments);
            }
          }}
        />
      </div>
    </div>
  );
};

export default PostDetail;
