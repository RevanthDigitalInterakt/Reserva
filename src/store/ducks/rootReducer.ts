import { combineReducers } from "redux";

import filter from "./filter";
import products from "./products";
import product from "./product";
import categories from "./categories";
import authentication from "./authentication";
import profile from "./profile";
import localities from "./localities";
import address from "./address";
import wishlist from "./wishlist";

export default combineReducers({
  products,
  product,
  wishlist,
  categories,
  authentication,
  profile,
  localities,
  address,
  filter,
});
