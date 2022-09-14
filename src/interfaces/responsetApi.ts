export interface IGet {
  count: number;
  next: null | number;
  previous: null | number;
  results: [];
}

export interface IProducts {
  nome: string;
  preco_de_venda: string;
  imagem: string | null;
}

export interface IEmbalagem {
  id: number;
  nome: string;
  local_de_compra: string;
  preco: string;
  atualizado: Date;
}
