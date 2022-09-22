export interface IGet {
  count: number;
  next: null | number;
  previous: null | number;
  results: [];
}

export interface IProducts {
  id: string;
  nome: string;
  preco_de_venda: string;
  imagem: string | null;
  embalagem: IEmbalagem;
  receitas: IRecipes[];
}

export interface IEmbalagem {
  id: string;
  nome: string;
  local_de_compra: string;
  preco: string;
  atualizado: Date;
}

export interface IRecipes {
  id: string;
  titulo: string;
  tamanho: string;
  preparo: string;
  tipo: string;
  custo_receita: number;
}
