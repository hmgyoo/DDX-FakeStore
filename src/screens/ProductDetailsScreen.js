import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IonIcons from 'react-native-vector-icons/Ionicons';
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

const ProductDetailsScreen = ({ route }) => {

  const navigation = useNavigation();
  const { product } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.upperRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name='arrow-circle-left' color='#3C6E71' size={35}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <IonIcons name='heart-circle-outline' color='#3C6E71' size={35}/>
          </TouchableOpacity>
      </View>
      <Image
        source={{uri: product.image}}
        style={styles.image}
      />

      <View style={styles.details}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{product.title}</Text>
          <View style={styles.priceWrapper}>
            <Text style={styles.price}>{`$ ${product.price}`}</Text>
          </View>
        </View>

        <View style={styles.ratingRow}>
          <View style={styles.rating}>
            {/* <Text style={styles.rating}>{`★ ${product.rating.rate}`}</Text> */}
            <IonIcons 
              name='star'
              size={24}
              color={'#fff'}
            />
            <Text style={styles.ratingText}>{`  (${product.rating.rate})`}</Text>
          </View>
          <View style={styles.rating}>
            {/* <Text style={styles.rating}>{`★ ${product.rating.rate}`}</Text> */}
            <MaterialIcons 
              name='numbers'
              size={24}
              color={'#fff'}
            />
            <Text style={styles.ratingText}>{`  (${product.rating.count})`}</Text>
          </View>
        </View>

        <View style={styles.descriptionWrapper}>
          <Text style={styles.description}>Description</Text>
          <Text style={styles.descText}>{product.description}</Text>
        </View>
      </View>
    </View>
  )
}

export default ProductDetailsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3C6E71',
  },
  upperRow: {
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: 8,
    width: '91%',
    zIndex: 999,
  },
  image: {
    aspectRatio: 1,
    resizeMode: 'cover',
    // objectFit: 'contain'
  },
  details: {
    marginTop: -10,
    backgroundColor: '#3C6E71',
    width: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  titleRow: {
    marginHorizontal: 20,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    top: 20,
  },
  ratingRow: {
    marginHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    top: 20,
  },
  rating: {
    top: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: 10,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    marginRight: '7%'

  },
  ratingText: {
    color: '#D9D9D9',
    fontWeight: '600'
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    width: '60%',
    color: '#fff'
  },
  priceWrapper: {
    backgroundColor: '#D9D9D9',
    borderRadius: 20,
    marginRight: '8%'

  },
  price: {
    paddingHorizontal: 15,
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  descriptionWrapper: {
    marginTop: 40,
    marginHorizontal: 20
  },
  description: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold'
  },
  descText: {
    fontSize: 14,
    textAlign: 'justify',
    marginBottom: 8,
    color: '#fff',
    marginTop: 10,
  }
})