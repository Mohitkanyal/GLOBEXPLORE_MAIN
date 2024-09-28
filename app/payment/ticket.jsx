import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firbase';
import App from '../../components/App';
export default function Ticket() {
  const router = useRouter();
  const { paymentid } = useLocalSearchParams();
  const [ticketDetails, setTicketDetails] = useState(null);

  useEffect(() => {
    // Fetch booking details based on payment ID
    const fetchTicketDetails = async () => {
      const docRef = doc(db, 'Bookings', paymentid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setTicketDetails(docSnap.data());
      }
    };

    fetchTicketDetails();
  }, [paymentid]);

  if (!ticketDetails) {
    return <Text>Loading ticket...</Text>;
  }

  const format = (number) => {
    return number.toLocaleString();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ticket</Text>

      <View style={styles.ticketDetails}>
        <Text style={styles.info}>Name: {ticketDetails.name}</Text>
        <Text style={styles.info}>Destination: {ticketDetails.trip}</Text>
        <Text style={styles.info}>Date: {ticketDetails.date}</Text>
        <Text style={styles.info}>Travellers: {ticketDetails.travelers}</Text>
        <Text style={styles.info}>Total Price: {format(ticketDetails.totalPrice)}</Text>
      </View>

      <TouchableOpacity style={styles.doneButton} onPress={() => router.push(App)}>
        <Text style={styles.doneText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 28,
    fontFamily: 'outfit-bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  ticketDetails: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  info: {
    fontSize: 18,
    fontFamily: 'outfit-med',
    marginBottom: 10,
  },
  doneButton: {
    marginTop: 30,
    backgroundColor: '#00bbf0',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  doneText: {
    fontSize: 18,
    fontFamily: 'outfit-bold',
    color: '#fff',
    textAlign: 'center',
  },
});
