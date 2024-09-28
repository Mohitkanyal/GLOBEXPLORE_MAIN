import { View, Text, TextInput, Button, ToastAndroid, StyleSheet, TouchableOpacity, Image ,FlatList } from 'react-native';
import React, { useEffect } from 'react'
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import App from '../../components/App';
import  Home  from './../tabs/Home';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { doc, getDoc , addDoc ,collection} from 'firebase/firestore';
import { db } from '../../config/firbase';
import validator from 'validator';

export default function Payment() {
  const navigation = useNavigation();
  const router = useRouter();
  const { paymentid } = useLocalSearchParams();
  const [isExpanded,setIsExpanded] = useState(false);
  const [isExpanded1,setIsExpanded1] = useState(false);

  function format(number){
    return number.toLocaleString();
  }
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'Payment',
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name='arrow-back' size={24} style={{ marginLeft: 0 }} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const [detail,setDetail] = useState(null);
  useEffect(()=>{
    getDetail();
  },[paymentid])

  const getDetail = async()=> { 
  const docRef = doc(db , 'Bookings' , paymentid)
  const docSnap = await getDoc(docRef)

  if(docSnap.exists()){
    const data = docSnap.data();
    setDetail(data);
  }}

  const detailList = detail ? [detail] : [];
  const [cardNum,setcardNum] = useState('');
  const [cardCVV,setcardCVV] = useState('');
  const [cardExp,setcardExp] = useState('');
  const [UPI,setUPi] = useState('');

  const formatCardNumber = (text) => {
    
    const cleaned = text.replace(/\D/g, '');
    
   
    const formatted = cleaned.replace(/(.{4})/g, '$1 ').trim();
    setcardNum(formatted);
  };


  const handlePayment = async () => {
    if (!cardCVV || !cardExp || !cardNum) {
      ToastAndroid.show("Please Fill all the details", ToastAndroid.SHORT);
      return;
    }
  
    if (cardCVV.length > 3) {
      ToastAndroid.show("Invalid CVV", ToastAndroid.SHORT);
      return;
    }
  
    // Navigate to Ticket Page after successful payment
    router.push({
      pathname: '/payment/ticket',
      params: { paymentid }
    });
  };
  
  const handlePayment2 = async () => {
    
    const upiPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+$/;
  
    if (!upiPattern.test(UPI)) {
      ToastAndroid.show("Invalid UPI ID", ToastAndroid.SHORT);
      return;
    }
  
    // Navigate to Ticket Page after successful UPI payment
    router.push({
      pathname: '/payment/ticket',
      params: { paymentid },
    });
  };
  




  return (
    <>
    <GestureHandlerRootView>
          <ScrollView style={styles.container}>


      {/* <Text>{paymentid}</Text> */}

      {detailList.map(item => (

<>
        <View style={{backgroundColor:'#ececec',padding:10,borderRadius:5}}>
          <Text style={{ fontSize: 24, fontFamily: 'outfit-med', paddingBottom: 10 ,textDecorationLine:'underline'}}>Review Your Booking!</Text>
          <Text style={styles.info}>Name : {item.name}</Text>
          <Text style={styles.info}>Contact : {item.phone}</Text>
          
          <Text style={styles.info}>Destination : {item.trip}</Text>
          <Text style={styles.info}>Date : {item.date}</Text>
          
          {/* <Text style={styles.info}>{item.userId}</Text> */}
          <Text style={styles.info}>Travellers : {item.travelers}</Text>
          <Text style={styles.info}>Total Price : {format(item.totalPrice)}</Text>
        </View></>


      ))}

      <Text style={{fontSize:30,fontFamily:'outfit-ExtraBold',textAlign:'center',padding:20}}>PAYMENT</Text>

      <View style={styles.payContainer}>
        <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
          <Text style={{fontSize:18,fontFamily:'outfit'}}>Credit/Debit Card</Text>
        </TouchableOpacity>
        {isExpanded && 
        <><Text style={styles.label}>Card Number :</Text>
        <TextInput
          style={styles.card}
          placeholder='Enter Card Number'
          onChangeText={formatCardNumber}
          value={cardNum}
          maxLength={19} 
          keyboardType={'number-pad'}/>

        <Text style={styles.label}>Expiry :</Text>
        <TextInput
          style={styles.expiry}
          placeholder='MM/YY'
          onChangeText={setcardExp}
          value={cardExp} />
          
          <Text style={styles.label}>CVV :</Text>
        <TextInput
          style={styles.cvv}
          placeholder='CVV'
          onChangeText={setcardCVV}
          value={cardCVV} />
          <TouchableOpacity style={styles.paybtn} onPress={handlePayment}><Text style={styles.paytxt}>PAY NOW</Text></TouchableOpacity>
          
          
          </>}


      </View>



      <View style={styles.payContainer}>
        <TouchableOpacity onPress={() => setIsExpanded1(!isExpanded1)}>
          <Text style={{fontSize:18,fontFamily:'outfit'}}>UPI</Text>
        </TouchableOpacity>
        {isExpanded1 && <>
        <TextInput
              style={styles.upi}
              placeholder='Enter UPI Id'
              onChangeText={setUPi}
              value={UPI} />
              <TouchableOpacity style={styles.paybtn} onPress={handlePayment2}><Text style={styles.paytxt}>PAY NOW</Text></TouchableOpacity></>}
      </View>

   

          <View style={{height:100}}></View>
    </ScrollView></GestureHandlerRootView>
    {/* <TouchableOpacity onPress={() => router.push(App)}><Text>DONE</Text></TouchableOpacity> */}
    </>
    
    
    
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:20,
  },
  payContainer:{
    marginBottom: 10,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    

  },
  paybtn:{
    backgroundColor:'#00bbf0',
   justifyContent:'center',
   paddingVertical:10,
   top:12,
   bottom:12,
  borderRadius:15

  },
  paytxt:{
    fontSize:16,
    fontFamily:'outfit-semib',
    textAlign:'center',
    
  },
  info:{
    fontSize:20,
    paddingBottom:10
  },
  label:{
    top:10,
    paddingLeft:5,
    paddingVertical:15,
  },
  card:{
    // top:15,
    paddingLeft:5,
    borderColor:'#ccc',
    borderRadius:8,
    borderWidth:1.5,
    height:40,
    backgroundColor:'#fff',
  },
  expiry:{
    paddingLeft:5,
    borderColor:'#ccc',
    borderRadius:8,
    borderWidth:1.5,
    height:40,
    width:80,
    backgroundColor:'#fff',
  },
  cvv:{
    paddingLeft:5,
    borderColor:'#ccc',
    borderRadius:8,
    borderWidth:1.5,
    height:40,
    width:50,
    backgroundColor:'#fff',
  },
  upi:{
    paddingLeft:5,
    borderColor:'#ccc',
    borderRadius:8,
    borderWidth:1.5,
    height:40,
    backgroundColor:'#fff',
    marginTop:10
  }
})