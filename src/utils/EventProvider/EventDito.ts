type DataValues = {
  dispositivo: string;
  origem: string;
};

export type EventsDitoValues = {
  id: string | null;
  action: string;
  data: DataValues;
};

export namespace EventsOptions {
  export type SendAccessedHome = Pick<EventsDitoValues, | 'id' | 'action' | 'data' > & {};
}
// Os nomes dos eventos DEVEM ser enviados para a Dito em letras minúsculas
export type EventOptionsDitoFn =
    | {
      type: 'acessou-home';
      payload: EventsOptions.SendAccessedHome;
    };
