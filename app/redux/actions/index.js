import axios from 'axios';
import {
  FETCH_CATEGORY,
  FETCH_PRODUCTS_BY_CATEGORY,
  FETCH_PRODUCT_BY_ID,
  FETCH_ALL_PRODUCTS,
  LIKE_SHOES,
  DISLIKE_SHOES,
  GET_PROFILE,
} from './type';

export const createAction = (type, payload) => ({
  type,
  payload,
});

// create async action to fetch category from backend and save in redux store

// const actFetchCategory = () => dispatch => {
// }

export const getCart = () => {
  return (dispatch) => {
    dispatch(createAction('GET_FROM_CART'));
  };
};

export const actFetchCategory = () => {
  //async action
  return (dispatch) => {
    axios({
      method: 'GET',
      url: 'http://svcy3.myclass.vn/api/Product/getAllCategory',
    })
      .then((res) => {
        dispatch(createAction(FETCH_CATEGORY, res.data.content));
      })
      .catch((err) => console.log({...err}));
  };
};

export const actFetchAll = () => {
  //async action
  return (dispatch) => {
    axios({
      method: 'GET',
      url: `http://svcy3.myclass.vn/api/Product`,
    })
      .then((res) => {
        dispatch(createAction(FETCH_ALL_PRODUCTS, res.data.content));
      })
      .catch((err) => console.log({...err}));
  };
};

export const actFetchProducts = (id) => {
  //async action
  return (dispatch) => {
    axios({
      method: 'GET',
      url: `http://svcy3.myclass.vn/api/Product/getProductByCategory?categoryId=${id}`,
    })
      .then((res) => {
        dispatch(createAction(FETCH_PRODUCTS_BY_CATEGORY, res.data.content));
      })
      .catch((err) => console.log({...err}));
  };
};

export const actFetchDetail = (id) => {
  //async action
  return (dispatch) => {
    axios({
      method: 'GET',
      url: `http://svcy3.myclass.vn/api/Product/getbyid?id=${id}`,
    })
      .then((res) => {
        dispatch(createAction(FETCH_PRODUCT_BY_ID, res.data.content));
      })
      .catch((err) => console.log({...err}));
  };
};

export const likeProduct = (id, auth) => {
  //async action
  return (dispatch) => {
    axios
      .get(`http://svcy3.myclass.vn/api/Users/like?productId=${id}`, {
        headers: {
          Authorization: `Bearer ${auth}`,
        },
      })
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        console.log({...error});
      });
  };
};

export const dislikeProduct = (id, auth) => {
  //async action
  return (dispatch) => {
    axios({
      method: 'GET',
      url: `http://svcy3.myclass.vn/api/Users/unlike?productId=${id}`,
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    })
      .then((res) => {
        // dispatch(createAction(DISLIKE_SHOES, res.data.content));
        console.log(res.data.content);
      })
      .catch((err) => console.log({...err}));
  };
};

export const getProfile = (auth) => {
  return (dispatch) => {
    axios({
      method: 'POST',
      url: 'http://svcy3.myclass.vn/api/Users/getProfile',
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    })
      .then((res) => {
        dispatch(createAction(GET_PROFILE, res.data.content));
      })
      .catch((err) => {
        console.log({...err});
      });
  };
};

export const signUp = (account) => {
  return (dispatch) => {
    axios({
      method: 'POST',
      url: 'http://svcy3.myclass.vn/api/Users/signup',
      data: account,
    })
      .then((res) => console.log('res', res))
      .catch((err) => console.log('err', {...err}));
  };
};

export const updateProfile = (account, auth) => {
  return (dispatch) => {
    axios({
      method: 'POST',
      url: 'http://svcy3.myclass.vn/api/Users/updateProfile',
      data: account,
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    })
      .then((res) => getProfile(auth))
      .catch((err) => console.log('err', {...err}));
  };
};
