import {SET_USER_INFO, GET_PROFILE} from '../actions/type';

let initialState = {
  data: null,
  isLogin: null,
  profile: null,
};

const reducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case SET_USER_INFO: {
      if (payload) {
        state.data = JSON.parse(payload);
        state.isLogin = true;
      } else {
        state.isLogin = false;
      }
      return {...state};
    }

    case GET_PROFILE: {
      state.profile = payload;
      return {...state};
    }
    default:
      return state;
  }
};

export default reducer;
