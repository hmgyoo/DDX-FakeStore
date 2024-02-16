import { FlatList, Text, View, StyleSheet, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ProductCardViewAllProducts from './ProductCardViewAllProducts';

const ProductList = ({ searchQuery }) => {

  const [apiData, setApiData] = useState([]);

  // use Effect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setApiData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
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

  return (
    <View style={{ marginLeft: 10, marginBottom: 10}}>
      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => <ProductCardViewAllProducts product={item}/>}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.flatListContainer}
        numColumns={2}
        // horizontal

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
    // flexWrap: 'wrap',
    marginBottom: 10,
  }
})