import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, Dimensions, useWindowDimensions ,ScrollView} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Feather, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { db } from '../../config/firbase';
import { doc, getDoc } from 'firebase/firestore';
import { useLocalSearchParams, useNavigation , useRouter} from 'expo-router';
import { useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

export default function TourDetail() {
  const { toursid } = useLocalSearchParams();
  const navigation = useNavigation();
  const router = useRouter();
  const [detail, setDetail] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  function format(number){
    return number.toLocaleString();
  }
  useEffect(() => {
    getDetail();
  }, [toursid]);
  
  const getDetail = async () => {
    const docRef = doc(db, 'Slider', toursid);
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
      const data = docSnap.data(); 
      console.log(data);
      setDetail(data);
  
      navigation.setOptions({
        headerShown: true,
        headerTitle: data.name,  
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name='arrow-back' size={24} style={{ top: 0, left: 0, paddingRight: 10 }} />
          </TouchableOpacity>
        ),
      });
    } else {
      console.log("No such document!");
    }
  };
  
  const detailList = detail ? [detail] : [];
  return (
    <>
   <GestureHandlerRootView style={styles.container}>
   <FlatList
          data={detailList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
             <><ScrollView contentContainerStyle={styles.scrollViewContent}>
              {item && (
                <><ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  style={styles.imageScrollContainer}
                  onScroll={(event) => {
                    const slideSize = event.nativeEvent.layoutMeasurement.width;
                    const currentIndex = event.nativeEvent.contentOffset.x / slideSize;
                    setActiveIndex(currentIndex);
                  }}
                >
                  <Image style={styles.itemImage} source={{ uri: item.gal1 }} />
                  <Image style={styles.itemImage} source={{ uri: item.gal2 }} />
                  <Image style={styles.itemImage} source={{ uri: item.gal3 }} />
                  
                </ScrollView>
                  <View style={styles.dotContainer}>
                    {item && (
                      <View style={styles.dotWrapper}>
                        {item.gal1 && <View style={[styles.dot, activeIndex === 0 ? styles.activeDot : null]} />}
                        {item.gal2 && <View style={[styles.dot, activeIndex === 1 ? styles.activeDot : null]} />}
                        {item.gal3 && <View style={[styles.dot, activeIndex === 2 ? styles.activeDot : null]} />}
                      </View>
                    )}
                  </View>
                  <View style={styles.detailContainer}>
                   
                    <View style={styles.contentwrapper}>

               

                    </View>
                  </View></>
              )}
            </ScrollView><View style={styles.detailContainer}>
                {/* <Image source={{ uri: item.image }} style={styles.image} /> */}
                <View style={styles.contentwrapper}>
                  <Text style={styles.IndialistName}>{item.name}</Text>
                  <View style={styles.locationContainer}>
                    <FontAwesome5 name="map-marker-alt" size={18} color={'black'} />
                    <Text style={{ fontFamily: 'outfit-med', paddingLeft: 10, fontSize: 18 }}>{item.location}</Text>
                  </View>
                  <View style={styles.highlightwrapper}>
                    <View style={{ flexDirection: 'row' }}>
                      <View style={styles.highlighticon}>
                        <Ionicons name='time' size={18} color={'black'} />
                      </View>
                      <View>
                        <Text style={styles.highlightTxt}>Duration</Text>
                        <Text style={styles.highlightTxtvalue}>{item.duration} Days</Text>
                      </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <View style={styles.highlighticon}>
                        <AntDesign name="calendar" size={24} color="black" />
                      </View>
                      <View>
                        <Text style={styles.highlightTxt}>Best Time</Text>
                        <Text style={styles.highlightTxtvalue}>{item.bestt}</ Text>
                      </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <View style={styles.highlighticon}>
                        <Ionicons name='star' size={18} color={'black'} />
                      </View>
                      <View>
                        <Text style={styles.highlightTxt}>Rating</Text>
                        <Text style={styles.highlightTxtvalue}>{item.rating}</Text>
                      </View>
                    </View>
                  </View>
                  <Text style={styles.Indialistdetails}>{item.info}</Text>

                  {<Text style={styles.itineraryTitle}>Itinerary</Text>}
                  {<Text style={{
                    fontSize: 18,
                    color: 'black',
                    marginTop: 10,
                    fontFamily: 'outfit-bold',
                    paddingHorizontal: 10
                  }}>Day 1: {item.day1.split('.')[0]}</Text>}

                  {<Text style={styles.itineraryText}>{item.day1.split('.')[1]}</Text>}
                  {<Text style={styles.itineraryText}>{item.day1.split('.')[2]}</Text>}
                  {<Text style={styles.itineraryText}>{item.day1.split('.')[3]}</Text>}
                  {<Text style={styles.itineraryText}>{item.day1.split('.')[4]}</Text>}


                  {<Text style={{
                    fontSize: 18,
                    color: 'black',
                    marginTop: 10,
                    fontFamily: 'outfit-bold', paddingHorizontal: 10
                  }}>Day 2: {item.day2.split('.')[0]}</Text>}
                  {<Text style={styles.itineraryText}>{item.day2.split('.')[1]}</Text>}
                  {<Text style={styles.itineraryText}>{item.day2.split('.')[2]}</Text>}
                  {<Text style={styles.itineraryText}>{item.day2.split('.')[3]}</Text>}
                  {<Text style={styles.itineraryText}>{item.day2.split('.')[4]}</Text>}


                  {<Text style={{
                    fontSize: 18,
                    color: 'black',
                    marginTop: 10,
                    fontFamily: 'outfit-bold', paddingHorizontal: 10
                  }}>Day 3: {item.day3.split('.')[0]}</Text>}
                  {<Text style={styles.itineraryText}>{item.day3.split('.')[1]}</Text>}
                  {<Text style={styles.itineraryText}>{item.day3.split('.')[2]}</Text>}
                  {<Text style={styles.itineraryText}>{item.day3.split('.')[3]}</Text>}
                  {<Text style={styles.itineraryText}>{item.day3.split('.')[4]}</Text>}



                  {item.day4 && (
                    <>
                      <Text style={{ fontSize: 18, color: 'black', marginTop: 10, fontFamily: 'outfit-bold', paddingHorizontal: 10 }}>
                        Day 4: {item.day4.split('.')[0]}
                      </Text>
                      {item.day4.split('.')[1] && <Text style={styles.itineraryText}>{item.day4.split('.')[1]}</Text>}
                      {item.day4.split('.')[2] && <Text style={styles.itineraryText}>{item.day4.split('.')[2]}</Text>}
                      {item.day4.split('.')[3] && <Text style={styles.itineraryText}>{item.day4.split('.')[3]}</Text>}
                      {item.day4.split('.')[4] && <Text style={styles.itineraryText}>{item.day4.split('.')[4]}</Text>}
                    </>
                  )}


                  {item.day5 && (
                    <>
                      <Text style={{ fontSize: 18, color: 'black', marginTop: 10, fontFamily: 'outfit-bold', paddingHorizontal: 10 }}>
                        Day 5: {item.day5.split('.')[0]}
                      </Text>
                      {item.day5.split('.')[1] && <Text style={styles.itineraryText}>{item.day5.split('.')[1]}</Text>}
                      {item.day5.split('.')[2] && <Text style={styles.itineraryText}>{item.day5.split('.')[2]}</Text>}
                      {item.day5.split('.')[3] && <Text style={styles.itineraryText}>{item.day5.split('.')[3]}</Text>}
                      {item.day5.split('.')[4] && <Text style={styles.itineraryText}>{item.day5.split('.')[4]}</Text>}

                    </>
                  )}                  
                </View>
              </View></>
          )}
        />
<View style={{width:'100%',height:50,backgroundColor:'gray',alignItems:'center',justifyContent:'center'}}> 
<FlatList
      data={detailList}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id} // Ensure ID is a string
      renderItem={({ item }) => 
        
        (
        <TouchableOpacity
          style={{ alignItems: 'center',justifyContent: 'center',}}
          onPress={() => router.push(`../book/${toursid}`)}>
          <Text style={{color:'white',fontFamily:'outfit-bold'}}>   BOOK NOW - ₹{format(item.price)}</Text> 
        </TouchableOpacity>
      )}
    /></View>

       
      </GestureHandlerRootView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
    
  },
  detailContainer: {
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 250,
  },
  contentwrapper: {
    padding: 10,
  },
  IndialistName: {
    fontSize: 24,
    letterSpacing: 0.5,
    color: 'black',
    fontFamily:'outfit-ExtraBold'
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 10,
  },
  highlightwrapper: {
    flexDirection: 'row',
    marginVertical: 20,
    justifyContent: 'space-between',
  },
  highlighticon: {
    backgroundColor: '#F4F4F4',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
    marginRight: 5,
    alignItems: 'center',
  },
  highlightTxt: {
    fontSize: 12,
    color: '#999',
  },
  highlightTxtvalue: {
    fontSize: 14,
    color: 'black',
  },
  Indialistdetails: {
    fontSize: 16, 
    color: '#444', 
    lineHeight: 22, 
    marginBottom: 15, 
    fontFamily: 'Roboto', 
    textAlign: 'left', 
    paddingHorizontal: 8, 
    paddingVertical: 10, 
  },
  itineraryTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 20,
  },
  itineraryText: {
    fontSize: 16,
    color: 'black',
    marginTop: 10,
    paddingHorizontal:10,
    lineHeight:26
  },
  itemImage: {
    width: 400,
    height: 250,
    // borderRadius: 5,
    marginRight: 20,
    marginLeft:0,
    resizeMode:'cover'
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  dotWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: 'black',
  },
  footerRow: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 25, 
    paddingVertical:30,
    marginTop: 2,
  },
  footerBtn1: {
    backgroundColor: 'black',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footertxt1: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  priceContainer: {
    backgroundColor: 'black',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  priceLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  priceValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});