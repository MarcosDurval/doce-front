import "@/styles/pages/products.scss";

import { useEffect, useState } from "react";

import { CardProduct } from "@/components/CardProduct";
import Header from "@/components/Header";
import getApi from "@/helpApi/apiGet";
import { IGet } from "@/interface/responseApi";

const ListProducts = () => {
  const [products, setProducts] = useState<IGet | null>({} as IGet);
  const [faill, setFail] = useState<boolean>(false);
  const [load, setLoad] = useState<boolean>(true);
  const page = window.location.pathname.slice(1);

  useEffect(() => {
    getApi(page)
      .then(response => {
        if (response) {
          setProducts(response);
        } else {
          setFail(true);
        }
      })
      .finally(() => setLoad(false));
  }, [page]);

  if (load) {
    return <h1>Carregando...</h1>;
  }

  if (faill) {
    return <h1>Algo deu Errado :(</h1>;
  }

  return (
    <>
      <main className="main-pd">
        <Header page={page} setList={setProducts} />
        {products && products.results.length > 0 ? (
          <div>
            {products.results.map((product, index) => {
              return <CardProduct key={index} results={product} />;
            })}
          </div>
        ) : null}
      </main>
    </>
  );
};

export default ListProducts;
