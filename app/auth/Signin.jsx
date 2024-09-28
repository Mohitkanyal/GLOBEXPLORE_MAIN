import { View, Text, TextInput, Button, ToastAndroid, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
// import { useNavigation} from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRouter } from 'expo-router';
import { auth } from '../../config/firbase'; // Ensure this path is correct
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import App from '../../components/App';
import  Profile  from './../tabs/Profile';

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const navigation = useNavigation();

  const signIn = async () => {
    if (!email || !password) {
      ToastAndroid.show('Please enter both email and password', ToastAndroid.BOTTOM);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push(Profile);


    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === 'auth/invalid-email') {
        ToastAndroid.show('Invalid email address format', ToastAndroid.BOTTOM);
      } else if (errorCode === 'auth/user-not-found') {
        ToastAndroid.show('No user found with this email', ToastAndroid.BOTTOM);
      } else if (errorCode === 'auth/wrong-password') {
        ToastAndroid.show('Incorrect password', ToastAndroid.BOTTOM);
      } else {
        ToastAndroid.show(errorMessage, ToastAndroid.BOTTOM);
      }
    }
    
  };

  

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
        <Ionicons name='arrow-back' size={24} color='black' />
      </TouchableOpacity>

      
      
      <Text style={styles.welcome}>WELCOME BACK</Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder='Enter Your Email'
          onChangeText={setEmail}
          value={email}
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder='Enter Your Password'
          secureTextEntry
          onChangeText={setPassword}
          value={password}
          placeholderTextColor="#999"
        />
      </View>

      <TouchableOpacity style={styles.signInButton} onPress={signIn}>
        <Text style={styles.signInButtonText}>Login</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity onPress={() => router.push('/auth/ForgotPassword')}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity> */}

      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't Have An Account?</Text>
        <TouchableOpacity onPress={() => router.push('/auth/Signup')}>
          <Text style={styles.signUpText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  backBtn: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
  welcome: {
    color: '#333',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    color: '#333',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    borderColor: '#ccc',
    backgroundColor: '#fff',
    height: 48,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 16,
    color: '#333',
  },
  signInButton: {
    backgroundColor: Colors.black,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  signInButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPasswordText: {
    color: '#6200EE',
    textAlign: 'center',
    marginTop: 15,
    fontSize: 14,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: {
    color: '#333',
    fontSize: 14,
  },
  signUpText: {
    color: Colors.black,
    fontSize: 14,
    marginLeft: 5,
    fontWeight: 'bold',
  },
});