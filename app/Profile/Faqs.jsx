import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const FAQPage = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'FAQs',
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name='arrow-back' size={24} style={{ marginLeft: 0 }} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const showAboutUs = () => {
    Alert.alert("About Us", "We are a company dedicated to providing excellent service.");
  };

  const showPrivacyPolicy = () => {
    Alert.alert("Privacy Policy", "Your privacy is important to us. We do not share your data.");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Frequently Asked Questions</Text>

      <FAQItem 
        question="What kind of tours does GlobeXplore have?" 
        answer="GlobeXplore offers adventure, culture, family, and eco-friendly tours, among others. You can find options for guided or self-guided trips!" 
      />
      <FAQItem 
        question="How do I book a tour?" 
        answer="Just download the GlobeXplore app, pick a tour you like, and follow the steps to book it right in the app!" 
      />
      <FAQItem 
        question="What features does the app offer?" 
        answer="The GlobeXplore app includes an interactive itinerary, Discover page, and the ability to chat with XploreAssstant."
      />
      <FAQItem 
        question="How do I book a tour?" 
        answer="Download the GlobeXplore app, browse the tours, select one you like, and follow the prompts to complete your booking easily." 
      />

      <TouchableOpacity style={styles.link} onPress={showAboutUs}>
        <Text style={styles.linkText}>About Us</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.link} onPress={showPrivacyPolicy}>
        <Text style={styles.linkText}>Privacy Policy</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const FAQItem = ({ question, answer }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <View style={styles.faqContainer}>
      <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
        <Text style={styles.question}>{question}</Text>
      </TouchableOpacity>
      {isExpanded && <Text style={styles.answer}>{answer}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  faqContainer: {
    marginBottom: 10,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  question: {
    fontSize: 18,
    fontWeight: '600',
  },
  answer: {
    marginTop: 15,
    fontSize: 16,
    color: '#666',
  },
  link: {
    marginTop: 15,
    padding: 10,
    backgroundColor: 'gray',
    borderRadius: 8,
    alignItems: 'center',
  },
  linkText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default FAQPage;
