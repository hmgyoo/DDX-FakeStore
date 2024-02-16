import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'

const CartScreen = ({ route }) => {
  const { user } = route.params || {};

  // State variables to store user and cart data
  const [userData, setUserData] = useState(null);
  const [cartData, setCartData] = useState(null);

  // useEffect to fetch user data based on the username
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await fetch(`https://fakestoreapi.com/users?username=${user.username}`);
        const userData = await userResponse.json();
        if (userData.length > 0) {
          setUserData(userData[0]);
        } else {
          console.error('User not found');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [user.username]);

  // useEffect to fetch cart data based on userId
  useEffect(() => {
    if (userData) {
      const fetchCartData = async () => {
        try {
          const cartResponse = await fetch(`https://fakestoreapi.com/carts/user/${userData.id}`);
          const cartData = await cartResponse.json();
          setCartData(cartData);
        } catch (error) {
          console.error('Error fetching cart data:', error);
        }
      };

      fetchCartData();
    }
  }, [userData]);

  // Render UI based on fetched data
  return (
    <View>
      <Text>CartScreen</Text>
      {userData && (
        <View>
          <Text>User Data:</Text>
          <Text>Email: {userData.email}</Text>
          <Text>Name: {userData.name.firstname} {userData.name.lastname}</Text>
          {/* Display other user information as needed */}
        </View>
      )}
      {cartData && (
        <View>
          <Text>Cart Data:</Text>
          {/* Display cart information as needed */}
        </View>
      )}
    </View>
  );
};

export default CartScreen

const styles = StyleSheet.create({})