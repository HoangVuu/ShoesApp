import {combineReducers} from 'redux';
import category from './category';
import products from './products';
import userInfo from './user-info';
import cart from './cart';

export default combineReducers({
  category,
  products,
  userInfo,
  cart,
});
