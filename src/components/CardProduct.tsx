import { Link } from "react-router-dom";

import { IProducts } from "@/interface/responseApi";

interface IProps {
  results: IProducts;
}

export const CardProduct = ({ results }: IProps) => {
  const convertPrice = (moeda: string) => {
    const floatMoeda = parseFloat(moeda);
    return floatMoeda.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };
  return (
    <Link to={`${results.id}`}>
      <div>
        {/* image */}
        <div>
          <img
            src={results.imagem || ""}
            alt="Imagem do Produto"
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src =
                "https://www.madeireiraestrela.com.br/images/joomlart/demo/default.jpg";
            }}
          />
        </div>
        {/* texto */}
        <div>
          <h5>Produto: {results.nome}</h5>
          <p>Preço de venda: {convertPrice(results.preco_de_venda)}</p>
          {results.receitas.map(receita => (
            <p key={receita.id}>Receita: {receita.titulo}</p>
          ))}
        </div>
      </div>
    </Link>
  );
};
