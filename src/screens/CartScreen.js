import { StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const CartItemCard = ({ cartItem, productsData, onPressRemove, onQuantityChange }) => {
  const calculateTotalPrice = () => {
    return cartItem.products.reduce((total, product) => {
      const matchedProduct = productsData.find((p) => p.id === product.productId);
      return total + matchedProduct.price * product.quantity;
    }, 0);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.cardText}>Date: {cartItem.date}</Text>
      <Text style={styles.cardText}>Products:</Text>
      {cartItem.products.map((product) => {
        const matchedProduct = productsData.find((p) => p.id === product.productId);
        return (
          <View key={product.productId} style={styles.productContainer}>
            <Image source={{ uri: matchedProduct.image }} style={styles.productImage} />
            <View style={styles.productTextContainer}>
              <Text style={styles.productText}>Product ID: {product.productId}</Text>
              <Text style={styles.productText}>Quantity: {product.quantity}</Text>
              <Text style={styles.productText}>Price: ${matchedProduct.price.toFixed(2)}</Text>
            </View>

            {/* Quantity chnage */}
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={() => onQuantityChange(product.productId, product.quantity - 1)}>
                <MaterialIcons name="remove" size={24} color="#3C6E71" />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{product.quantity}</Text>
              <TouchableOpacity onPress={() => onQuantityChange(product.productId, product.quantity + 1)}>
                <MaterialIcons name="add" size={24} color="#3C6E71" />
              </TouchableOpacity>
            </View>

            {/* Remove product */}
            <TouchableOpacity onPress={() => onPressRemove(product.productId)} style={styles.removeButton}>
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        );
      })}
      <Text style={styles.totalText}>Total: ${calculateTotalPrice().toFixed(2)}</Text>
    </View>
  );
};


const CartScreen = ({ route }) => {
  const { user } = route.params || {};

  // State variables to store user and cart data
  const [userData, setUserData] = useState(null);
  const [cartData, setCartData] = useState(null);
  const [productsData, setProductsData] = useState(null);

  // useEffect to fetch user data based on the username
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get(`https://fakestoreapi.com/users?username=${user.username}`);
        const userData = userResponse.data;
        if (userData.length > 0) {
          setUserData(userData[0]);
        } else {
          console.error('User not found');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchCartData = async () => {
      try {
        const cartResponse = await axios.get(`https://fakestoreapi.com/carts/user/${userData.id}`);
        const cartData = cartResponse.data;
        setCartData(cartData);
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };

    const fetchProductsData = async () => {
      try {
        const productsResponse = await axios.get('https://fakestoreapi.com/products');
        const productsData = productsResponse.data;
        setProductsData(productsData);
      } catch (error) {
        console.error('Error fetching products data:', error);
      }
    };

    if (user) {
      fetchUserData();
    }

    if (userData) {
      fetchCartData();
    }

    fetchProductsData();
  }, [user, userData]);

  const handleRemoveProduct = (productId) => {
    // Implement product removal logic here
    console.log(`Remove product with ID: ${productId}`);
  };

  const handleQuantityChange = async (productId, newQuantity) => {
    try {
      // Find the cart item that contains the product with the given ID
      const cartItemToUpdate = cartData.find((cartItem) =>
        cartItem.products.some((product) => product.productId === productId)
      );
  
      // Update the quantity of the specific product in the cart item
      const updatedProducts = cartItemToUpdate.products.map((product) =>
        product.productId === productId ? { ...product, quantity: newQuantity } : product
      );
  
      // Prepare the payload for the PATCH request
      const patchPayload = {
        userId: userData.id,
        date: cartItemToUpdate.date,
        products: updatedProducts,
      };
  
      // Send a PATCH request to update the cart item
      const updateResponse = await axios.patch(`https://fakestoreapi.com/carts/${cartItemToUpdate.id}`, patchPayload);
  
      // Check if the update was successful
      if (updateResponse.status === 200) {
        // Update the state with the modified cart data
        const updatedCart = cartData.map((cartItem) =>
          cartItem.id === cartItemToUpdate.id ? { ...cartItem, products: updatedProducts } : cartItem
        );
        setCartData(updatedCart);
      } else {
        console.error('Failed to update cart item. Server returned:', updateResponse.data);
      }
    } catch (error) {
      console.error('Error updating cart item:', error);
    }
  };

  const renderCartItem = ({ item }) => (
    <CartItemCard cartItem={item} productsData={productsData} onPressRemove={handleRemoveProduct} />
  );

  return (
    <View style={{ backgroundColor: '#fff', margin: 0, flex: 1}}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>My Cart</Text>

        {cartData && cartData.length > 0 && productsData && (
          <FlatList
            data={cartData}
            renderItem={({ item }) => (
              <CartItemCard
                cartItem={item}
                productsData={productsData}
                onPressRemove={handleRemoveProduct}
                onQuantityChange={handleQuantityChange}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            style={styles.flatList}
          />
        )}
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </TouchableOpacity>
      </ScrollView>
      
    </View>
    
  );
};

export default CartScreen

const styles = StyleSheet.create({
  container: {
    padding: 18,
    backgroundColor: '#fff',
    // flex: 1,
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#000',
    alignSelf: 'center'
  },
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 16,
    padding: 12,
  },
  cardText: {
    fontSize: 16,
    color: '#000'
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 8,
  },
  productTextContainer: {
    flex: 1,
  },
  productText: {
    fontSize: 14,
    color: '#000'
  },
  removeButton: {
    backgroundColor: '#E53E3E',
    padding: 8,
    borderRadius: 8,
    marginLeft: 8,
  },
  removeButtonText: {
    color: '#fff',
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#353535'
  },
  flatList: {
    paddingBottom: 16,
  },
  checkoutButton: {
    backgroundColor: '#3C6E71',
    padding: 16,
    borderRadius: 15,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  quantityText: {
    fontSize: 14,
    color: '#000',
    marginRight: 8,
  },
})