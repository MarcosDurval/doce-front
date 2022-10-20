import React, { ChangeEvent, useEffect, useState } from "react";

import InputGeneric from "@/components/input/InputGeneric";
import SelectGeneric from "@/components/input/SelectGeneric";
import { ISupplies } from "@/interface/responseApi";
import getApi, { patchApi } from "@/utils/methodApi/apiGet";

interface IProps {
  id: string;
  PAGE: string;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  reload: () => void;
}

const ModalEdit = ({ setModal, id, reload, PAGE }: IProps) => {
  const [inputSupplie, setinputSupplie] = useState<ISupplies>({} as ISupplies);

  useEffect(() => {
    getApi(PAGE, `${id}/`).then(response => {
      if (response) {
        setinputSupplie(response as unknown as ISupplies);
      }
    });
  }, [PAGE, id]);

  const handleSubimit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    patchApi(PAGE, id, inputSupplie).then(() => {
      setModal(false);
      reload();
    });
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setinputSupplie(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="modal">
      <div className="container">
        <h1>INSUMO</h1>
        <div>
          <form onSubmit={handleSubimit}>
            <InputGeneric
              label="Insumo"
              id="insumo"
              name="nome"
              type="text"
              value={inputSupplie?.nome || ""}
              handleChange={handleChange}
            />
            <InputGeneric
              label="Local de compra"
              id="local"
              name="local_de_compra"
              type="text"
              value={inputSupplie?.local_de_compra || ""}
              handleChange={handleChange}
            />
            <InputGeneric
              label="Preço"
              id="preco"
              name="preco"
              type="number"
              value={inputSupplie?.preco || ""}
              handleChange={handleChange}
            />
            <InputGeneric
              label="Data"
              id="date"
              name="atualizado"
              type="date"
              value={inputSupplie?.atualizado || ""}
              handleChange={handleChange}
            />
            <InputGeneric
              label="Quantidade da embalagem"
              id="quantidade"
              name="quantidade_embalagem"
              type="number"
              value={inputSupplie?.quantidade_embalagem || ""}
              handleChange={handleChange}
            />
            <SelectGeneric
              value={inputSupplie?.unidade_medida || ""}
              id="unidade_medida"
              label="Unidade de medida"
              name="unidade_medida"
              elements={["Gramas", "Unidade", "Mililitros"]}
              handleChange={handleChange}
            />
            <div id="group-btn">
              <button type="submit">Atualizar Insumo</button>
              <button onClick={() => setModal(false)}>Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalEdit;
