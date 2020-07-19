import React, {useEffect} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import {withNavigation} from '@react-navigation/compat';
import IconF from 'react-native-vector-icons/FontAwesome';
import {useDispatch} from 'react-redux';

const {width, height} = Dimensions.get('window');

const FavoriteItem = (props) => {
  const dispatch = useDispatch();

  const {item} = props;

  const goToDetail = () => {
    props.navigation.navigate('ProductDetail', {
      id: item.id,
    });
  };

  const showNotify = () => {
    Alert.alert(
      'Notification',
      'Do you want to delete this shoes from favorites lists?',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'OK', onPress: () => deleteFavorite()},
      ],
    );
  };

  const deleteFavorite = () => {
    dispatch({
      type: 'REMOVE_TO_FAVORITE',
      payload: item?.id,
    });
  };

  return (
    <TouchableOpacity onPress={goToDetail}>
      <View style={styles.favorite}>
        <TouchableOpacity onPress={showNotify} style={styles.deleteAll}>
          <IconF name="remove" size={18} />
        </TouchableOpacity>
        <Image source={{uri: item.image}} style={styles.imgContainer} />
        <View style={styles.bottomContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>${item.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  favorite: {
    width: width * 0.47,
    height: height * 0.35,
    backgroundColor: 'white',
    margin: width * 0.01,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.2,
    elevation: 6,
    paddingBottom: 30,
    // paddingBottom: 20,
  },

  imgContainer: {
    width: '85%',
    height: 180,
    resizeMode: 'contain',
    transform: [{rotate: '-25deg'}],
  },

  bottomContainer: {
    width: '75%',
    alignSelf: 'center',
  },

  name: {
    height: height * 0.06,
    color: '#9999FF',
    fontWeight: 'bold',
    fontSize: 17,
    width: 'auto',
    alignItems: 'flex-end',
  },

  price: {
    fontSize: 16,
  },

  deleteAll: {
    position: 'absolute',
    top: 10,
    right: 10,
    alignSelf: 'flex-end',
    marginLeft: width * 0.23,
  },
});

export default withNavigation(FavoriteItem);
