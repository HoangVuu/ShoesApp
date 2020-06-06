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

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Splash from 'react-native-splash-screen';
import AppContainer from './app/navigator';

const App = () => {
  useEffect(() => {
    Splash.hide();
  }, []);
  return <AppContainer />;
};

export default App;
