import { action } from "typesafe-actions";
import { FilterTypes, Filter } from "./types";

export const loadFilterSuccess = (data: Filter) =>
  action(FilterTypes.LOAD_FILTER_SUCCESS, { data });
