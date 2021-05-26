import { combineReducers } from "redux";

import products from "./products";
import product from "./product";
import categories from "./categories";
import authentication from "./authentication";
import profile from "./profile";
import localities from "./localities";
import address from "./address";

export default combineReducers({
  products,
  product,
  categories,
  authentication,
  profile,
  localities,
  address,
});
