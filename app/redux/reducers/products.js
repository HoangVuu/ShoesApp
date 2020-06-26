import {
  FETCH_PRODUCTS_BY_CATEGORY,
  FETCH_PRODUCT_BY_ID,
  FETCH_ALL_PRODUCTS,
} from '../actions/type';

let initialState = {
  allProducts: [],
  productsList: [],
  productDetail: {},
  likedProduct:[],
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case FETCH_PRODUCTS_BY_CATEGORY:
      state.productsList = payload;
      return {...state};

    case FETCH_PRODUCT_BY_ID:{
      console.log("run here",payload);
      return {...state, productDetail: payload};
    }

    case FETCH_ALL_PRODUCTS:
      state.allProducts = payload;
      return {...state};

    default:
      return state;
  }
};
