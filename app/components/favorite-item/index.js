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
import Icon from 'react-native-vector-icons/AntDesign';
import IconF from 'react-native-vector-icons/FontAwesome';
import {useDispatch} from 'react-redux';

const {width, height} = Dimensions.get('window');

const FavoriteItem = (props) => {
  const dispatch = useDispatch();

  const {item} = props;

  // const showNotify = () => {
  //   Alert.alert('Notification', 'Do you want to delete this product?', [
  //     {text: 'Cancel', style: 'cancel'},
  //     {text: 'OK', onPress: () => removeCartItem()},
  //   ]);
  // };

  const deleteFavorite = () => {
    dispatch({
      type: 'REMOVE_TO_FAVORITE',
      payload: item?.id,
    });
  };

  useEffect(() => {
    console.log('item?.image', item);
  }, []);

  return (
    <View style={styles.favorite}>
      <TouchableOpacity onPress={deleteFavorite} style={styles.deleteAll}>
        <IconF name="remove" size={18} />
      </TouchableOpacity>
      <Image source={{uri: item.image}} style={styles.imgContainer} />
      <View style={styles.bottomContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  favorite: {
    width: width * 0.47,
    height: height * 0.34,
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
    color: '#9999FF',
    fontWeight: 'bold',
    fontSize: 17,
    width: 'auto',
    alignItems: 'flex-end',
  },

  price: {
    fontSize: 16,
    marginBottom: 10,
  },

  deleteAll: {
    position: 'absolute',
    top: 10,
    right: 10,
    alignSelf: 'flex-end',
    marginLeft: width * 0.23,
  },
});

export default FavoriteItem;
