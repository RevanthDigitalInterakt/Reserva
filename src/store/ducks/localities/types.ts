//#region Action Types

export enum LocalitiesTypes {
    LOAD_LOCALITY_REQUEST = '@categories/LOAD_LOCALITY_REQUEST',
    LOAD_LOCALITY_SUCCESS = '@categories/LOAD_LOCALITY_REQUEST',
    LOAD_LOCALITY_FAILURE = '@categories/LOAD_LOCALITY_REQUEST',
}

//#endregion

//#region Data Types

export interface Localities {
    id: number;
    sigla: string;
    nome: string;
    regiao: {
        id: number;
        sigla: string;
        nome: string;
    }
}

//#region

//#region State Type

export interface LocalitiesState {
    readonly data: Localities[];
    readonly loading: boolean;
    readonly error: boolean;
}

  //#region
