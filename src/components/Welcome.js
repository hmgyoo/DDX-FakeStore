import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView, TextInput } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const Welcome = () => {

  const navigation = useNavigation();

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.welcomeText}>FakeStore API</Text>
        {/* <Text style={styles.subText}>Find your item in this fake store!</Text> */}
      </View>
      <View style={styles.searchContainer}>
        <TouchableOpacity>
          <MaterialIcons name='search' size={24} style={styles.searchIcon}/>
        </TouchableOpacity>
          <View style={styles.searchWrapper}>
            <TextInput
              style={styles.searchInput}
              value=''
              onPressIn={() => navigation.navigate('Search')}
              placeholder='What are you looking for?'
            />
          </View>
      </View>
    </View>
  )
}

export default Welcome

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  welcomeText: {
    fontWeight: 'bold',
    fontSize: 45,
    color: '#3C6E71',
    paddingHorizontal: 5,
    alignSelf: 'center',
  },
  subText: {
    fontWeight: 'bold',
    fontSize: 32,
    color: '#3C6E71',
    paddingHorizontal: 5,

  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#D9D9D9',
    borderRadius: 20,
    marginVertical: 20,
    height: 50,
    marginHorizontal: 12,
  },
  searchIcon: {
    marginHorizontal: 10,
    color: 'gray',
    marginTop:13,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: '#D9D9D9',
    marginRight: 8,
    borderRadius: 8,
  },
  searchInput: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 8,
  }
})