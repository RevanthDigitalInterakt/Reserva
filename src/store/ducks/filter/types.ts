//#region Action Types

export enum FilterTypes {
  LOAD_FILTER_SUCCESS = "@filter/LOAD_FILTER_SUCCESS",
}

export interface Filter {
  colors: string[];
  sizes: string[];
  maxPrice: number;
  minPrice: number;
  categories: { id: string; description: string }[];
}

export interface FilterState {
  readonly data: Filter | null;
  readonly loading: boolean;
  readonly error: boolean;
}
