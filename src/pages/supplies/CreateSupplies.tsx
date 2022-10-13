import "@/styles/components/formsModal.scss";

import React, { ChangeEvent, useState } from "react";

import HeaderSimple from "@/components/HeaderSimple";
import InputGeneric from "@/components/input/InputGeneric";
import SelectGeneric from "@/components/input/SelectGeneric";
import { ISupplies } from "@/interface/responseApi";
import { createdItem } from "@/utils/methodApi/apiGet";

interface IProps {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  reload: () => void;
}

const Modal = ({ setModal, reload }: IProps) => {
  const PAGE = "insumos";
  const [supplie, setSupplie] = useState<ISupplies>({} as ISupplies);

  const handleSubimit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createdItem(PAGE, supplie).then(() => {
      setModal(false);
      reload();
    });
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSupplie(prev => ({ ...prev, [name]: value }));
  };
  return (
    <div className="modal">
      <div className="container">
        <HeaderSimple title="INSUMO" />
        <div>
          <form onSubmit={handleSubimit}>
            <InputGeneric
              label="Insumo"
              id="insumo"
              name="nome"
              type="text"
              value={supplie?.nome || ""}
              handleChange={handleChange}
            />
            <InputGeneric
              label="Local de compra"
              id="local"
              name="local_de_compra"
              type="text"
              value={supplie?.local_de_compra || ""}
              handleChange={handleChange}
            />
            <InputGeneric
              label="Preço"
              id="preco"
              name="preco"
              type="number"
              value={supplie?.preco || ""}
              handleChange={handleChange}
            />
            <InputGeneric
              label="Data"
              id="date"
              name="atualizado"
              type="date"
              value={supplie?.atualizado || ""}
              handleChange={handleChange}
            />
            <InputGeneric
              label="Quantidade da embalagem"
              id="quantidade"
              name="quantidade_embalagem"
              type="number"
              value={supplie?.quantidade_embalagem || ""}
              handleChange={handleChange}
            />
            <SelectGeneric
              value={supplie.unidade_medida || ""}
              id="unidade_medida"
              label="Unidade de medida"
              name="unidade_medida"
              elements={["Gramas", "Unidade", "Mililitros"]}
              handleChange={handleChange}
            />
            <div id="group-btn">
              <button type="submit">Cadastrar</button>
              <button onClick={() => setModal(false)}>Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
