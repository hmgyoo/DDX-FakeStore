import { StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import HomeScreen from '../screens/HomeScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import CartScreen from '../screens/CartScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { BlurView } from '@react-native-community/blur';


const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarBackground:() => (
          <BlurView overlayColor='' blurAmount={15} style={styles.blurViewStyles} />
        )
      }}>
      <Tab.Screen name='Home' component={HomeScreen} options={{
        tabBarIcon: ({ focused, color, size }) => (
          <MaterialIcons name="home" size={30} color={
            focused ? '#284B63' : '#D9D9D9'
          } />
        )
      }}></Tab.Screen>
      <Tab.Screen name='Favorites' component={FavoritesScreen} options={{
        tabBarIcon: ({ focused, color, size }) => (
          <MaterialIcons name="favorite" size={30} color={
            focused ? '#284B63' : '#D9D9D9'
          } />
        )
      }}></Tab.Screen>
      <Tab.Screen name='Cart' component={CartScreen} options={{
        tabBarIcon: ({ focused, color, size }) => (
          <MaterialIcons name="shopping-cart" size={30} color={
            focused ? '#284B63' : '#D9D9D9'
          } />
        )
      }}></Tab.Screen>
      <Tab.Screen name='History' component={OrderHistoryScreen} options={{
        tabBarIcon: ({ focused, color, size }) => (
          <MaterialIcons name="history" size={30} color={
            focused ? '#284B63' : '#D9D9D9'
          } />
        )
      }}></Tab.Screen>
      <Tab.Screen name='Profile' component={UserProfileScreen} options={{
        tabBarIcon: ({ focused, color, size }) => (
          <MaterialIcons name="person-pin" size={30} color={
            focused ? '#284B63' : '#D9D9D9'
          } />
        )
      }}></Tab.Screen>
    </Tab.Navigator>
  );
};

export default TabNavigator

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 80,
    position: 'absolute',
    backgroundColor: '#fff',
    borderTopWidth: 0,
    elevation: 0,
    borderTopColor: '#D9D9D9',
  },
  blurViewStyles: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 5,
  },
})