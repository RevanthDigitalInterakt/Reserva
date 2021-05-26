import { useColorScheme } from "react-native";
import axios from "axios";
import { call, CallEffect, put, PutEffect } from "redux-saga/effects";

import { loadProductsSuccess, loadProductsFailure } from "./actions";
import { api, apiBffProducts } from "../../../services/api";
import { env } from "../../../config/env";
import { AnyAction } from "redux";
import { Product } from "../product/types";
import { loadFilterSuccess } from "../filter/actions";
import { Filter } from "../filter/types";

export function* loadProducts({
  ...action
}): Generator<
  CallEffect<any> | PutEffect<AnyAction>,
  void,
  { data: BffGetProductsResponse }
> {
  try {
    const requestParams: BffGetProductsRequest =
      action.payload.data.requestParams;
    // console.log('request params', requestParams)

    const { data } = yield call(apiBffProducts.get, `products`, {
      params: {
        categoryId: requestParams.categoryId,
        limit: requestParams.limit,
        offset: requestParams.offset,
        colors: requestParams.colors?.toString(),
        sizes: requestParams.size?.toString(),
        sort: requestParams.sort,
        searchQuery: requestParams.searchQuery,
        maxPrice: requestParams.maxPrice,
        minPrice: requestParams.minPrice,
      },
    });
    // console.log('response', data)
    yield put(loadProductsSuccess(data.products));
    yield put(loadFilterSuccess(data.filters));
  } catch (err) {
    yield put(loadProductsFailure());
  }
}

export interface BffGetProductsRequest {
  categoryId: string;
  sort?: "lower-price" | "highest-price" | "newest" | "oldest" | "relevance";
  searchQuery?: string;
  limit?: number;
  offset?: number;
  maxPrice?: number;
  minPrice?: number;
  size?: string[];
  colors?: string[];
}

export interface BffGetProductsResponse {
  banner: string;
  filters: Filter;
  products: Product[];
}
