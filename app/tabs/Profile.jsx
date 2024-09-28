import { View, Text, Image, StyleSheet ,Dimensions, TouchableOpacity, Button ,Modal,TextInput} from 'react-native';
import React, { useEffect }  from 'react';
import { Colors } from '@/constants/Colors';
// import App from '../../components/App';
import { useNavigation, useRouter } from 'expo-router';
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { auth } from '../../config/firbase';
import {Stack} from 'expo-router';

export default function Signin() {
  const navigation =useNavigation();
  const router = useRouter();
  const user = auth.currentUser;
  const [isSignedOut, setIsSignedOut] = useState(false);
  const handleSignOut = async () => {
  
      await auth.signOut();
      setIsSignedOut(true);
    
  };  


  useEffect(()=>{
    navigation.setOptions({
      headerShown:true,
      headerTitle:'Profile',
      headerLeft:()=>(<TouchableOpacity
        onPress={() => navigation.goBack()}>
        <Ionicons name='arrow-back' size={24} style={{top:0,left:10,paddingRight:10}}></Ionicons>
      </TouchableOpacity>)
    })
  })
  return (
    <>
    
        <View style={styles.container}>

          {user && !isSignedOut ? (
            <><>

              <FontAwesome name='user' size={110} color='black' style={{ position: 'absolute', left: 50, top: 110 }} />
              <View style={styles.welcome}>
                <Image source={{ uri: user?.imageUrl }}
                  style={{ width: 100 }}
                ></Image>
                <Text style={styles.welcomeText}>Welcome, {user.displayName || user.email || 'User'}!</Text>
                <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
                  <Text style={styles.signOutText}>Sign Out</Text>
                </TouchableOpacity></View>
            </><>

                <View></View>









                <View style={styles.profileContent}>
                <TouchableOpacity onPress={() => router.push('../MyTrips/'+user.Id)}>
                    <Text style={styles.content}>  MY TRIPS</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => router.push('../Profile/Faqs')}>
                    <Text style={styles.content}>  FAQs</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => router.push('../Profile/Faqs')}>
                    <Text style={styles.content}>  ABOUT US</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => router.push('../Profile/Faqs')}>
                    <Text style={styles.content}>  CONTACT US</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => router.push('../Profile/Faqs')}>
                    <Text style={styles.content}>  PRIVACY POLICY</Text>
                  </TouchableOpacity>
                  <Text style={{
                  textAlign:'center',
                  top:20,
                  color:'gray'
                }}>Developed by Apsit Students</Text>


                </View></></>





          ) : (


            <><><FontAwesome name='user' size={110} color='black' style={{ position: 'absolute', left: 50, top: 110, zIndex: 1 }} />
              <View style={styles.welcome}>
                <Text style={styles.welcomeText}>Welcome Back</Text>
                <TouchableOpacity onPress={() => router.push('/auth/Signin')} style={styles.signInButton}>
                  <Text style={styles.signInText}>Sign In</Text>
                </TouchableOpacity></View></>


              <View style={styles.profileContent}>
                <TouchableOpacity onPress={() => router.push('../Profile/Faqs')}>
                  <Text style={styles.content}> FAQs</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('../Profile/Faqs')}>
                  <Text style={styles.content}>  ABOUT US</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('../Profile/Faqs')}>
                  <Text style={styles.content}>  CONTACT US</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('../Profile/Faqs')}>
                  <Text style={styles.content}>  PRIVACY POLICY</Text>
                </TouchableOpacity>
                <Text style={{
                  textAlign:'center',
                  top:20,
                  color:'gray'
                }}>Developed by Apsit Students</Text>

              </View></>
          )}
          {/* </View> */}



          {/* <Modal
            transparent={true}
            visible={modalVisible}
            animationType="slide"
            onRequestClose={() => setModalVisible(false)}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
              <TouchableOpacity
          onPress={() => setModalVisible(false)}>
          <Ionicons name='close' size={24}style={styles.closeBtn}></Ionicons>
        </TouchableOpacity>
                <Text style={styles.welcome}>WELCOME BACK</Text>
                <Text style={styles.text}>Email</Text>
                <TextInput style={styles.input} placeholder='Enter Your Email'></TextInput>
                <Text style={styles.text}>Password</Text>
                <TextInput style={styles.input} placeholder='Enter Your Password'></TextInput>
    
                <Button  title="Login" sty/>
              </View>
            </View>
          </Modal> */}
          {/* </View> */}






        </View></>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // paddingLeft: 150,
    // marginTop:130,
    // position:'absolute'
    // backgroundColor:'#fefffd',
  },
  welcome: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 150,
    marginTop:130,
    // position:'absolute'
    // backgroundColor:'gray'
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  signOutButton: {
    backgroundColor: Colors.black,
    padding: 10,
    // paddingHorizontal: 20,
    borderRadius: 5,
    marginTop:0,
  },
  signOutText: {
    color: 'white',
    fontWeight: 'bold',
  },
  signInButton: {
    backgroundColor: Colors.black,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    // alignItems: 'center',
    // // paddingLeft: 150,
    // marginTop:170,
    // position:'absolute',
    // left:200,
  },
  signInText: {
    color: 'white',
    fontWeight: 'bold',
  },
  profileContent:{
//  position:'absolute',
  position:'relative',
  flex:5,
  

  },
content:{
  paddingLeft:50,
  paddingTop:20,
  fontFamily:'outfit-med',



},

  backBtn:{
    top:80,
    left:10
  },
});