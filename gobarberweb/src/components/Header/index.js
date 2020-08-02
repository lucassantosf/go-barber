import React from "react";
import { Link } from "react-router-dom";

import Notifications from "~/components/Notifications";

import logo from "~/assets/logo.png";
import { Container, Content, Profile } from "./styles";

export default function Header() {
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
              <strong>Lucas Santos</strong>
              <Link to="/profile">Meu perfil</Link>
            </div>
            <img
              src="https://api.adorable.io/avatars/50/abott@adorable.png"
              alt="Lucas Santos"
            />
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
