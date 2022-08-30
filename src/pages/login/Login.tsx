import "@/styles/pages/login.scss";

import { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import logo from "@/assets/logo.png";
import api from "@/services/api";
import { setToken } from "@/services/auth";

export const Login = () => {
  const navigate = useNavigate();
  const [person, setUser] = useState({ username: "", password: "" });
  const [falidLogin, setFalid] = useState(false);
  const handleUser = ({ name, value }: { name: string; value: string }) => {
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    api
      .post("/token/", {
        username: person.username,
        password: person.password,
      })
      .then(response => {
        const token = response.data?.access;
        if (token) {
          setToken(token);
          navigate("/products");
        }
      })
      .catch((error: AxiosError) => {
        if (error.response?.status === 401) {
          setFalid(true);
        }
      });
  };
  return (
    <main>
      <div>
        <div className="image">
          <img src={logo} alt="marca da empresa" />
        </div>
        <form onSubmit={e => handleSubmit(e)}>
          <label id="username">
            Usuário:
            <input
              required
              data-testid="input-username"
              aria-labelledby="username"
              type="text"
              name="username"
              value={person.username}
              onChange={e => handleUser(e.target)}
            />
          </label>
          <label id="password">
            Senha:
            <input
              required
              data-testid="input-password"
              aria-labelledby="password"
              type="password"
              name="password"
              value={person.password}
              onChange={e => handleUser(e.target)}
            />
          </label>
          <div className="btn-entrar">
            <button type="submit">Entrar</button>
          </div>
        </form>
        {falidLogin && <p>Usuário ou senha inválidos</p>}
      </div>
    </main>
  );
};
