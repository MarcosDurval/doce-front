import { useEffect, useState } from "react";

import CardPacking from "@/components/CardPacking";
import Header from "@/components/Header";
import getApi from "@/helpApi/apiGet";
import { IGet } from "@/interface/responseApi";

const ListPacking = () => {
  const [packing, setPacking] = useState<IGet | null>({} as IGet);
  const [fail, setFail] = useState<boolean>(false);
  const [load, setLoad] = useState<boolean>(true);
  const PAGE = window.location.pathname.slice(1);

  useEffect(() => {
    getApi(PAGE)
      .then(response => {
        if (response) {
          setPacking(response);
        } else {
          setFail(true);
        }
      })
      .finally(() => setLoad(false));
  }, [PAGE]);

  if (load) {
    return <h1>Carregando...</h1>;
  }

  if (fail) {
    return <h1>Algo deu Errado :(</h1>;
  }

  return (
    <>
      <Header page={PAGE} setList={setPacking} />
      <main>
        {packing && packing.results.length > 0 ? (
          <div>
            {packing.results.map((product, index) => {
              return <CardPacking key={index} results={product} />;
            })}
          </div>
        ) : null}
      </main>
    </>
  );
};

export default ListPacking;
