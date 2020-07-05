import React, {useEffect, useCallback, useState} from 'react';
import {
  View,
  StyleSheet,
  Platform,
  PermissionsAndroid,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {useSelector, useDispatch} from 'react-redux';
import {getAllStore} from '../../redux/actions';

const Stores = () => {
  const dispatch = useDispatch();
  const [userLocation, setUserLocation] = useState(null);

  // latitude: 0, 10.870759
  // longitude: 0, 106.785955

  const storesList = useSelector((state) => state.stores?.storesList);
  Geolocation.getCurrentPosition((info) => console.log(info.coords));

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
  }, [getLocation]);

  const getLocation = useCallback(() => {
    Geolocation.getCurrentPosition(
      (info) => {
        setUserLocation({
          latitude: 10.870759,
          longitude: 106.785955,
        });
      },
      (err) => {
        console.log(err);
      },
    );
  }, []);
  console.log('storesList', storesList);
  console.log('userLocation', userLocation);

  useEffect(() => {
    dispatch(getAllStore());
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

  return (
    <>
      {!storesList.length && !newStoresList.length ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#517ad5" />
        </View>
      ) : (
        userLocation && (
          <SafeAreaView style={{flex: 1}}>
            <MapView
              style={{flex: 1}}
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
