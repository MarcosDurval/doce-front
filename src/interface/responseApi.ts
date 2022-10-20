export interface IGet {
  count: number;
  next: null | string;
  previous: null | string;
  results: [];
}

export interface IProducts {
  id: string;
  nome: string;
  preco_de_venda: string;
  imagem: string | null;
  embalagem: IPacking;
  receitas: IRecipes[];
}

export interface IRecipes {
  id: string;
  titulo: string;
  tamanho: string;
  preparo: string;
  tipo: string;
  custo_receita: number;
}
export interface ISupplies {
  id: string;
  nome: string;
  local_de_compra: string;
  preco: string;
  atualizado: string;
  quantidade_embalagem: string;
  unidade_medida: string;
}
export interface IPacking {
  id: string;
  nome: string;
  local_de_compra: string;
  preco: string;
  atualizado: string;
}
