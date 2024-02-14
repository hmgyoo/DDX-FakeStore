import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const ProductCardView = ({product}) => {

  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Product Details')}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: product.image}}
            style={styles.image}
          />
        </View>
        <View style={styles.productDetails}>
          <Text style={styles.title} numberOfLines={1}>{product.title}</Text>
          <Text style={styles.rating}>{`★ ${product.rating.rate}`}</Text>
          <Text style={styles.price}>{`$${product.price}`}</Text>
        </View>
        <TouchableOpacity style={styles.addbtn}>
          <MaterialIcons name='add-circle' size={30} color={'#3C6E71'}/>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )
}

export default ProductCardView

const styles = StyleSheet.create({
  container: {
    width: 182,
    height: 250,
    marginEnd: 22,
    borderRadius: 15,
    backgroundColor: '#fff',
    borderColor: '#D9D9D9',
    borderWidth: 2,
  },
  imageContainer: {
    flex: 1,
    width: 170,
    marginLeft: 5,
    marginTop: 5,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    aspectRatio: 1,
    resizeMode: 'cover',
  },
  productDetails: {
    padding: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 17,
    marginBottom: 2,
    color: '#000',
  },
  rating: {
    // fontWeight: '',
    fontSize: 12,
    marginBottom: 2,
    color: '#353535',
  },
  price: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#000',
  },
  addbtn: {
    position: 'absolute',
    bottom: 8,
    right: 8,
  }
})