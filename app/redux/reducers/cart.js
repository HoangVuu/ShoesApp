import {
  ADD_TO_CART,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  REMOVE_TO_CART,
} from '../actions/type';

let initialState = [];

export default (state = initialState, {type, payload}) => {
  // xử lý action
  switch (type) {
    case ADD_TO_CART: {
      const index = state.findIndex((item) => item.product.id === payload.id);
      //1.Nếu chưa có :
      if (index === -1) {
        const cardItem = {
          product: payload,
          quantity: 1,
        };
        state.push(cardItem);
      } else {
        state[index].quantity++;
      }
      //immitable
      return [...state]; // nếu dữ liệu là mảng, trả về mảng coppy của nó, redux mới so sánh được
    }

    case INCREASE_QUANTITY: {
      const index = state.findIndex((item) => item.product.id === payload);
      state[index] = {...state[index], quantity: ++state[index].quantity};
      return [...state];
    }

    case DECREASE_QUANTITY: {
      const index = state.findIndex((item) => item.product.id === payload);
      state[index] = {...state[index], quantity: --state[index].quantity};
      return [...state];
    }

    case REMOVE_TO_CART: {
      //tim vị trí sp muốn xoa.
      const index = state.findIndex((item) => item.product.id === payload);
      state.splice(index, 1);
      return [...state];
    }

    default:
      return state;
  }
};
