import {combineReducers} from 'redux';
import category from './category';
import products from './products';

export default combineReducers({
  category,
  products,
});
