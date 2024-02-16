import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './src/navigators/TabNavigator';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import ProductDetailsScreen from './src/screens/ProductDetailsScreen';
import SearchScreen from './src/screens/SearchScreen';

// create stack object
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer style={{ flex: 1}}>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: true, title: 'Login', animation: "slide_from_left" }}/>
        <Stack.Screen name="Sign Up" component={SignupScreen} options={{ title: 'Sign up', animation: "slide_from_left" }}/>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false, title: 'Welcome', animation: "slide_from_left" }}/>
        <Stack.Screen name="Tab" component={TabNavigator} options={{ headerShown: false,title: 'FakeStore', animation: "slide_from_left" }}/>
        <Stack.Screen name="Product Details" component={ProductDetailsScreen} options={{ headerShown: false,title: 'Product details', animation: "slide_from_left" }}/>
        <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: true,title: 'Search', animation: "slide_from_left" }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;