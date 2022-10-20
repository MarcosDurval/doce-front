import { useEffect, useState } from "react";

import CardPacking from "@/components/CardPacking";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SideBar from "@/components/Sidebar";
import { IGet } from "@/interface/responseApi";
import CreatePacking from "@/pages/packing/CreatedPacking";
import EditPacking from "@/pages/packing/EditPacking";
import getApi, { deleteApi } from "@/utils/methodApi/apiGet";

const ListPacking = () => {
  const [packing, setPacking] = useState<IGet | null>({} as IGet);
  const [isEditModal, setEditModal] = useState<boolean>(false);
  const [isCreateModal, setModal] = useState<boolean>(false);
  const [editId, setEdit] = useState<string>("");
  const [fail, setFail] = useState<boolean>(false);
  const [load, setLoad] = useState<boolean>(true);
  const PAGE = "embalagem";

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

  const destroyPacking = async (id: string) => {
    await deleteApi(PAGE, id);
    getApi(PAGE).then(response => {
      if (response) {
        setPacking(response);
      } else {
        setFail(true);
      }
    });
  };

  const setStatusEdit = (id: string) => {
    setEditModal(true);
    setEdit(id);
  };

  const reload = async () => {
    getApi(PAGE).then(response => {
      if (response) {
        setPacking(response);
      } else {
        setFail(true);
      }
    });
  };

  if (load) {
    return <h1>Carregando...</h1>;
  }

  if (fail) {
    return <h1>Algo deu Errado :(</h1>;
  }

  return (
    <>
      <Header page={PAGE} setList={setPacking} setModal={setModal} />
      <main id="main">
        <SideBar />
        {packing && packing.results.length > 0 ? (
          <section id="cardList">
            {packing.results.map((product, index) => {
              return (
                <CardPacking
                  key={index}
                  results={product}
                  destroyPacking={destroyPacking}
                  setStatusEdit={setStatusEdit}
                />
              );
            })}
          </section>
        ) : null}
        {isEditModal && (
          <EditPacking ID={editId} setModal={setEditModal} reload={reload} />
        )}
        {isCreateModal && <CreatePacking setModal={setModal} reload={reload} />}
      </main>
      <Footer get={packing as IGet} setList={setPacking} PAGE={PAGE} />
    </>
  );
};

export default ListPacking;
