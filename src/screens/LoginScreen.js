import React, { useState } from 'react';
import { 
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  Button,
} from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/FontAwesome6';
// import { useFocusEffect } from '@react-navigation/native';


export default function LoginScreen({navigation}) {

  // const route
  const route = useRoute();

  // const for setForms
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    errEmail: '',
    errPassword: '',
  });

  // variables for the useStates
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  // functions for text input validation
  const isEmailValid = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const usernameRegex = /^[a-zA-Z0-9_-]{3,16}$/;
    return emailRegex.test(email) || usernameRegex.test(email);
  };

  const isPasswordValid = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{5,}$/;
    return passwordRegex.test(password);
  };

  const handleEmailChange = (email) => {
    setForm({ ...form, email });

    if (!isEmailValid(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        errEmail: 'Enter a valid email address or username',
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, errEmail: '' }));
    }
  };

  const handlePasswordChange = (password) => {
    setForm({ ...form, password });

    if (!isPasswordValid(password)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        errPassword:
        'Invalid password. Make sure it includes at least one uppercase letter, one lowercase letter, one digit, and one special character ($@$!%*?&), and is at least 5 characters long.',
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, errPassword: '' }));
    }
  };

  const isFormValid = () => {
    return !errors.errEmail && !errors.errPassword;
  };

  const handleSignIn = () => {
    navigation.navigate('Sign Up');
  };

  // login function
  const handleLogin = async () => {
    if (isFormValid()) {
      try {
        // Determine if the input is an email or username
        const isEmail = form.email.includes('@');
        const loginIdentifier = isEmail ? 'email' : 'username';
  
        // Construct the login payload
        const loginPayload = {
          [loginIdentifier]: form.email,
          password: form.password,
        };
  
        const response = await axios.post(
          'https://fakestoreapi.com/auth/login',
          loginPayload
        );

        console.log('API Response:', response.data);
  
        if (response.data.token) {
          // Successful login, you can now save the token or perform other actions
          console.log('Login Successful:', response.data);
  
          // Redirect to Landing Page or perform other navigation
          navigation.navigate('Tab', {
            user: {
              email: form.email,
            },
          });
        } else {
          // Check for specific error messages from the API
          if (response.data.error) {
            Alert.alert('Login Failed', response.data.error);
          } else {
            Alert.alert('Login Failed', 'Invalid email or password');
          }
        }
      } catch (error) {
        console.error('Error during login:', error);
        Alert.alert('Login Failed', 'An error occurred during login');
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.container}>

            {/* Username login */}
            <View style={styles.form}>
              <View style={styles.input}>
                <Text style={styles.inputLabel}>Username</Text>

                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  // keyboardType="email-address"
                  placeholder="binimaloi or binimaloi@gmail.com"
                  placeholderTextColor="#6b7280"
                  style={styles.inputControl}
                  onChangeText={handleEmailChange}
                  value={form.email} />
                <Text style={styles.errorMessage}>{errors.errEmail}</Text>
              </View>
              
              {/* Password */}
              <View style={styles.input}>
                <Text style={styles.inputLabel}>Password</Text>

                <TextInput
                  autoCorrect={false}
                  onChangeText={handlePasswordChange}
                  placeholder="Enter your password"
                  placeholderTextColor="#6b7280"
                  style={styles.inputControl}
                  secureTextEntry={true}
                  value={form.password} />
                <Text style={styles.errorMessage}>{errors.errPassword}</Text>
              </View>

              {/* Sign in Button */}
              <View style={styles.formAction}>
                <TouchableOpacity
                  onPress={handleLogin}>
                  <View style={styles.btn}>
                    <Text style={styles.btnText}>Sign in</Text>
                  </View>
                </TouchableOpacity>
              </View>

              {/* Navigatet to Sign Up Screen */}
              <TouchableOpacity
              // change screen
                onPress={handleSignIn}
                style={{ marginTop: 'auto' }}>
                <Text style={styles.formFooter}>
                  Still don't have an account?{' '}
                  <Text style={{ color: '#3C6E71', fontWeight: 'bold' }}>Sign Up</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  title: {
    fontSize: 27,
    fontWeight: '700',
    color: '#353535',
    marginBottom: 6,
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#929292',
    textAlign: 'center',
  },
  // Error message
  errorMessage: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  /** Header */
  header: {
    marginVertical: 36,
  },
  headerImg: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginBottom: 36,
  },
  /** Form */
  form: {
    marginBottom: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  formAction: {
    marginVertical: 24,
  },
  formFooter: {
    fontSize: 17,
    fontWeight: '300',
    color: '#222',
    textAlign: 'center',
    letterSpacing: 0.15,
  },
  /** Input */
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 22,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  inputControl: {
    height: 44,
    backgroundColor: '#d9d9d9',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
  },
  /** Button */
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#3C6E71',
    borderColor: '#3C6E71',
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
  // Sign up text
  signUp: {
    color: '#ffd100',
  }
});