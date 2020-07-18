import {combineReducers} from 'redux';
import category from './category';
import products from './products';
import userInfo from './user-info';
import cart from './cart';
import stores from './stores';
import favorite from './favorite';

export default combineReducers({
  category,
  products,
  userInfo,
  cart,
  stores,
  favorite,
});
