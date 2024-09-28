import { View, Text, TextInput, Button, ToastAndroid, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import React, { useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import App from '../../components/App';
import Profile from './../tabs/Profile';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { auth, db } from '../../config/firbase';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { collection, getDocs, query, where } from 'firebase/firestore';

export default function MyTrips() {
  const navigation = useNavigation()
  const user = auth.currentUser;
  const [userBookings, setUserBookings] = useState([]);
  const { myTrips } = useLocalSearchParams();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'My Trips',
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name='arrow-back' size={24} style={{ marginLeft: 0 }} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    if (user) {
      userBook();
    }
  }, [user]);

  const userBook = async () => {
    try {
      const bookings = collection(db, 'Bookings');
      const q = query(bookings, where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);

      const booking = querySnapshot.docs.map(doc => doc.data());

      setUserBookings(booking);
    } catch (error) {
      console.error("Error fetching user bookings: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={userBookings}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.bookingItem}>
            <View style={styles.bookingHeader}>
              <Text style={styles.bookingTitle}>{item.name}</Text>
              <Text style={styles.bookingDate}>{item.date}</Text>
            </View>
            <View style={styles.bookingDetails}>
              <Text style={styles.bookingDetail}>Travelers: {item.travelers}</Text>
              <Text style={styles.bookingDetail}>Destination: {item.trip}</Text>
              <Text style={styles.bookingDetail}>Price: {item.totalPrice}</Text>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyList}>No bookings found.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bookingItem: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    elevation: 2,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  bookingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bookingDate: {
    fontSize: 16,
    color: '#666',
  },
  bookingDetails: {
    marginBottom: 10,
  },
  bookingDetail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  emptyList: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    padding: 20,
  },
});