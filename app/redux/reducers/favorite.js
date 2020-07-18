import {ADD_TO_FAVORITE, REMOVE_TO_FAVORITE} from '../actions/type';

let initialState = [];

export default (state = initialState, {type, payload}) => {
  // xử lý action
  switch (type) {
    case ADD_TO_FAVORITE: {
      const index = state.findIndex((item) => item.id === payload.id);
      if (index === -1) {
        state.push(payload);
      }
      return [...state];
    }

    case REMOVE_TO_FAVORITE: {
      const index = state.findIndex((item) => item.id === payload);
      state.splice(index, 1);
      return [...state];
    }

    default:
      return state;
  }
};
