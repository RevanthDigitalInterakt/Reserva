//#region Action Types

export enum LocalitiesTypes {
    LOAD_STATES_REQUEST = '@locality/LOAD_STATES_REQUEST',
    LOAD_STATES_SUCCESS = '@locality/LOAD_STATES_SUCCESS',
    LOAD_STATES_FAILURE = '@locality/LOAD_STATES_FAILURE',

    LOAD_COUNTIES_REQUEST = '@locality/LOAD_COUNTIES_REQUEST',
    LOAD_COUNTIES_SUCCESS = '@locality/LOAD_COUNTIES_SUCCESS',
    LOAD_COUNTIES_FAILURE = '@locality/LOAD_COUNTIES_FAILURE',
}

//#endregion

//#region Data Types

export interface State {
    id: number;
    sigla: string;
    nome: string;
    regiao: {
        id: number;
        sigla: string;
        nome: string;
    }
}

export interface County {
    id: number
    nome: string;
    municipio: {
        id: number;
        nome: string;
    }
}

//#region

//#region State Type

export interface LocalitiesState {
    readonly dataState: State[];
    readonly dataCounty: County[];
    readonly loading: boolean;
    readonly error: boolean;
}

  //#region
