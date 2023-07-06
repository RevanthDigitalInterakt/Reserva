type DataValues = {
  dispositivo: string;
  origem: string;
};

type Ordered = {
  id_transacao: string;
  quantidade_produtos: number | number[];
  total: number;
  subtotal: number;
  total_frete: number;
  metodo_pagamento: string;
  id: string;
};

type TProductOrderPlaced = {
  id: string;
  id_transacao: string;
  quantidade: number;
  marca: string;
  id_produto: string;
  nome_produto: string;
  nome_categoria: string;
  tamanho: string;
  cor: string;
  preco_produto: number;
  origem: string;
};

type Department = {
  nome_departamento: string;
};

type Category = {
  nome_categoria: string;
};

type Searched = {
  term: string;
  itens_encontrados: number;
  dispositivo: string;
};

type SignedUp = {
  email: string;
  cpf: string;
};

export type EventsDitoValues = {
  id: string | null;
  action: string;
  data: DataValues | Ordered | Department | Category | Searched | SignedUp | TProductOrderPlaced;
};

export namespace EventsOptions {
  export type SendAccessedHome = Pick<EventsDitoValues, | 'id' | 'action' | 'data' > & {};
  export type OrderedEvent = Pick<EventsDitoValues, | 'id' | 'action' | 'data'> & {};
  export type SendAccessedDepartment = Pick<EventsDitoValues, | 'id' | 'action' | 'data' > & {};
  export type SendAccessedCategory = Pick<EventsDitoValues, | 'id' | 'action' | 'data' > & {};
  export type SearchedEvent = Pick<EventsDitoValues, | 'id' | 'action' | 'data'> & {};
  export type SignedUpEvent = Pick<EventsDitoValues, | 'id' | 'action' | 'data'> & {};
  export type ProductOrderPlacedEvent = Pick<EventsDitoValues, | 'id' | 'action' | 'data'> & {};
}
// Os nomes dos eventos DEVEM ser enviados para a Dito em letras minúsculas
export type EventOptionsDitoFn =
    | {
      type: 'acessou-home';
      payload: EventsOptions.SendAccessedHome;
    }
    | {
      type: 'fez-pedido';
      payload: EventsOptions.OrderedEvent;
    }
    | {
      type: 'acessou-departamento';
      payload: EventsOptions.SendAccessedDepartment;
    }
    | {
      type: 'acessou-categoria';
      payload: EventsOptions.SendAccessedCategory;
    }
    | {
      type: 'buscou-produto';
      payload: EventsOptions.SearchedEvent;
    }
    | {
      type: 'fez-cadastro';
      payload: EventsOptions.SignedUpEvent;
    }
    | {
      type: 'fez-pedido-produto';
      payload: EventsOptions.ProductOrderPlacedEvent;
    };
