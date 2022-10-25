import React, { ChangeEvent, useEffect, useState } from "react";

import InputGeneric from "@/components/input/InputGeneric";
import { IPacking } from "@/interface/responseApi";
import getApi, { patchApi } from "@/utils/methodApi/api";

interface IProps {
  ID: string;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  reload: () => void;
}

const EditPacking = ({ ID, setModal, reload }: IProps) => {
  const PAGE = "embalagem";
  const [packing, setInputPacking] = useState<IPacking>({} as IPacking);

  useEffect(() => {
    getApi(PAGE, `${ID}/`).then(response => {
      if (response) {
        setInputPacking(response as unknown as IPacking);
      }
    });
  }, [PAGE, ID]);

  const handleSubimit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    patchApi(PAGE, ID, packing).then(() => {
      setModal(false);
      reload();
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputPacking(prev => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <h1>Embalagem</h1>
      <main>
        <form onSubmit={handleSubimit}>
          <InputGeneric
            label="Embalagem"
            id="embalagem"
            name="nome"
            type="text"
            value={packing?.nome || ""}
            handleChange={handleChange}
          />
          <InputGeneric
            label="Local de compra"
            id="local"
            name="local_de_compra"
            type="text"
            value={packing?.local_de_compra || ""}
            handleChange={handleChange}
          />
          <InputGeneric
            label="Preço"
            id="preco"
            name="preco"
            type="number"
            value={packing?.preco || ""}
            handleChange={handleChange}
          />
          <InputGeneric
            label="Data"
            id="date"
            name="atualizado"
            type="date"
            value={packing?.atualizado || ""}
            handleChange={handleChange}
          />
          <button type="submit">Alterar</button>
          <button onClick={() => setModal(false)}>Cancelar</button>
        </form>
      </main>
    </>
  );
};

export default EditPacking;
