import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'

const SearchScreen = () => {
  return (
    <SafeAreaView>
      <View style={styles.searchContainer}>
        <TouchableOpacity>
          <MaterialIcons name='search' size={24} style={styles.searchIcon}/>
        </TouchableOpacity>
          <View style={styles.searchWrapper}>
            <TextInput
              style={styles.searchInput}
              value=''
              onPressIn={() => navigation.navigate('Search')}
              placeholder='What are you looking for?'
            />
          </View>
      </View>
    </SafeAreaView>
  )
}

export default SearchScreen

const styles = StyleSheet.create({})