import React from "react";
import { Link } from "react-router-dom";
import { Form, Input } from "@rocketseat/unform";
import * as Yup from "yup";

import logo from "~/assets/logo.png";

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Insira um email válido")
    .required("O email é obrigatorio"),
  name: Yup.string().required("Seu nome é obrigatório"),
  password: Yup.string()
    .min(6, "A senha precisa ter no minimo 6 caracteres")
    .required("A senha é obrigatória"),
});

export default function SignUp() {
  function handleSubmit(data) {
    console.tron.log(data);
  }
  return (
    <>
      <img src={logo} alt="Gobarber" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Nome completo" />
        <Input name="email" type="email" placeholder="Seu email" />
        <Input
          name="password"
          type="password"
          placeholder="Sua senha secreta"
        />

        <button type="submit">Criar Conta</button>
        <Link to="/">Já tenho login</Link>
      </Form>
    </>
  );
}
