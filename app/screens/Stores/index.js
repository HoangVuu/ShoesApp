import React, {useEffect, useCallback} from 'react';
import {
  StyleSheet,
  Platform,
  PermissionsAndroid,
  SafeAreaView,
} from 'react-native';
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

const Stores = () => {
  Geolocation.getCurrentPosition((info) => console.log(info));

  useEffect(() => {
    if (Platform.OS === 'ios') {
      getLocation();
    } else if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Please Active location!',
          message: 'Access location to fetch data store.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      )
        .then((granted) => {
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            getLocation();
          } else {
            console.log('Location permission denied');
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const getLocation = useCallback(() => {
    Geolocation.getCurrentPosition(
      (info) => console.log(info),
      (err) => {
        console.log(err);
      },
    );
  }, []);
  
  return (
    <SafeAreaView style={{flex: 1}}>
      <MapView
        style={{flex: 1}}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      />
    </SafeAreaView>
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
});
