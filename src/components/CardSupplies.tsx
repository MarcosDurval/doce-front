import { MdDeleteForever, MdModeEdit } from "react-icons/md";

import { ISupplies } from "@/interface/responseApi";
import { convertDate, convertPrice } from "@/utils/convert";

interface IProps {
  results: ISupplies;
  destroySupplie: (id: string) => void;
  setStatusEdit: (id: string) => void;
}

const CardSupplie = ({ results, destroySupplie, setStatusEdit }: IProps) => {
  return (
    <div className="card" data-testid="card-supplie">
      <div>
        <p>Insumo: {results.nome}</p>
        <p>Local de compra: {results.local_de_compra}</p>
        <p>Preço: {convertPrice(results.preco)}</p>
        <p>Atualização: {convertDate(results.atualizado)}</p>
        <p>Unidade de medida: {results.unidade_medida}</p>
        <p>Quantidade: {results.quantidade_embalagem}</p>
      </div>
      <div className="btn-card">
        <button onClick={() => setStatusEdit(results.id)}>
          <MdModeEdit />
        </button>
        <button onClick={() => destroySupplie(results.id)}>
          <MdDeleteForever />
        </button>
      </div>
    </div>
  );
};

export default CardSupplie;
