import { KeyboardEvent, useState } from "react";
import { Link } from "react-router-dom";

import getApi from "@/helpApi/apiGet";
import { IGet } from "@/interface/responseApi";

interface IProps {
  page: string;
  setList: React.Dispatch<React.SetStateAction<IGet | null>>;
}

const Header = ({ page, setList }: IProps) => {
  const [search, setSearch] = useState<string>("");
  const searchApi = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      getApi(page, `?search=${search}`).then(response => {
        setList(response);
      });
    }
  };
  return (
    <header>
      <h1>Doce</h1>
      <label htmlFor="search">
        <input
          id="search"
          name="search"
          type="text"
          data-testid="search"
          value={search}
          onChange={e => setSearch(e.target.value)}
          onKeyDown={searchApi}
        />
      </label>
      <Link id="btn-new" to={`${page}/cadastro`}>
        Cadastro
      </Link>
    </header>
  );
};

export default Header;
