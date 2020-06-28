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

export const getCart = () => {
  return (dispatch) => {
    dispatch(createAction('GET_FROM_CART'));
  };
};

// create async action to fetch category from backend and save in redux store

// const actFetchCategory = () => dispatch => {
// }

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
        Authorization: `Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJ2dTEyMyIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlZJRVdfUFJPRklMRSIsIm5iZiI6MTU5MzM2MDAyMywiZXhwIjoxNTkzMzYzNjIzfQ.gZqmOir1il7xYQ3FpMqK8LbfV4QC7PWAJfCoaB-Pcp8`,
      },
    })
      .then((res) => {
        console.log('da goi');
        dispatch(createAction(GET_PROFILE, res.data.content));
      })
      .catch((err) => {
        console.log('loi');
        console.log({...err});
      });
  };
};
