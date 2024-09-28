// app.js
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../app/tabs/Home'; // Ensure this path is correct
import Tours from '../app/tabs/Tours';
import Discover from '../app/tabs/Discover';
import Profile from '../app/tabs/Profile';
import Chatbot from '../app/tabs/Chatbot';

import Currency from '../app/tabs/Chatbot';
// import Signin from '@/app/auth/Signin';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <GestureHandlerRootView>
    <NavigationContainer independent ={true}>    
      <Tab.Navigator
        screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { 
          position:'absolute',
          bottom:0,
          right:0,
          left:0,
          height:60,
       
          
          backgroundColor:'black'
        }, 
      }}
    >
      <Tab.Screen name="Home" component={Home} options={{tabBarIcon:({color})=>
        (<MaterialIcons name='space-dashboard' size={28} color={color}/>)}}/>
        
        

      <Tab.Screen name="Discover" component={Discover} options={{tabBarIcon:({color})=>
        (<Ionicons name='globe' size={28} color={color}/>)}}/>
       
      <Tab.Screen name="Tours" component={Tours} options={{tabBarIcon:({color})=>
        (<Ionicons name='location' size={28} color={color}/>)}} />

         <Tab.Screen name="Chatbot" component={Chatbot} options={{tabBarIcon:({color})=>
        (<MaterialIcons name='chat' size={28} color={color}/>)}}/>
        
      <Tab.Screen name="Profile" component={Profile} options={{tabBarIcon:({color})=>
        (<FontAwesome name='user' size={28} color={color}/>)}}/>
    </Tab.Navigator>
   
    </NavigationContainer>
    </GestureHandlerRootView>

  );
}
