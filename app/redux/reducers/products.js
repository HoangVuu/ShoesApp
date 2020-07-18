import {
  FETCH_PRODUCTS_BY_CATEGORY,
  FETCH_PRODUCT_BY_ID,
  FETCH_ALL_PRODUCTS,
  FETCH_PRODUCT_FAVORITES,
} from '../actions/type';

let initialState = {
  allProducts: [],
  productsList: [],
  productDetail: {},
  likedProduct: [],
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case FETCH_PRODUCTS_BY_CATEGORY:
      state.productsList = payload;
      return {...state};

    case FETCH_PRODUCT_BY_ID: {
      return {...state, productDetail: payload};
    }

    case FETCH_ALL_PRODUCTS:
      state.allProducts = payload;
      return {...state};

    case FETCH_PRODUCT_FAVORITES:
      return {...state, likedProduct: payload};

    default:
      return state;
  }
};
