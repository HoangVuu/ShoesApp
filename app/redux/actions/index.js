import axios from 'axios';
import {AsyncStorage} from 'react-native'; // giống với local storage, chỉ lưu được string, chuỗi json
import {
  FETCH_CATEGORY,
  FETCH_PRODUCTS_BY_CATEGORY,
  FETCH_PRODUCT_BY_ID,
  FETCH_ALL_PRODUCTS,
  SET_USER_INFO,
  GET_PROFILE,
  GET_ALL_STORES,
  FETCH_PRODUCT_FAVORITES,
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

export const getFavorites = () => {
  return (dispatch) => {
    dispatch(createAction('GET_FROM_FAVORITE'));
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
    axios({
      method: 'GET',
      url: `http://svcy3.myclass.vn/api/Users/like?productId=${id}`,
      headers: {
        Authorization: `Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJ2dTEyMyIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlZJRVdfUFJPRklMRSIsIm5iZiI6MTU5MzkzNTkxOSwiZXhwIjoxNTkzOTM5NTE5fQ.YXlv3pqXcZIvS45jVb1ZSJuZynP7c0Fn0REwSUj2_rE`,
      },
    })
      .then((res) => {
        console.log(res.data.content);
        console.log('auth', auth);
      })
      .catch((err) => console.log({...err}));
  };
};

export const dislikeProduct = (id, auth) => {
  return (dispatch) => {
    axios({
      method: 'GET',
      url: `http://svcy3.myclass.vn/api/Users/unlike?productId=${id}`,
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    })
      .then((res) => console.log(res.data.content))
      .catch((err) => console.log({...err}));
  };
};

export const getAllFavorites = (auth) => {
  return (dispatch) => {
    axios({
      method: 'GET',
      url: 'http://svcy3.myclass.vn/api/Users/getproductfavorite',
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    })
      .then((res) => {
        dispatch(createAction(FETCH_PRODUCT_FAVORITES, res.data.content));
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
  return () => {
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
  return () => {
    axios({
      method: 'POST',
      url: 'http://svcy3.myclass.vn/api/Users/updateProfile',
      data: account,
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    })
      .then((res) => {
        getProfile(auth);
        console.log('res.data.content', res.data);
      })
      .catch((err) => console.log('err', {...err}));
  };
};

export const loginWithFacebook = (facebookToken) => {
  return (dispacth) => {
    axios({
      method: 'POST',
      url: 'http://svcy3.myclass.vn/api/Users/facebooklogin',
      data: facebookToken,
    })
      .then((res) => {
        AsyncStorage.setItem('userInfo', JSON.stringify(res.data));
        AsyncStorage.setItem('accessToken', res.data.accessToken);
        dispacth(createAction(SET_USER_INFO, JSON.stringify(res.data)));
      })
      .catch((err) => console.log('err', {...err}));
  };
};

export const updateAvatar = () => {
  return () => {
    axios({
      method: 'POST',
      url: 'http://svcy3.myclass.vn/api/Users/uploadavatar',
    })
      .then((res) => {
        console.log('upload anh');
      })
      .catch((err) => console.log('err anh', {...err}));
  };
};

export const getAllStore = () => {
  return (dispacth) => {
    axios({
      method: 'GET',
      url: 'http://svcy3.myclass.vn/api/Product/getAllStore',
    })
      .then((res) => {
        dispacth(createAction(GET_ALL_STORES, res.data.content));
      })
      .catch((err) => console.log({...err}));
  };
};

export const changePassword = (newPass, auth) => {
  return () => {
    axios({
      method: 'POST',
      url: 'http://svcy3.myclass.vn/api/Users/changePassword',
      data: newPass,
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    })
      .then((res) => {
        console.log('res', newPass);
        console.log('change password', res.data);
      })
      .catch((err) => console.log({...err}));
  };
};
