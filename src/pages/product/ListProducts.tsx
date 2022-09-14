import "@/styles/pages/products.scss";

import { useEffect, useState } from "react";

import Header from "@/components/Header";
import api from "@/services/api";

const ListProducts = () => {
  const [products, setProducts] = useState([]);
  const page = window.location.pathname;
  useEffect(() => {
    api
      .get("api/v1/produtos/")
      .then(response => {
        setProducts(response.data.results);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <main className="main-pd">
        <Header page={page} setList={setProducts} />
        {products.length > 0
          ? products.map((_product, index) => {
              return <h1 key={index}>olá mundo</h1>;
            })
          : null}
      </main>
    </>
  );
};

export default ListProducts;
