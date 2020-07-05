import {combineReducers} from 'redux';
import category from './category';
import products from './products';
import userInfo from './user-info';
import cart from './cart';
import stores from './stores';

export default combineReducers({
  category,
  products,
  userInfo,
  cart,
  stores,
});
