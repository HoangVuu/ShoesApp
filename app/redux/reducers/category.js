import {FETCH_CATEGORY} from '../actions/type';

let initialState = {
  categoryList: [],
  // selectedCategory: null
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case FETCH_CATEGORY:
      state.categoryList = payload;
      return {...state};
    default:
      return state;
  }
};
