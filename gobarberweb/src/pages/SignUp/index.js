import React from "react";
import { Link } from "react-router-dom";
import logo from "~/assets/logo.png";

export default function SignUp() {
  return (
    <>
      <img src={logo} alt="Gobarber" />

      <form>
        <input placeholder="Nome completo" />
        <input type="email" placeholder="Seu email" />
        <input type="password" placeholder="Sua senha secreta" />

        <button type="submit">Criar Conta</button>
        <Link to="/">Já tenho login</Link>
      </form>
    </>
  );
}
