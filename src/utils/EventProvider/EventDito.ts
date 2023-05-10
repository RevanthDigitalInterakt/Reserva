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

export type EventsDitoValues = {
  id: string | null;
  action: string;
  data: DataValues | Ordered;
};

export namespace EventsOptions {
  export type SendAccessedHome = Pick<EventsDitoValues, | 'id' | 'action' | 'data' > & {};
  export type OrderedEvent = Pick<EventsDitoValues, | 'id' | 'action' | 'data'> & {};
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
    };
