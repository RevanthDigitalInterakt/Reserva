//#region Action Types

export enum CategoriesTypes {
  LOAD_REQUEST = '@categories/LOAD_REQUEST',
  LOAD_SUCCESS = '@categories/LOAD_SUCCESS',
  LOAD_FAILURE = '@categories/LOAD_FAILURE',
}

//#endregion

//#region Data Types

export interface Category {
  childs: Category[];
  link: string;
  linkRoute: string;
  name: string;
  route: string;
  style: string;
  type: string;
  highlight?: boolean;
  opened?: boolean;
}

//#region

//#region State Type

export interface CategoriesState {
  readonly data: Category[];
  readonly loading: boolean;
  readonly error: boolean;
}

//#region
