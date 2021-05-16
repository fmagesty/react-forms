import React from "react";
import { useState } from "react";
import Layout from "./Layout";

const Tela2 = () => {
  const [errors, setErrors] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("X-Requested-With", "XMLHttpRequest");

    let urlencoded = new URLSearchParams();
    urlencoded.append("email", email);
    urlencoded.append("password", password);

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    const response = await fetch(
      "https://api.avaliacao.siminteligencia.com.br/api/login",
      requestOptions
    );
    const responseBody = await response.json();
    // setErrors("");
    // If user logs in show login message
    setErrors("Usuário logado com sucesso!");
    // save login token
    window.localStorage.setItem("token", responseBody.token);
    // Handle errors if responseBody.sucesso === false
    if (!responseBody.token) {
      window.localStorage.clear();
      console.log(responseBody);
      setErrors(responseBody.mensagem);
      return;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser();
  };

  return (
    <Layout>
      <form className="row g-3 needs-validation" onSubmit={handleSubmit}>
        {/* LOGIN INPUT */}
        <label htmlFor="username_create">Login</label>
        <input
          type="email"
          name="email"
          placeholder="Seu login"
          className="form-control input-field"
          required="required"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div style={{ display: "flex" }}>
          <label htmlFor="password" style={{ flex: 1 }}>
            Senha
          </label>
          <a
            href="https://app.siminteligencia.ai/login/"
            target={"_blank"}
            rel="noreferrer"
            className="forgot-password"
          >
            Esqueceu a senha?
          </a>
        </div>
        {/* PASSWORD INPUT */}
        <input
          type="password"
          name="password"
          className="form-control input-field"
          placeholder="Sua senha"
          required="required"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* ERROR MSG */}
        <div className="error-msg">{errors}</div>
        {/* ENTER BUTTON */}
        <button
          className="btn btn-lg btn-block btn-primary mb-3 text-center"
          type="submit"
        >
          Entrar
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

export default Tela2;
