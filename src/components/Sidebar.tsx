import "@/styles/components/sidebar.scss";

import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import logo from "@/assets/logo.png";

const SideBar = () => {
  const navigate = useNavigate();

  const exit = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const closedSide = () => {
    const open = document.querySelector(".wrapper");
    const body = document.querySelector("body");
    const side = document.querySelector(".sidebar");
    body?.classList.remove("scroll");
    open?.classList.remove("backside");
    side?.classList.remove("mobiside");
  };

  return (
    <aside className="wrapper">
      <nav className="sidebar">
        <div className="btnClosedSide">
          <AiOutlineClose onClick={closedSide} />
        </div>
        <div className="profile">
          <img src={logo} alt="logo" />
          <h3>Doce Desejo</h3>
        </div>
        <ul>
          <li>
            <a href="/produtos">Produtos</a>
          </li>
          <li>
            <a href="/receitas"> Receitas</a>
          </li>
          <li>
            <a href="/insumos"> Insumos</a>
          </li>
          <li>
            <a href="/embalagem"> Embalagens</a>
          </li>
          <li>
            <div>
              <button onClick={exit}>Sair</button>
            </div>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
