import { Link } from "react-router-dom";

import { IEmbalagem } from "@/interface/responseApi";
import { convertDate, convertPrice } from "@/utils/convert";

interface IProps {
  results: IEmbalagem;
}

const CardPacking = ({ results }: IProps) => {
  return (
    <Link to={`${results.id}`}>
      <p>Embalagem: {results.nome}</p>
      <p>Local de compra: {results.local_de_compra}</p>
      <p>Preço: {convertPrice(results.preco)}</p>
      <p>data: {convertDate(results.atualizado)}</p>
    </Link>
  );
};

export default CardPacking;
