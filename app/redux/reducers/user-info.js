import {SET_USER_INFO, GET_PROFILE} from '../actions/type';

let initialState = {
  data: null,
  isLogin: false,
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
        state.profile = null;
        state.data = null;
      }
      return {...state};
    }

    case GET_PROFILE: {
      return {...state, profile: payload};
    }
    default:
      return state;
  }
};

export default reducer;
