import React, {useEffect} from 'react';
import {AsyncStorage} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import SignUp from '../screens/SignUp';
import ProductDetail from '../screens/ProductDetail';
import Stores from '../screens/Stores';
import Cart from '../screens/Cart';
import Profile from '../screens/Profile';
import Home from '../screens/Home';
import Favorites from '../screens/Favorites';
import Category from '../screens/Category';
import Icon from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';
import {createAction} from '../redux/actions';
import {SET_USER_INFO} from '../redux/actions/type';
import ProfileEdit from '../screens/ProfileEdit';
import ChangePassword from '../screens/ChangePassword';

const Tabs = createBottomTabNavigator();
const Stack = createStackNavigator();
//create Bottom Tab component

const AppContainer = () => {
  const dispatch = useDispatch(); // hỗ trợ dispatch ko cần connect

  useEffect(() => {
    //1. Đem lưu trên store
    AsyncStorage.getItem('userInfo').then((val) => {
      console.log(val);
      dispatch(createAction(SET_USER_INFO, val));
      //2. Lấy userInfo xuống store và tiến hành ẩn hiện các stack sign in
    });
  }, [dispatch]);

  const BottomTab = () => {
    return (
      <Tabs.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          showLabel: false,
          activeTintColor: '#F93C66',
          inactiveTintColor: '#333333',
          keyboardHidesTabBar: true,
        }}>
        <Tabs.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({color}) => (
              <Icon name="home" size={25} color={color} />
            ),
            // topTabs: {hideShadow: true, backgroundColor: 'black'},
          }}
        />
        <Tabs.Screen
          name="Favorites"
          component={Favorites}
          options={{
            tabBarIcon: ({color}) => (
              <Icon name="hearto" size={25} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="Cart"
          component={Cart}
          options={{
            tabBarIcon: ({color}) => (
              <Icon name="shoppingcart" size={25} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="Store"
          component={Stores}
          options={{
            tabBarIcon: ({color}) => (
              <Icon name="enviromento" size={25} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({color}) => (
              <Icon name="user" size={25} color={color} />
            ),
          }}
        />
      </Tabs.Navigator>
    );
  };
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="index" component={BottomTab} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="ProfileEdit" component={ProfileEdit} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppContainer;
