import { FlatList, Text, View, StyleSheet, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ProductCardView from './ProductCardView';

const ProductRow = () => {

  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');

        const sortedProducts = response.data.sort((a, b) => b.rating.rate - a.rating.rate);

        const topRatedProducts = sortedProducts.slice(0, 7);

        setApiData(topRatedProducts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // const renderItem = ({ item }) => (
  //   <View style={styles.itemContainer}>
  //     <Image style={styles.productImage} source={{ uri: item.image }} />
  //     <Text style={styles.productTitle}>{item.title}</Text>
  //     <Text style={styles.productPrice}>{`$${item.price}`}</Text>
  //     {/* Add additional information as needed */}
  //   </View>
  // );

  return (
    <View style={{ marginLeft: 10, marginBottom: 10}}>
      <FlatList
        data={apiData}
        renderItem={({ item }) => <ProductCardView product={item}/>}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{columnGap: 12}}
        // numColumns={2}
        horizontal
      />
    </View>
  )
}

export default ProductRow

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    margin: 10,
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
})