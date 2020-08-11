import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Notifications from "~/components/Notifications";

import logo from "~/assets/logo.png";
import { Container, Content, Profile } from "./styles";

export default function Header() {
  const profile = useSelector((state) => state.user.profle);
  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="Gobarber" />
          <Link to="/dashboard">Dashboard</Link>
        </nav>
        <aside>
          <Profile>
            <Notifications />
            <div>
              <strong>{profile && profile.name}</strong>
              <Link to="/profile">Meu perfil</Link>
            </div>
            <img
              src={
                (profile && profile.avatar.url) ||
                "https://api.adorable.io/avatars/50/abott@adorable.png"
              }
              alt={(profile && profile.name) || "Avatar"}
            />
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
