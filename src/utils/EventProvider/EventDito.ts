type TDataValues = {
  dispositivo: string;
  origem: string;
};

type TOrdered = {
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
  categorias_produto: string;
  tamanho: string;
  cor: string;
  preco_produto: number;
  origem: string;
};

type TDepartment = {
  nome_departamento: string;
};

type TCategory = {
  nome_categoria: string;
};

type TSearched = {
  term: string;
  itens_encontrados: number;
  dispositivo: string;
  client_provider: string;
};

type TSignedUp = {
  email: string;
  cpf: string;
};

type TProduct = {
  marca: string;
  id_produto: string;
  id: string;
  nome_produto: string;
  nome_categoria: string;
  tamanho: string;
  cor: string;
  preco_produto: number;
};

type TAddToCart = {
  marca: string;
  id_produto: string;
  nome_produto: string;
  categorias_produto: string;
  tamanho: string;
  cor: string;
  preco_produto: number;
};

type TAddToWishlist = {
  marca: string;
  id_produto: string;
  nome_produto: string;
  categorias_produto: string;
  tamanho: string;
  cor: string;
  preco_produto: number;
};

type TAccessBag = {
  quantidade: number;
  total: number;
};

export type TStatusCart = {
  status: string;
  marca?: string;
  id_produto?: string[];
  nome_produto?: string[];
  nome_categoria?: string[];
  subtotal: number;
  origem: string;
};

export type TNewsletter = {
  origem: string;
  id_campanha: string;
  nome: string;
  email: string;
  telefone: string;
};

export type THelpCenter = {
  pagina?: string;
};

export type TEventsDitoValues = {
  id: string | null;
  action: string;
  data:
  TDataValues |
  TOrdered |
  TDepartment |
  TCategory |
  TSearched |
  TSignedUp |
  TProduct |
  TAddToCart |
  TProductOrderPlaced |
  TAddToWishlist |
  TAccessBag |
  TStatusCart |
  TNewsletter |
  THelpCenter;
};

export namespace EventsOptions {
  export type SendAccessedHome = Pick<TEventsDitoValues, | 'id' | 'action' | 'data' > & {};
  export type OrderedEvent = Pick<TEventsDitoValues, | 'id' | 'action' | 'data'> & {};
  export type SendAccessedDepartment = Pick<TEventsDitoValues, | 'id' | 'action' | 'data' > & {};
  export type SendAccessedCategory = Pick<TEventsDitoValues, | 'id' | 'action' | 'data' > & {};
  export type SearchedEvent = Pick<TEventsDitoValues, | 'id' | 'action' | 'data'> & {};
  export type SignedUpEvent = Pick<TEventsDitoValues, | 'id' | 'action' | 'data'> & {};
  export type ProductOrderPlacedEvent = Pick<TEventsDitoValues, | 'id' | 'action' | 'data'> & {};
  export type AccessProduct = Pick<TEventsDitoValues, | 'id' | 'action' | 'data'> & {};
  export type AddToCartEvent = Pick<TEventsDitoValues, | 'id' | 'action' | 'data'> & {};
  export type AddToWishlistEvent = Pick<TEventsDitoValues, | 'id' | 'action' | 'data'> & {};
  export type AccessBagEvent = Pick<TEventsDitoValues, | 'id' | 'action' | 'data'> & {};
  export type StatusCartEvent = Pick<TEventsDitoValues, | 'id' | 'action' | 'data'> & {};
  export type NewsletterEvent = Pick<TEventsDitoValues, | 'id' | 'action' | 'data'> & {};
  export type HelpCenterEvent = Pick<TEventsDitoValues, | 'id' | 'action' | 'data'> & {};
}
// Os nomes dos eventos DEVEM ser enviados para a Dito em letras minúsculas
export type TEventOptionsDitoFn =
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
    }
    | {
      type: 'acessou-produto';
      payload: EventsOptions.AccessProduct;
    }
    | {
      type: 'adicionou-produto-ao-carrinho';
      payload: EventsOptions.AddToCartEvent;
    }
    | {
      type: 'adicionou-produto-a-wishlist';
      payload: EventsOptions.AddToWishlistEvent;
    }
    | {
      type: 'acessou-carrinho';
      payload: EventsOptions.AccessBagEvent;
    }
    | {
      type: 'status-carrinho';
      payload: EventsOptions.StatusCartEvent;
    }
    | {
      type: 'newsletter';
      payload: EventsOptions.NewsletterEvent;
    }
    | {
      type: 'acessou-central-de-ajuda';
      payload: EventsOptions.HelpCenterEvent;
    };
