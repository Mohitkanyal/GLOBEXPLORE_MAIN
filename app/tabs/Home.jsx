import { View, Text, Image, StyleSheet ,Dimensions, TouchableOpacity, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '@/constants/Colors';
import { useNavigation, useRouter } from 'expo-router';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import {useHeaderHeight} from '@react-navigation/elements';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { GestureHandlerRootView} from 'react-native-gesture-handler';
import { collection,getDocs,limit,query } from 'firebase/firestore';
import {db} from '../../config/firbase';
export default function Home() {
  const navigation = useNavigation();
  const router = useRouter();

  const [sliderList,setSlider]=useState([]);
  useEffect(()=>{
    Slider();
   },[]);
   
  const Slider =async()=>{
    setSlider([]);
    const q= query(collection(db,'Slider'));
    const querys= await getDocs(q);

    const sliderData = [];
    querys.forEach((doc)=>{
      console.log(doc.data());
      sliderData.push(doc.data());
      setSlider(prev=>[...prev,{id:doc.id,...doc.data()}])
      // setSlider(sliderData); 
  
    });
    }


    const[discoverList,setDiscover]=useState([]);
    useEffect(()=>{
    Discover();
    },[])
    const Discover=async()=>{
      setDiscover([]);
      const q= query(collection(db,'Discover'),limit(4));
    const querys= await getDocs(q);

    const discoverData = [];
    querys.forEach((doc)=>{
      console.log(doc.data());
      discoverData.push(doc.data());
      setDiscover(prev=>[...prev,{id:doc.id,...doc.data()}])
      // setSlider(sliderData); 
  
    });

    }


  
  return (

    // 
    <GestureHandlerRootView>
    <ScrollView >

      <Image
        source={require('./../images/home.jpg')}
        style={styles.image} />
      <Text style={styles.title}>The Whole World in One Place </Text>
      <Text style={styles.newText}>Discover the most unique places </Text>


      <Text style={styles.heroText}>
        "To travel is to live"
      </Text>
      {/* <Text >{'\u2022'}Item 1</Text> */}
      {/* <Text >{'\u2022'}Item 1</Text>
    <Text >{'\u2022'}Item 1</Text> */}

    <View style={{padding:10,display:'flex',flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
      <Text style={styles.popularTxt}>Popular Destinations</Text>
        <TouchableOpacity onPress={()=>navigation.navigate('Tours')}><Text style={{color:'blue',fontFamily:'outfit'}}>View all</Text></TouchableOpacity></View>
        <FlatList
        data={sliderList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({item,index})=>(
          <TouchableOpacity style={{marginHorizontal:20 }} onPress={()=>{router.push('../tours/'+item.id)}}>
      <Image
        source={{ uri: item.image }}
        style={{
          width: 180,
          height: 250,
          borderRadius: 29,
          top:20
        }}
      />
      <Text style={{ fontSize: 20, color: 'black', marginTop: 20 ,textAlign:'center',fontFamily:'outfit-med',marginBottom:20}}>
        {item.name}
      </Text>
    </TouchableOpacity>)}/>
       

    <View style={{padding:10,display:'flex',flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
      <Text style={styles.popularTxt}>Explore With Us</Text>
        <TouchableOpacity onPress={()=>navigation.navigate('Discover')}><Text style={{color:'blue',fontFamily:'outfit'}}>View all</Text></TouchableOpacity></View>
    <FlatList
          data={discoverList}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={{ marginHorizontal: 20 }} onPress={() => { router.push('../discover/' + item.id); }}>
              <View style={styles.item}>
                <Image style={styles.itemImage} source={{ uri: item.image }} />
                <Text style={styles.itemText}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
   


        
<View>
<TouchableOpacity onPress={()=>navigation.navigate('Chatbot')} style={{paddingHorizontal:10 , paddingVertical:20,}}>
  <Image style={{height:120,
  top:40,
    width:'100%',
    resizeMode:'cover',
    position:'relative',
    borderRadius:10,}}source={require('../../assets/images/chat.png')}></Image>
  
  
  </TouchableOpacity>
  </View>

  <View style={{height:125}}></View>
    </ScrollView>
      
      </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  title: {
    color: 'white',
    position:'absolute',
    // bottom:200,
    top:300,
    left:17,
    fontSize:40,
    // fontWeight:'bold',
    // width:320,
    // textAlign:'center',
    // textDecorationLine:'underline',
    textDecorationStyle:'dotted',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    fontFamily:'outfit-ExtraBold'
   
  },
  newText:{
    color: 'white',
    position:'absolute',
    top:410,
    left:17,
    fontSize:17,
    fontFamily:'outfit',
  },
  heroText:{
    color:'gray',
    fontSize:30,
    textAlign:'center',
    top:10,
    padding:15,
    fontFamily:'outfit-med',
  },
  popularTxt:{
    fontFamily:'outfit-semib',
    fontSize:25,
    // marginTop:20,
    // left:5
  },
  // overlay:{

  //   position: 'absolute',
  //   top: 0,
  //   left: 0,
  //   justifyContent: 'center', // Center the text vertically
  //   alignItems: 'center', // Center the text horizontally
  //   backgroundColor: 'rgba(0, 0, 0, 0.3)', // Optional: Add a semi-transparent background
  // },
  image:{
    height:500,
    width:'100%',
    resizeMode:'cover',
    position:'relative',
    zIndex:-1,
    
  },
  item: {
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 10,
    marginRight: 20,
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
    top:15,
  },
  itemImage: {
    width: 270,
    height: 220,
    borderRadius: 10,
    marginBottom: 10,
  },
  itemText: {
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 20,
    fontFamily:'outfit-med'
  },
});
