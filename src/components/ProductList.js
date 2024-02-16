import { FlatList, Text, View, StyleSheet, Image, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ProductCardViewAllProducts from './ProductCardViewAllProducts';

const ProductList = ({ searchQuery }) => {

  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);

  // use Effect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setApiData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Ensure searchQuery is always a string before filtering
  const normalizedSearchQuery = typeof searchQuery === 'string' ? searchQuery : '';
  
  // Check if apiData is an array and not empty before filtering
  const filteredProducts = Array.isArray(apiData) && apiData.length > 0
    ? apiData.filter(product =>
        typeof product.title === 'string' &&
        product.title.toLowerCase().includes(normalizedSearchQuery.toLowerCase())
      )
    : [];

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='#353535' />
      </View>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <View style={styles.noResultsContainer}>
        <Text>No results found</Text>
      </View>
    );
  }

  return (
    <View style={{ marginLeft: 10, marginBottom: 10}}>
      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => <ProductCardViewAllProducts product={item}/>}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.flatListContainer}
        numColumns={2}
      />
    </View>
  )
}

export default ProductList

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'center',
    alignItems: 'center',
    margin: 10,
    marginBottom: 10,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  productTitle: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    marginTop: 2,
    fontSize: 14,
    color: 'gray',
  },
  flatListContainer: {
    justifyContent: 'space-between',
    flexDirection: 'column',
    marginBottom: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: 30,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  }
})