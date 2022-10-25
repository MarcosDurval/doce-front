import "@/styles/components/footer.scss";

import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

import { IGet } from "@/interface/responseApi";
import getApi from "@/utils/methodApi/api";

interface IProps {
  PAGE: string;
  setList: React.Dispatch<React.SetStateAction<IGet | null>>;
  get: IGet;
}

const Footer = ({ PAGE, setList, get }: IProps) => {
  const nextPreviousPage = (pageList: string) => {
    const selectPage = pageList.split("/").pop();
    getApi(PAGE, selectPage).then(response => {
      setList(response);
    });
  };
  return (
    <footer className="footerList" data-testid="footerList">
      <button
        disabled={!get.previous}
        onClick={() => nextPreviousPage(get.previous as string)}
      >
        <AiOutlineArrowLeft
          style={{ color: get.previous ? "black" : "white" }}
        />
      </button>
      <button
        disabled={!get.next}
        onClick={() => nextPreviousPage(get.next as string)}
      >
        <AiOutlineArrowRight style={{ color: get.next ? "black" : "white" }} />
      </button>
    </footer>
  );
};

export default Footer;
