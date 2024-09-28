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
import { collection,getDocs,query } from 'firebase/firestore';
import {db} from '../../config/firbase';

export default function Discover() {
  const router = useRouter();
  const navigation = useNavigation();

  const[discoverList,setDiscover]=useState([]);
    useEffect(()=>{
    Discover();
    },[])
    const Discover=async()=>{
      setDiscover([]);
      const q= query(collection(db,'Discover'));
    const querys= await getDocs(q);

    const discoverData = [];
    querys.forEach((doc)=>{
      console.log(doc.data());
      discoverData.push(doc.data());
      setDiscover(prev=>[...prev,{id:doc.id,...doc.data()}])
      // setSlider(sliderData); 
  
    });

    }

    useEffect(()=>{
      navigation.setOptions({
        headerShown:true,
        headerLeft:()=>(<TouchableOpacity
          onPress={() => navigation.goBack()}>
          <Ionicons name='arrow-back' size={24} style={{top:0,left:10,paddingRight:10}}></Ionicons>
        </TouchableOpacity>)
      })
    })
  return (
    <GestureHandlerRootView style={styles.container}>
      
      <ScrollView>
      <FlatList
          data={discoverList}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={{ marginHorizontal: 20 }} onPress={() => { router.push('../discover/' + item.id); }}>
              <View style={styles.item}>
                <Image style={{width:'100%'}} source={{ uri: item.image }} />
                <Text style={{fontFamily:'outfit-bold'}}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      
        <FlatList
          data={discoverList}
          vertical={true}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => { router.push('../discover/' + item.id); }}
            >
              <Image style={styles.itemImage} source={{ uri: item.image }} />
              <Text style={styles.itemText}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
        <View style={{height:100}}></View>
      </ScrollView>
    </GestureHandlerRootView>
  );
}


const styles = StyleSheet.create({
container: {
  flex: 1, // Ensure the view takes up the whole screen
  // backgroundColor: 'black', // Directly use the color value
  top: 0,
  // justifyContent: 'center', // Center the text vertically
  // alignItems: 'center', // Center the text horizontally
},
image:{
  height:500,
  width:'100%',
  resizeMode:'cover',
  position:'relative',
  zIndex:-1,
  
},
text: {
  color: 'black', // Set text color to contrast with the background
},
item: {
  backgroundColor: Colors.white,
  padding: 10,
  borderRadius: 10,
  marginRight: 20,
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  top:15,
  marginBottom:20
},
itemImage: {
  width: '100%',
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
backBtn:{
  
},

});