import React from "react";
import { useState } from "react";
import Layout from "./Layout";

const Tela3 = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [rua, setRua] = useState("");
  const [cpf, setCpf] = useState("");
  const [cidade, setCidade] = useState("");
  const [errors, setErrors] = useState(null);

  const atualizaUser = async () => {
    let myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9hcGkuYXZhbGlhY2FvLnNpbWludGVsaWdlbmNpYS5sb2NhbFwvYXBpXC9sb2dpbiIsImlhdCI6MTYxOTgxNTg5MCwiZXhwIjoxNjE5ODE5NDkwLCJuYmYiOjE2MTk4MTU4OTAsImp0aSI6IlhlY3VOSUE3b1NyeGtUZk4iLCJzdWIiOjM5NywicHJ2IjoiNTg3MDg2M2Q0YTYyZDc5MTQ0M2ZhZjkzNmZjMzY4MDMxZDExMGM0ZiJ9.VlJCdfJPQROlkkz0SpkQUqC278fu-aLU9Ql5tCk0i20"
    );
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("X-Requested-With", "XMLHttpRequest");

    let formdata = new FormData();
    formdata.append("nome", nome);
    formdata.append("email", email);
    formdata.append("telefone", telefone);
    formdata.append("endereco", rua);
    formdata.append("cpf", cpf);
    formdata.append("cidade_id", cidade);

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    const response = await fetch(
      "https://api.avaliacao.siminteligencia.com.br/api/v1/editar-usuario",
      requestOptions
    );
    const responseBody = await response.json();
    window.localStorage.getItem("token");
    setErrors("");
    if (!responseBody.sucesso) {
      setErrors(responseBody.menssagem);
      return;
    }
    if (responseBody.sucesso) {
      setErrors("Dados salvos com sucesso!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    atualizaUser();
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
          Telefone
        </label>
        <label htmlFor="password" style={{ flex: 1 }}>
          Rua/Avenida
        </label>
        <div style={{ display: "flex" }}>
          <input
            type="tel"
            pattern="[0-9]{2}[0-9]{5}[0-9]{4}"
            placeholder="(xx)xxxxx-xxxx"
            className="form-control input-field"
            required="required"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />
          <input
            type="text"
            className="form-control input-field"
            placeholder="Digite sua Rua/Avenida"
            required="required"
            value={rua}
            onChange={(e) => setRua(e.target.value)}
          />
        </div>
        <label htmlFor="username_create" style={{ flex: 1 }}>
          CPF
        </label>
        <label htmlFor="password" style={{ flex: 1 }}>
          Cidade
        </label>
        <div style={{ display: "flex" }}>
          <input
            type="text"
            placeholder="Digite o seu CPF"
            className="form-control input-field"
            required="required"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
          <input
            type="text"
            className="form-control input-field"
            placeholder="Digite a sua Cidade"
            required="required"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
          />
        </div>
        {/* ERROR MSG */}
        <div className="error-msg">{errors}</div>
        {/* SAVE BUTTON */}
        <button
          className="btn btn-lg btn-block btn-primary mb-3 text-center"
          type="submit"
        >
          Salvar
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

export default Tela3;
