import {
  View,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from './src/Navigator';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import RegisterScreen from './src/RegisterScreen';
import AllProduct from './src/products/AllProduct';
import HomeScreen from './src/HomeScreen';
import UserScreen from './src/UserScreen';
import LoginScreen from './src/LoginScreen';
import {Icon} from 'react-native-elements';
import COLORS from './Constants';
import DetailsScreen from './src/products/DetailsScreen';
import CartScreen from './src/CartScreen';
import OrderScreen from './src/order/OrderScreen';
import SetOrder from './src/order/SetOrder';
import Payment from './src/PaymentScreen'

const Stack = createStackNavigator();
const Tap = createBottomTabNavigator();

const tap1 = {
  tabBarLabel: 'Home',
  tabBarIcon: ({focused}) => (
    <Image
      style={{
        height: 28,
        width: 28,
      }}
      resizeMode="contain"
      source={
        focused
          ? require('./src/img/icon-home.png')
          : require('./src/img/icon-home.png')
      }
    />
  ),
};

const tap3 = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({focused}) => (
    <Image
      style={{
        height: 28,
        width: 28,
      }}
      resizeMode="contain"
      source={
        focused
          ? require('./src/img/icon-user.png')
          : require('./src/img/icon-user.png')
      }
    />
  ),
};
const tap2 = {
  tabBarLabel: 'Product',
  tabBarIcon: ({focused}) => (
    <Image
      style={{
        height: 28,
        width: 28,
      }}
      resizeMode="contain"
      source={
        focused
          ? require('./src/img/icon-cart.jpg')
          : require('./src/img/icon-cart.jpg')
      }
    />
  ),
};

const TapScreens = props => {
  return (
    <Tap.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={HomeScreen} options={tap1} />
      <Stack.Screen name="Product" component={AllProduct} options={tap2} />

      <Stack.Screen name="User" component={UserScreen} options={tap3} />
    </Tap.Navigator>
  );
};

const RootStacks = props => {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Detail" component={DetailsScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="Order" component={OrderScreen} />
      <Stack.Screen name="SetOrder" component={SetOrder} />
      <Stack.Screen name="Payment" component={Payment} />


      <Stack.Screen
        name="Main"
        component={TapScreens}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <View style={{flex: 1}}>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView
          style={{paddingHorizontal: 20, backgroundColor: COLORS.white}}
        />
        <RootStacks />
      </View>
    </NavigationContainer>
  );
}
