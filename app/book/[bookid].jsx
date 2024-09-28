import { View, Text, TextInput, Button, ToastAndroid, StyleSheet, TouchableOpacity, Image ,FlatList } from 'react-native';
import React, { useEffect } from 'react'
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import App from '../../components/App';
import  Profile  from './../tabs/Profile';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { doc, getDoc , addDoc ,collection} from 'firebase/firestore';
import { db , auth} from '../../config/firbase';
import validator from 'validator';
export default function Book() {
  const { bookid } = useLocalSearchParams();
  const navigation = useNavigation();
  const router = useRouter();
  navigation.setOptions({
    headerShown: true,
    headerTitle: 'Booking',  
    headerLeft: () => (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name='arrow-back' size={24} style={{ top: 0, left: 0, paddingRight: 10 }} />
      </TouchableOpacity>
    ),
  });


 
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [travelers, setTravelers] = useState('');
    const [date, setDate] = useState('');
    const [price, setPrice] = useState(0);
    const [tripName,settripName] = useState('');

    const handleSubmit = async () => {
      const user = auth.currentUser;
      if (!user) {
       
        ToastAndroid.show("No user is currently logged in.", ToastAndroid.SHORT);
         return;
     }
 


      if (!name || !email || !phone || !travelers || !date) {
        ToastAndroid.show("Please fill in all fields.", ToastAndroid.SHORT);
        return;
      }

      if (!validator.matches(name, /^[a-zA-Z ]+$/)) {
        ToastAndroid.show("Please enter a valid name", ToastAndroid.SHORT);
        return;
      }
      
      if (phone.length!=10){
        ToastAndroid.show("Phone Should be 10 digits ", ToastAndroid.SHORT);
        return;
      }

      if(!validator.isNumeric(phone)){
        ToastAndroid.show("Please enter valid Phone ", ToastAndroid.SHORT);
        return;
      }

      if(travelers == 0){
        ToastAndroid.show(" Number of Travelers cannot be 0 ", ToastAndroid.SHORT);
        return;
      }

      if(!validator.isEmail(email)){
        ToastAndroid.show("Please enter valid email", ToastAndroid.SHORT);
        return;
      }

      if(!validator.isDate(date)){
        ToastAndroid.show("Please enter valid Date", ToastAndroid.SHORT);
        return;
      }
      const selectedDate = new Date(date);
      const currentDate = new Date();


if (selectedDate <= currentDate) {
  ToastAndroid.show("Select a Valid date", ToastAndroid.SHORT);
  return;
}
     
      try {

        const totalPrice = price * parseInt(travelers, 10);
        const trip = tripName;
        console.log(totalPrice)
        const bookingData = {
          name,
          email,
          phone,
          travelers,
          date,
          totalPrice,
          trip,
          userId: user.uid,

          
        };
  
        const docRef = await addDoc(collection(db, 'Bookings'), bookingData);
        ToastAndroid.show("Booking successful!", ToastAndroid.SHORT);
        const id = docRef.id
        router.push(`../payment/${id}`)
      } catch (error) {
        console.error("Error adding document: ", error);
      
      }
    };
   

  const [detail,setDetail] = useState(null)
  useEffect(() =>{
    getDetail();

  },[bookid])


  const getDetail = async ()=>{
    const docRef = doc(db, 'Slider' , bookid);
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()){
      const data = docSnap.data();
      setDetail(data);
      setPrice(data.price);
      settripName(data.name)
      console.log(price)
    }
  }

  const detailList = detail ? [detail] : [];
  return (
    <GestureHandlerRootView>
    <ScrollView style={styles.container}>
    {/* <Text style={styles.welcome}>Explore the World, One Adventure at a Time</Text> */}

    {/* <View><Text>{bookid}</Text></View> */}

    {detailList.map(item => (
    <View style={{flex:1}}>
      <Text style={{
        position:'absolute',fontSize:50,fontFamily:'outfit-semib',top:'50%',color:'#FAF9F6',left:15,textShadowColor:'black',textShadowOffset:{width:1 , height:2,},textShadowRadius:5}}>
        {item.name}</Text>
      <Image source={{uri:item.image}} style={{height:250,width:'100%',zIndex:-1,}}></Image>
  
      <Text style={{ color: '#333',fontSize: 18,fontWeight: 'bold',marginBottom: 25,top:10}}>Your journey begins here. Book your unforgettable tour!</Text>
   </View>
    ))}
      
      <>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder='Enter Your Full Name'
                  value={name}
                  onChangeText={setName}
                  
                  placeholderTextColor="#999" />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  placeholder='Enter Your Email'
                  keyboardType="email-address"
                  onChangeText={setEmail}
                  value={email}
                  placeholderTextColor="#999" />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                  style={styles.input}
                  placeholder='Enter Your Phone'
                  keyboardType="phone-pad"
                  onChangeText={setPhone}
                  value={phone}
                  placeholderTextColor="#999" />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Enter Date</Text>
                <TextInput
                  style={styles.input}
                  placeholder='YYYY/MM/DD'
                  onChangeText={setDate}
                  value={date}
                  placeholderTextColor="#999" />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Number of Travellers</Text>
                <TextInput
                  style={styles.input}
                  placeholder='Enter Number of Travellers (min 1) '
                  onChangeText={setTravelers}
                  value={travelers}
                  placeholderTextColor="#999" />
              </View>
              
              <TouchableOpacity style={styles.signInButton} onPress={handleSubmit}>
                <Text style={styles.signInButtonText}>Book Now</Text>
              </TouchableOpacity></>


<View style={{height:40}}></View>
      
    </ScrollView></GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    // justifyContent: 'center',
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
    backgroundColor: 'black',
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
    color: 'black',
    fontSize: 14,
    marginLeft: 5,
    fontWeight: 'bold',
  },
});

