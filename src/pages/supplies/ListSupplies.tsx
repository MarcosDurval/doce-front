import "@/styles/pages/simplePage.scss";

import { useEffect, useState } from "react";

import CardSupplie from "@/components/CardSupplies";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SideBar from "@/components/Sidebar";
import { IGet } from "@/interface/responseApi";
import getApi, { deleteApi } from "@/utils/methodApi/api";

import CreateSupplies from "./CreateSupplies";
import EditSupplies from "./EditSupplies";

const ListSupplies = () => {
  const [supplie, setSupplie] = useState<IGet | null>({} as IGet);
  const [isCreateModal, setModal] = useState<boolean>(false);
  const [isEditModal, setEditModal] = useState<boolean>(false);
  const [editId, setEdit] = useState<string>("");
  const [fail, setFail] = useState<boolean>(false);
  const [load, setLoad] = useState<boolean>(true);
  const PAGE = "insumos";

  useEffect(() => {
    getApi(PAGE)
      .then(response => {
        if (response) {
          setSupplie(response);
        } else {
          setFail(true);
        }
      })
      .finally(() => setLoad(false));
  }, [PAGE]);

  const destroySupplie = async (id: string) => {
    await deleteApi(PAGE, id);
    getApi(PAGE).then(response => {
      if (response) {
        setSupplie(response);
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
        setSupplie(response);
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
      <SideBar />
      <Header page={PAGE} setList={setSupplie} setModal={setModal} />
      <main id="main">
        {supplie && supplie.results.length > 0 ? (
          <section id="cardList">
            {supplie.results.map((product, index) => {
              return (
                <CardSupplie
                  key={index}
                  results={product}
                  destroySupplie={destroySupplie}
                  setStatusEdit={setStatusEdit}
                />
              );
            })}
          </section>
        ) : null}
      </main>
      {isCreateModal && <CreateSupplies setModal={setModal} reload={reload} />}
      {isEditModal && (
        <EditSupplies
          setModal={setEditModal}
          id={editId}
          reload={reload}
          PAGE={PAGE}
        />
      )}
      <Footer get={supplie as IGet} setList={setSupplie} PAGE={PAGE} />
    </>
  );
};

export default ListSupplies;
