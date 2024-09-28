import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, Button } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { Colors } from '@/constants/Colors';
import { useNavigation, useRouter } from 'expo-router';
import { FlatList } from 'react-native-gesture-handler';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useHeaderHeight } from '@react-navigation/elements';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/firbase';

export default function Tours() {
  const router = useRouter();
  const navigation = useNavigation();
  const [activeCategory, setActiveCategory] = useState('All'); // State for active category
  const [domesticTours, setDomesticTours] = useState([]);
  const [internationalTours, setInternationalTours] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name='arrow-back' size={24} style={{ top: 0, left: 10, paddingRight: 10 }}></Ionicons>
        </TouchableOpacity>
      ),
    });

    fetchToursData(); 
  }, []);


  const fetchToursData = async () => {
    try {
      // Fetch domestic tours 
      const domesticQuery = query(collection(db, 'indTours')); 
      const domesticSnapshot = await getDocs(domesticQuery);
      const domesticData = domesticSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), type: 'Domestic' }));
      setDomesticTours(domesticData);

      // Fetch international tours
      const internationalQuery = query(collection(db, 'forTours')); 
      const internationalSnapshot = await getDocs(internationalQuery);
      const internationalData = internationalSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), type: 'International' }));
      setInternationalTours(internationalData);

    } catch (error) {
      console.error("Error fetching tours data:", error);
    }
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const allTours = [...domesticTours, ...internationalTours]; // Combine domestic and international tours

  return (
    <GestureHandlerRootView>
      <View style={{paddingBottom:99}}>
        <View style={{ display: 'flex', flexDirection: 'row', padding: 20, gap: 20, borderRadius: 10 }}>
          <Button 
            title='All' 
            onPress={() => handleCategoryChange('All')} 
            color={activeCategory === 'All' ? 'blue' : 'gray'} // Change button color based on active category
          />
          <Button 
            title='Domestic' 
            onPress={() => handleCategoryChange('Domestic')} 
            color={activeCategory === 'Domestic' ? 'blue' : 'gray'}
          />
          <Button 
            title='International'
            onPress={() => handleCategoryChange('International')} 
            color={activeCategory === 'International' ? 'blue' : 'gray'}
          />
        </View>

        {/* Conditionally render tours based on the active category */}
        {activeCategory === 'All' && ( 
          <FlatList
            data={allTours}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  marginHorizontal: 10,
                  marginBottom: 5,
                  width: '45%',
                  padding: 10,
                }}
                onPress={() => {
                  if (item.type === 'Domestic') {
                    router.push('../toursDetail/' + item.id);
                  } else {
                    router.push('../toursforeign/' + item.id);
                  }
                }}
              >
                <Image
                  source={{ uri: item.image }}
                  style={{
                    width: '100%',
                    height: 225,
                    borderRadius: 29,
                    marginBottom: 10,
                  }}
                />
                <Text
                  style={{
                    fontSize: 20,
                    color: 'black',
                    textAlign: 'center',
                    fontFamily: 'outfit-med',
                  }}
                >
                  {item.name}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: 'gray',
                    textAlign: 'center',
                    fontFamily: 'outfit-med',
                  }}
                >
                </Text >
              </TouchableOpacity>
            )}
          />
        )}

        {activeCategory === 'Domestic' && ( 
          <FlatList
            data={domesticTours}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  marginHorizontal: 10,
                  marginBottom: 5,
                  width: '45%',
                  padding: 10,
                }}
                onPress={() => {
                  router.push('../toursDetail/' + item.id);
                }}
              >
                <Image
                  source={{ uri: item.image }}
                  style={{
                    width: '100%',
                    height: 225,
                    borderRadius: 29,
                    marginBottom: 10,
                  }}
                />
                <Text
                  style={{
                    fontSize: 20,
                    color: 'black',
                    textAlign: 'center',
                    fontFamily: 'outfit-med',
                  }}
                >
                  {item.name}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: 'gray',
                    textAlign: 'center',
                    fontFamily: 'outfit-med',
                  }}
                >
                              </Text>
              </TouchableOpacity>
            )}
          />
        )}

        {activeCategory === 'International' && ( 
          <FlatList 
            data={internationalTours}
            numColumns={2 }
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  marginHorizontal: 10,
                  marginBottom: 5,
                  width: '45%',
                  padding: 10,
                }}
                onPress={() => {
                  router.push('../toursforeign/' + item.id);
                }}
              >
                <Image
                  source={{ uri: item.image }}
                  style={{
                    width: '100%',
                    height: 225,
                    borderRadius: 29,
                    marginBottom: 10,
                  }}
                />
                <Text
                  style={{
                    fontSize: 20,
                    color: 'black',
                    textAlign: 'center',
                    fontFamily: 'outfit-med',
                  }}
                >
                  {item.name}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: 'gray',
                    textAlign: 'center',
                    fontFamily: 'outfit-med',
                  }}
                >
             
                </Text>
              </TouchableOpacity>
            )}
          />
        )}
        
        <View style={{ height: 100 }}></View>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  placeholder: {
    height: 500,
    backgroundColor: 'lightgray',
    marginVertical: 10,
  },
  target: {
    height: 100,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});