import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Home from './Home';
import Tours from './Tours';
import Chatbot from './Chatbot';
import Discover from './Discover';
import Profile from './Profile';

// export default function Tablayout() {
//     return (
//     <Tabs>
//         <Tabs.Screen name="home" />
//         <Tabs.Screen name="tours"  />
//         <Tabs.Screen name="currency"  />
//         <Tabs.Screen name="Profile" />
//     </Tabs>
//     );
// }


export{
    Home,
    Tours,
    Chatbot,
    Discover,
    Profile
}