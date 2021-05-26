export interface Filter {
  colors: string[];
  sizes: string[];
  maxPrice: number;
  minPrice: number;
  categories: string[];
}

export interface FilterState {
  readonly data: Filter[];
  readonly loading: boolean;
  readonly error: boolean;
}
