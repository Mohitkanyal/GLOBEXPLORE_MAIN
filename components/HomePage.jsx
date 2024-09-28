import { View, Text, Image, StyleSheet ,Dimensions, TouchableOpacity, Button } from 'react-native';
import React, { useEffect } from 'react';
import { Colors } from '@/constants/Colors';
import App from '../components/App';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useNavigation, useRouter } from 'expo-router';
const { width, height } = Dimensions.get('window');
export default function HomePage() {

  const navigation=useNavigation();
  // useEffect(()=>{
  //   navigation.setOptions({
  //     headerShown:false
  //   })
  // },[])

  const router=useRouter()
  return (

    <GestureHandlerRootView>
    <><View style={styles.container}>
      <Image
        source={require('./../assets/images/home1.jpg')}
        style={styles.image} />
    </View>
    
    
    <View style={styles.overlay}>
      {/* <Image source={require('./../assets/images/logo1.png')} style={styles.logo}></Image> */}
      <Text style={styles.logoTxt}>GLOBEXPLORE</Text>
      <Text style={styles.text}>Let's Travel The World Together</Text>
       <TouchableOpacity >
       <Text
       onPress={()=>navigation.navigate(App)}
       style={styles.newtext}>Get Started</Text>
       </TouchableOpacity>
       {/* <Button 
       title='Get Started'
       onPress={()=>navigation.navigate(App)}></Button> */}
       </View></>
       </GestureHandlerRootView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,                    // Make the container take up the full screen
    alignItems: 'center',       // Center children horizontally
    justifyContent: 'center',   // Center children vertically (optional, depends on your layout needs)
    backgroundColor: Colors.black, // Optional: add a background color to verify visibility
  },
  image: {
    width:width,       // Set the image width to 100% of its container
    height:height,                // Set a fixed height for the image
    resizeMode: 'cover',        // Ensure the image covers the area while maintaining aspect ratio
  },
  logo:{
    width:300,
    height:100,
    position:'absolute',
    alignItems:'center',
    bottom:450,
  },
  overlay: {
    position: 'absolute',
    // top: 0,
    left: 0,
    width: width,
    height: height,
    justifyContent: 'center', // Center the text vertically
    alignItems: 'center', // Center the text horizontally
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Optional: Add a semi-transparent background
  },
  logoTxt: {
    color:Colors.white,
    bottom:0,
    fontSize:40,
    fontWeight:'bold',
    // fontFamily:'outfit-bold',
    textAlign:'center',
    textDecorationLine:'underline',
    textDecorationStyle:'dotted',
    backgroundColor: 'rgba(0, 0, 0, 0.15)'
  },
  text:{
    fontSize:20,
    color:Colors.white,
    fontStyle:'italic',
    backgroundColor: 'rgba(0, 0, 0, 0.15)'
  },
  newtext:{
    fontSize:20,
    color:Colors.white,
    top:290,
    backgroundColor:Colors.black,
    padding:13,
    borderRadius:15
  }
});
