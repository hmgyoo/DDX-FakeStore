import {
  View,
  Text,
  StyleSheet,
  ScrollView, 
  TextInput,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ProductRowAllProducts from '../components/ProductRowAllProducts';
import axios from 'axios'
import ProductList from '../components/ProductList';


const SearchScreen = () => {

  const [form, setForm] = useState({
    searchQuery: '',
  });

  const handleInputChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
      <View style={styles.searchContainer}>
        <TouchableOpacity>
          <MaterialIcons name='search' size={24} style={styles.searchIcon}/>
        </TouchableOpacity>
          <View style={styles.searchWrapper}>
            <TextInput
              style={styles.searchInput}
              value={form.searchQuery}
              onChangeText={(text) => handleInputChange('searchQuery', text)}
              placeholder='What are you looking for?'
            />
          </View>
      </View>
      <View style={{ paddingBottom: 100}}>
        {/* flatlist view */}
        <ProductList searchQuery={form.searchQuery}/>
      </View>
    </SafeAreaView>
    
  )
}

export default SearchScreen

const styles = StyleSheet.create({
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