import "@/styles/pages/products.scss";

import { useEffect, useState } from "react";

import { CardProduct } from "@/components/CardProduct";
import Header from "@/components/Header";
import api from "@/services/api";

const ListProducts = () => {
  const [products, setProducts] = useState([]);
  const [load, setLoad] = useState<boolean>(true);
  const page = window.location.pathname;
  useEffect(() => {
    api
      .get("api/v1/produtos/")
      .then(response => {
        setProducts(response.data.results);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => setLoad(false));
  }, []);

  if (load) {
    return <h1>Carregando...</h1>;
  }

  return (
    <>
      <main className="main-pd">
        <Header page={page} setList={setProducts} />
        {products.length > 0 ? (
          <div>
            {products.map((product, index) => {
              return <CardProduct key={index} results={product} />;
            })}
          </div>
        ) : null}
      </main>
    </>
  );
};

export default ListProducts;
