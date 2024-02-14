import axios from 'axios';
import React, { useEffect, useState } from 'react';
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
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Welcome from '../components/Welcome';
import Carousel from '../components/Carousel';
import Heading from '../components/Heading';
import ProductRow from '../components/ProductRow';

export default function HomeScreen() {

  // use states
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fullData, setFullData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // route from login to save user info
  // const { user } = route.params || {};

  // handle Search
  const handleSearch = (query) => {
    setSearchQuery(query);
  }


  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setApiData(response.data);
        setLoading(false);
        console.log(response.data);
      } catch(error) {
        setError(error);
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // is loading
  if (loading) {
    return(
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff'}}>
        <ActivityIndicator size={'large'} color='#353535'></ActivityIndicator>
      </View>
    );
  }

  // if there is error
  if (error) {
    return(
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',  backgroundColor: '#fff'}}>
        <Text>Error in fetching data... Please check your internet connection.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, paddingVertical: 15, paddingHorizontal: 8, backgroundColor: '#fff'}}>

      {/* Appbar */}
      <View style={styles.appBar}>
        <MaterialIcons name='location-on' color={'#000'} size={24}/>
        <Text style={styles.text}>Manila, Philippines</Text>
        <MaterialIcons name='history' color={'#000'} size={24}/>
      </View>

      {/* Welcome component */}
      <ScrollView style={{padding: 2}}>
        <Welcome/>
        <Carousel/>
        <Heading/>
        <ProductRow/>

      </ScrollView>
      
      {/* Searchbar */}
      {/* <TextInput 
        placeholder='Search'
        clearButtonMode='always' //ios lang pala haha
        autoCapitalize='none'
        autoCorrect={false}
        value={searchQuery}
        onChangeText={(query) => handleSearch(query)}
        style={styles.searchBar}
      /> */}
      {/* <FlatList
        data={apiData}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <View style={{ borderColor: '#D9D9D9', borderRadius: 10, borderWidth: 2, marginVertical: 8, padding: 10}}>
            <Image 
              style={styles.productContainer}
              source={{ uri: item.image }} />
            <View>
              <Text style={styles.productTitle}>{item.title}</Text>
              <Text style={styles.productDescription}>{item.description}</Text>
              <Text style={styles.productPrice}>{`₱${item.price}`}</Text>
            </View>
          </View>
        )}
      /> */}
        
    </SafeAreaView>
    // bottom navigator
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  welcomeUserText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    paddingTop: 8,
  },
  text: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#000',
    paddingVertical: 8,
  },
  searchBar: {
    height: 44,
    backgroundColor: '#D9D9D9',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
    marginTop: 15,
  },
  productContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    margin: 10,
    borderColor: '#D9D9D9',
  },
  productTitle: {
    fontSize: 21,
    marginLeft: 10,
    fontWeight: '700',
    marginBottom: 15,
    color: '#000'
  },
  productDescription: {
    fontSize: 14,
    marginLeft: 10,
    color: 'grey',
    marginBottom: 12,
  },
  productPrice: {
    fontSize: 17,
    marginLeft: 10,
    color: '#000',
    marginBottom: 15,
    fontWeight: 'bold'
  },
  appBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});