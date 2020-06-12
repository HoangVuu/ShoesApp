import {FETCH_PRODUCTS_BY_CATEGORY, FETCH_PRODUCT_BY_ID} from '../actions/type';

let initialState = {
  productsList: [],
  productDetail: {},
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case FETCH_PRODUCTS_BY_CATEGORY:
      state.productsList = payload;
      return {...state};
    case FETCH_PRODUCT_BY_ID:
      return {...state, productDetail: payload};
    default:
      return state;
  }
};
