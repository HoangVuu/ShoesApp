import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import SignIn from '../screens/Signin';
import ProductDetail from '../screens/ProductDetail';
import Stores from '../screens/Stores';
import Cart from '../screens/Cart';
import Profile from '../screens/Profile';
import Home from '../screens/Home';
import Favorites from '../screens/Favorites';
import Category from '../screens/Category';
import Icon from 'react-native-vector-icons/AntDesign';

const Tabs = createBottomTabNavigator();
const Stack = createStackNavigator();
//create Bottom Tab component

const BottomTab = () => {
  return (
    <Tabs.Navigator
    initialRouteName="Home"
      tabBarOptions={{
        showLabel: false,
        activeTintColor: 'red',
        inactiveTintColor: '#333333',
      }}>
      <Tabs.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color}) => <Icon name="home" size={25} color={color} />,
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
          tabBarIcon: ({color}) => <Icon name="user" size={25} color={color} />,
        }}
      />
    </Tabs.Navigator>
  );
};

const AppContainer = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="index" component={BottomTab} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />
        <Stack.Screen name="Category" component={Category} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppContainer;
