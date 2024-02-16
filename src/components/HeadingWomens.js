import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React from 'react';

const HeadingWomens = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Women's Clothing</Text>
        <TouchableOpacity>
          <MaterialIcons name='grid-view' size={24} color={'#3C6E71'}/>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default HeadingWomens

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 8,
    marginHorizontal: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerTitle: {
    fontSize: 21,
    color: '#000',
    fontWeight: '900',
  }
})