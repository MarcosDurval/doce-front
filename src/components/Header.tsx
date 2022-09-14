import { KeyboardEvent, useState } from "react";
import { Link } from "react-router-dom";

import { IGet } from "@/interfaces/responsetApi";
import api from "@/services/api";

interface IProps {
  page: string;
  setList: React.Dispatch<React.SetStateAction<never[]>>;
}
const Header = ({ page, setList }: IProps) => {
  const [search, setSearch] = useState<string>("");
  const searchApi = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      api.get(`/api/v1${page}/?search=${search}`).then(response => {
        const data = response.data as unknown as IGet;
        setList(data.results);
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
        Novo
      </Link>
    </header>
  );
};

export default Header;
