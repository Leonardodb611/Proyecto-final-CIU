import { useParams } from "react-router-dom";
import { UserBanner } from "../../components/User_banner/UserBanner";
import { useGetUserById } from "../../hooks/useGetUserById";
import { useGetPublications } from "../../hooks/useGetPublications";
import { CardFeed } from "../../components/Card_feed/CardFeed";

export function UserAside() {
  const { id } = useParams();
  const user = useGetUserById(id);

  const { publications, setPublications } = useGetPublications();

  const isLoading = !publications || !user;

  const publicationsByUser = !isLoading
    ? publications.filter((p) => p.UserId === user.id)
    : [];

  return (
    <main className="container-main">
      <UserBanner user={user}></UserBanner>
      {isLoading ? (
        <p style={{ color: "white", fontWeight: "600" }} className="cargando">
          Cargando perfil...
        </p>
      ) : (
        publicationsByUser.map((p) => (
          <CardFeed
            publication={p}
            key={p.id}
            updateUsers={setPublications}
            publications={publications}
          />
        ))
      )}
    </main>
  );
}
