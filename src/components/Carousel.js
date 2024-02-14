import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { SliderBox } from "react-native-image-slider-box";

const Carousel = () => {

  // const for the images
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products?limit=5');
        const imageURIs = response.data.map(item => item.image);
        setImages(imageURIs);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <View style={styles.carouselContainer}>
      <SliderBox
        images={images}
        dotColor = '#284B63'
        inactiveColor = '#D9D9D9'
        ImageComponentStyle = {{ borderRadius: 20, width: '90%'}}
        autoplay
        circleLoop
      />
    </View>
  )
}

export default Carousel

const styles = StyleSheet.create({
  carouselContainer: {
    flex: 1,
    alignItems: 'center',
  }
})