import { MdDeleteForever, MdModeEdit } from "react-icons/md";

import { IPacking } from "@/interface/responseApi";
import { convertDate, convertPrice } from "@/utils/convert";

interface IProps {
  results: IPacking;
  destroyPacking: (id: string) => void;
  setStatusEdit: (id: string) => void;
}

const CardPacking = ({ results, destroyPacking, setStatusEdit }: IProps) => {
  return (
    <div className="card">
      <div>
        <p>Embalagem: {results.nome}</p>
        <p>Local de compra: {results.local_de_compra}</p>
        <p>Preço: {convertPrice(results.preco)}</p>
        <p>Atualização: {convertDate(results.atualizado)}</p>
      </div>
      <div className="btn-card">
        <MdModeEdit onClick={() => setStatusEdit(results.id)} />
        <MdDeleteForever onClick={() => destroyPacking(results.id)} />
      </div>
    </div>
  );
};

export default CardPacking;
