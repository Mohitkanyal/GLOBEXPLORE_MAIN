import { View, Text, Image, StyleSheet, TouchableOpacity, Button, TextInput, ToastAndroid } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firbase';
import { Colors } from 'react-native/Libraries/NewAppScreen';
export default function Signup() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const createAccount = () => {
    if (!email || !password || !fullName) {
      ToastAndroid.show('Please enter all details', ToastAndroid.BOTTOM);
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        ToastAndroid.show('Account created successfully', ToastAndroid.BOTTOM);
        // Navigate to another screen if needed
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        ToastAndroid.show(errorMessage, ToastAndroid.BOTTOM);
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
        <Ionicons name='arrow-back' size={24} color='black' />
      </TouchableOpacity>

      <Text style={styles.welcome}>SIGN UP</Text>
      
      <Text style={styles.text}>Full Name</Text>
      <TextInput
        style={styles.input}
        placeholder='Enter Your Name'
        onChangeText={setFullName}
        value={fullName}
        placeholderTextColor="#999"
      />

      <Text style={styles.text}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder='Enter Your Email'
        onChangeText={setEmail}
        value={email}
        placeholderTextColor="#999"
        keyboardType="email-address"
      />

      <Text style={styles.text}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder='Enter Your Password'
        secureTextEntry
        onChangeText={setPassword}
        value={password}
        placeholderTextColor="#999"
      />

      <TouchableOpacity style={styles.signUpButton} onPress={createAccount}>
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
  text: {
    color: '#333',
    paddingBottom: 5,
    paddingTop: 5,
    fontWeight: 'bold',
  },
  welcome: {
    color: '#333',
    padding: 10,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
    marginBottom: 15,
  },
  backBtn: {
    position: 'absolute',
    top: 40,
    left: 10,
  },
  signUpButton: {
    backgroundColor: Colors.black,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});