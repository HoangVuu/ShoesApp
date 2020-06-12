/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import Splash from 'react-native-splash-screen';
import AppContainer from './app/navigator';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducer from './app/redux/reducers';
import thunk from 'redux-thunk';

const store = createStore(reducer, applyMiddleware(thunk));

const App = () => {
  useEffect(() => {
    Splash.hide();
  }, []);
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
};

export default App;
