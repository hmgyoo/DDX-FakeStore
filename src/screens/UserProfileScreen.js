import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfileScreen = ({ route }) => {
  const { user } = route.params || {};
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/users?username=${user.username}`);
        const userData = response.data[0]; // Assuming the API returns an array with a single user
        setUserData(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [user.username]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>User Profile</Text>
      {userData && (
        <View style={styles.userInfo}>
          <Text style={styles.infoText}>ID: {userData.id}</Text>
          <Text style={styles.infoText}>Email: {userData.email}</Text>
          <Text style={styles.infoText}>Username: {userData.username}</Text>
          <Text style={styles.infoText}>Name: {userData.name.firstname} {userData.name.lastname}</Text>
          <Text style={styles.infoText}>Address: {userData.address.street}, {userData.address.city}, {userData.address.zipcode}</Text>
          <Text style={styles.infoText}>Phone: {userData.phone}</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default UserProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff'
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#3C6E71'
  },
  userInfo: {
    width: '100%',
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
    alignSelf: 'center'
  },
});