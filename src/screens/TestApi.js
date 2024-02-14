import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

export default function TestApi() {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setApiData(response.data);
        setLoading(false);
      } catch(error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <View>
      {loading ? (
        <Text>Loading...</Text>
      ) : apiData ? (
        <View>
          {apiData.map((product) => (
            <Text key={product.id}>{product.title}</Text>
          ))}
        </View>
      ) : (
        <Text>No data available.</Text>
      )}
    </View>
  );
};