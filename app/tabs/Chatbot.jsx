import React from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet, View, Text , TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { useNavigation } from 'expo-router';

export default function Chatbot() {
  const navigation = useNavigation();
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
    <View style={styles.container}>
      <WebView 
        source={{ uri: 'https://cdn.botpress.cloud/webchat/v2/shareable.html?botId=0f043da5-9237-4ef5-9cbf-5a10c50cbe8e' }} 
        style={styles.webview}
       
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom:30,
    // backgroundColor:'black',

  },
  webview: {
    flex: 1,
    marginBottom:10,
    // marginTop:10,
    // backgroundColor:'black',
    width:'100%',
  },
  
});
