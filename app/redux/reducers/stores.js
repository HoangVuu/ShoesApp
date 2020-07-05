import {GET_ALL_STORES} from '../actions/type';

let initialState = {
  storesList: [],
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case GET_ALL_STORES:
      state.storesList = payload;
      return {...state};
    default:
      return state;
  }
};
