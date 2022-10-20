import "@/styles/components/footer.scss";

import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

import { IGet } from "@/interface/responseApi";
import getApi from "@/utils/methodApi/apiGet";

interface IProps {
  PAGE: string;
  setList: React.Dispatch<React.SetStateAction<IGet | null>>;
  get: IGet;
}

const Footer = ({ PAGE, setList, get }: IProps) => {
  const teste = (pageList: string) => {
    const selectPage = pageList.split("/").pop();
    getApi(PAGE, selectPage).then(response => {
      setList(response);
    });
  };
  return (
    <footer className="footerList">
      <AiOutlineArrowLeft
        style={{ color: get.previous ? "black" : "white" }}
        onClick={() => teste(get.previous as string)}
      />
      <AiOutlineArrowRight
        style={{ color: get.next ? "black" : "white" }}
        onClick={() => teste(get.next as string)}
      />
    </footer>
  );
};

export default Footer;
