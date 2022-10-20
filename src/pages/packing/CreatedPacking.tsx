import React, { ChangeEvent, useState } from "react";

import HeaderSimple from "@/components/HeaderSimple";
import InputGeneric from "@/components/input/InputGeneric";
import { IPacking } from "@/interface/responseApi";
import { createdItem } from "@/utils/methodApi/apiGet";

interface IProps {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  reload: () => void;
}

const CreatePacking = ({ setModal, reload }: IProps) => {
  const PAGE = "embalagem";
  const [packing, setPacking] = useState<IPacking>({} as IPacking);

  const handleSubimit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createdItem(PAGE, packing).then(() => {
      setModal(false);
      reload();
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPacking(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="modal">
      <div className="container">
        <HeaderSimple title="Embalagem" />
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
            <button type="submit">Cadastrar</button>
            <button onClick={() => setModal(false)}>Cancelar</button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default CreatePacking;
