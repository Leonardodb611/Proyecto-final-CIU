import React, { useState, useEffect } from "react";
import { CardFeed } from "../../components/Card_feed/CardFeed";
import { useGetPublications } from "../../hooks/useGetPublications";
import { useRandomUser } from "../../hooks/useGetRamdomUser";
import "./UserProfile.css";
import { UserBanner } from "../../components/User_banner/UserBanner";

function Profile() {
  const { publications, setPublications } = useGetPublications();
  const { randomUser } = useRandomUser();

  if (!publications || publications.length === 0 || !randomUser) {
    return (
      <p style={{ color: "white", fontWeight: '600' }} className="cargando">
        No se pudo cargar el perfil
      </p>
    );
  }
  const publicationsByUser = randomUser
    ? publications.filter((p) => p.UserId === randomUser.id)
    : [];

  return (
    <main className="container-main">
      <UserBanner user={randomUser}></UserBanner>
      <br></br>
      {publicationsByUser.map((p) => (
        <CardFeed
          publication={p}
          key={p.id}
          updateUsers={setPublications}
          publications={publications}
        />
      ))}
    </main>
  );
}

export default Profile;
