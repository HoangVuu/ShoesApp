import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Platform,
  PermissionsAndroid,
  SafeAreaView,
  ActivityIndicator,
  Dimensions,
  FlatList,
  Text,
  Linking,
  Button,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {useSelector, useDispatch} from 'react-redux';
import {getAllStore} from '../../redux/actions';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import IconE from 'react-native-vector-icons/Entypo';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';

const {width, height} = Dimensions.get('window');

const Stores = () => {
  const dispatch = useDispatch();
  let bs = useRef();
  const [isBottom, setIsBottom] = useState(false);
  const [userLocation, setUserLocation] = useState({
    latitude: 10.883202,
    longitude: 106.781713,
  });
  const fall = new Animated.Value(1);
  //
  // latitude: 0, 10.870759
  // longitude: 0, 106.785955

  const storesList = useSelector((state) => state.stores?.storesList);
  // Geolocation.getCurrentPosition((info) => console.log(info.coords));

  // useEffect(() => {
  //   if (Platform.OS === 'ios') {
  //     getLocation();
  //   } else if (Platform.OS === 'android') {
  //     PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //       {
  //         title: 'Please Active location!',
  //         message: 'Access location to fetch data store.',
  //         buttonNeutral: 'Ask Me Later',
  //         buttonNegative: 'Cancel',
  //         buttonPositive: 'OK',
  //       },
  //     )
  //       .then((granted) => {
  //         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //           getLocation();
  //         } else {
  //           console.log('Location permission denied');
  //         }
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // }, [getLocation]);

  // const getLocation = useCallback(() => {
  //   Geolocation.getCurrentPosition(
  //     (info) => {
  //       setUserLocation({
  //         latitude: 10.870759,
  //         longitude: 106.785955,
  //       });
  //     },
  //     (err) => {
  //       console.log(err);
  //     },
  //   );
  // }, []);
  console.log('storesList', storesList);

  useEffect(() => {
    dispatch(getAllStore());
    console.log('object', storesList);
  }, []);

  let coords =
    storesList &&
    storesList?.length &&
    storesList?.map((item) => {
      return {
        latitude: Number(item.latitude),
        longitude: Number(item.longtitude),
      };
    });

  let newStoresList =
    storesList &&
    storesList?.length &&
    coords?.length &&
    storesList?.map((item, index) => {
      return {...item, coords: coords[index]};
    });

  const renderHeader = () => {
    return (
      <View style={styles.maskContainer}>
        <View style={styles.mask}>
          <Text> - </Text>
        </View>
      </View>
    );
  };
  const MyComponent = () => {
    if (!storesList) {
      return null;
    }

    return (
      <ScrollView style={{width: width}}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={storesList}
          keyExtractor={(item) => item.id}
          renderItem={({item, index}) => {
            return (
              <View style={styles.destinationWrapper}>
                <View style={styles.destinationContainer}>
                  <Text style={styles.shopName}>{item.name}</Text>
                  <View style={styles.addContainer}>
                    <IconE name="location-pin" size={20} color="#517ad5" />
                    <Text style={styles.shopAddress}>{item.description}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL(
                      `https://www.google.com/maps?saddr=My+Location&daddr=${item.description}`,
                    )
                  }>
                  <Icon name="chevron-right" size={24} color="#517ad5" />
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </ScrollView>
    );
  };

  return (
    <>
      {!storesList.length && !newStoresList.length ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#F93C66" />
        </View>
      ) : (
        userLocation && (
          <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
            <MapView
              style={{height: height * 0.8}}
              zoomEnabled
              zoomControlEnabled
              provider={PROVIDER_GOOGLE}
              minZoomLevel={6}
              showsBuildings
              showsCompass={true}
              showsPointsOfInterest={false}
              initialRegion={{
                ...userLocation,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              }}>
              <Marker
                coordinate={userLocation}
                title="user"
                // image={require('../../assets/street-view.png')}
                description="Bạn đang ở vị trí này"
              />
              {newStoresList?.length &&
                newStoresList?.map((marker, index) => (
                  <Marker
                    key={index}
                    coordinate={marker.coords}
                    image={require('../../assets/street-view.png')}
                    title={marker.name}
                    description={marker.description}
                  />
                ))}
            </MapView>

            <TouchableOpacity
              style={styles.bottomContainer}
              onPress={() => {
                if (bs && bs.snapTo) {
                  bs.snapTo(0);
                }
              }}>
              <Text style={styles.bottomSheet}>VIEW STORES LIST </Text>
            </TouchableOpacity>

            {/* {isBottom && ( */}
            <BottomSheet
              ref={(r) => {
                bs = r;
              }}
              snapPoints={[170, 0]}
              initialSnap={1}
              renderContent={MyComponent}
              renderHeader={renderHeader}
              enabledGestureInteraction={true}
              callbackNode={fall}
            />
            {/* )} */}
          </SafeAreaView>
        )
      )}
    </>
  );
};

export default Stores;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  map: {
    ...StyleSheet.absoluteFillObject,
  },

  loading: {
    backgroundColor: '#517ad5',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  destinationWrapper: {
    width: width,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#b7b0b0',
    borderBottomWidth: 1,
  },

  destinationContainer: {
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
  },

  shopName: {
    marginLeft: 5,
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },

  addContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },

  shopAddress: {
    fontSize: 14,
    color: 'gray',
  },

  bottomContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#F93C66',
    width: width * 0.8,
    height: height * 0.06,
    borderRadius: 8,
    marginVertical: height * 0.02,
  },

  bottomSheet: {
    fontWeight: '700',
    fontSize: 16,
    color: '#fff',
    textTransform: 'uppercase',
  },

  maskContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: width,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  mask: {
    backgroundColor: 'gray',
    width: width * 0.07,
    borderRadius: 20,
    height: height * 0.008,
    marginTop: 10,
  },
});
