import "@/styles/components/header.scss";

import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

import { IGet } from "@/interface/responseApi";
import getApi from "@/utils/methodApi/api";

interface IProps {
  page: string;
  setList: React.Dispatch<React.SetStateAction<IGet | null>>;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({ page, setList, setModal }: IProps) => {
  const [search, setSearch] = useState<string>("");

  const searchApi = () => {
    getApi(page, `?search=${search}`).then(response => {
      setList(response);
    });
  };

  const openSide = () => {
    const open = document.querySelector(".wrapper");
    const body = document.querySelector("body");
    const side = document.querySelector(".sidebar");

    body?.classList.add("scroll");
    open?.classList.add("backside");
    side?.classList.add("mobiside");
  };

  const handleModal = () => {
    setModal(true);
  };

  return (
    <header className="header">
      <button className="openside" onClick={openSide}>
        &#9776;
      </button>
      <div className="group-search">
        <label htmlFor="search">
          <input
            id="search"
            name="search"
            type="text"
            data-testid="search"
            value={search}
            placeholder="Buscar"
            onChange={e => setSearch(e.target.value)}
            onKeyDown={e => (e.key == "Enter" ? searchApi() : null)}
          />
        </label>
        <AiOutlineSearch onClick={searchApi} />
      </div>
      <button onClick={handleModal}>Novo</button>
    </header>
  );
};

export default Header;
