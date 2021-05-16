import React from "react";
import { useState } from "react";
import Layout from "./Layout";

const Tela1 = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  const [errors, setErrors] = useState(null);

  const createNewUser = async () => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("X-Requested-With", "XMLHttpRequest");

    let urlencoded = new URLSearchParams();
    urlencoded.append("nome", nome);
    urlencoded.append("email", email);
    urlencoded.append("password", password);
    urlencoded.append("password_confirmation", password_confirmation);

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    const response = await fetch(
      "https://api.avaliacao.siminteligencia.com.br/api/registrar",
      requestOptions
    );
    const responseBody = await response.json();
    // If user is registered, show registered message
    setErrors("");
    setErrors(responseBody.mensagem);
    // if responseBody.sucesso === false, show error message
    if (!responseBody.sucesso) {
      console.log(responseBody);
      if (responseBody.erros.nome) {
        setErrors(responseBody.erros.nome[0]);
        return;
      }
      if (responseBody.erros.email) {
        setErrors(responseBody.erros.email[0]);
        return;
      }
      if (responseBody.erros.password) {
        setErrors(responseBody.erros.password[0]);
        return;
      }
      if (responseBody.erros.password_confirmation) {
        setErrors(responseBody.erros.password_confirmation[0]);
        return;
      }
      setErrors(responseBody.mensagem);
      return;
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    createNewUser();
  };
  return (
    <Layout>
      <form className="row g-3 needs-validation" onSubmit={handleSubmit}>
        <label htmlFor="username_create" style={{ flex: 1 }}>
          Nome
        </label>
        <label htmlFor="password" style={{ flex: 1 }}>
          Email
        </label>
        <div style={{ display: "flex" }}>
          <input
            type="text"
            placeholder="Nome e sobrenome"
            className="form-control input-field"
            required="required"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            type="email"
            className="form-control input-field"
            placeholder="email@exemplo.com"
            required="required"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <label htmlFor="username_create" style={{ flex: 1 }}>
          Senha
        </label>
        <label htmlFor="password" style={{ flex: 1 }}>
          Confirme sua Senha
        </label>
        <div style={{ display: "flex" }}>
          <input
            type="password"
            placeholder="Sua senha"
            className="form-control input-field"
            required="required"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            className="form-control input-field"
            placeholder="Confirme sua senha"
            required="required"
            value={password_confirmation}
            onChange={(e) => setPassword_confirmation(e.target.value)}
          />
        </div>
        {/* ERROR MSG */}
        <div className="error-msg">{errors}</div>
        {/* REGISTER BUTTON */}
        <button
          className="btn btn-lg btn-block btn-primary mb-3 text-center"
          type="submit"
        >
          Registrar
        </button>
        <div className="text-center">
          <small className="text-muted text-center">
            Ainda não possui uma conta?{" "}
          </small>
          <a
            target={"_blank"}
            rel="noreferrer"
            href="https://siminteligencia.com.br/demonstracao-comercial/"
          >
            Solicite uma demonstração
          </a>
        </div>
      </form>
    </Layout>
  );
};

export default Tela1;
