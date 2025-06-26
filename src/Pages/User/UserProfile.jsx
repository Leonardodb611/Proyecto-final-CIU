import React, { useState, useEffect } from "react";
import { CardFeed } from "../../components/Card_feed/CardFeed";
import { useGetPublications } from "../../hooks/useGetPublications";
import { useRandomUser } from "../../hooks/useGetRamdomUser";
import "./UserProfile.css";
import { UserBanner } from "../../components/User_banner/UserBanner";

function Profile() {
  const { publications, setPublications } = useGetPublications();
  const { randomUser } = useRandomUser();

  const isLoading = !publications || !randomUser;

  const publicationsByUser = !isLoading
    ? publications.filter((p) => p.UserId === randomUser.id)
    : [];
  
  return (
    <main className="container-main">
      <UserBanner user={randomUser} />
      <div className="container-text">
        <h3 className="text-profile"> Mis posteos:</h3>
      </div>
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

export default Profile;
