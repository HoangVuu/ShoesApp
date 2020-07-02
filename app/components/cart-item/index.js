import React, {Component} from 'react';
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
import {useDispatch} from 'react-redux';

const {width, height} = Dimensions.get('window');

const CardItem = (props) => {
  const dispatch = useDispatch();
  const {card} = props;
  console.log('card', card);

  const decreaseQuantity = () => {
    dispatch({
      type: 'DECREASE_QUANTITY',
      payload: card.product.id,
    });
  };

  const increaseQuantity = () => {
    dispatch({
      type: 'INCREASE_QUANTITY',
      payload: card.product.id,
    });
  };

  const removeCartItem = () => {
    console.log('1111111111', 1111111111);
    // gui dispatch yêu cầu xóa
    dispatch({
      type: 'REMOVE_TO_CART',
      payload: card.product.id,
    });
  };

  const showNotify = () => {
    Alert.alert('sdfgh', 'Do you want to delete this product?', [
      {text: 'Cancel', style: 'cancel'},
      {text: 'OK', onPress: () => removeCartItem()},
    ]);
  };

  const handleDecreseCard = () => {
    if (card.quantity > 1) {
      decreaseQuantity();
    } else {
      showNotify();
    }
  };

  // componentDidUpdate(){

  // }

  return (
    <View style={{backgroundColor: '#fff'}}>
      <View style={styles.cartContainer}>
        <View style={styles.background}>
          <Image style={styles.imgShoes} source={{uri: card.product.image}} />
        </View>

        <View style={styles.info}>
          <Text style={styles.name}>{card.product.name}</Text>
          <Text style={styles.money}> ${card.product.price}</Text>
          <View style={styles.quantity}>
            <TouchableOpacity
              style={styles.btnQuantity}
              onPress={handleDecreseCard}>
              <Icon name="minus" size={25} />
            </TouchableOpacity>
            <Text style={styles.quantityNumber}> {card.quantity} </Text>
            <TouchableOpacity
              style={styles.btnQuantity}
              onPress={increaseQuantity}>
              <Icon name="plus" size={25} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 80,
  },

  background: {
    width: width * 0.18,
    height: width * 0.18,
    backgroundColor: '#E5E5E7',
    borderRadius: 10,
    marginLeft: 20,
  },

  cartContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  imgShoes: {
    width: 0.25 * width,
    height: 0.12 * height,
    transform: [{rotate: '-30deg'}],
  },

  backgroundShoes: {
    width: '120%',
    height: 100,
  },

  quantity: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  info: {
    width: 0.6 * width,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  name: {
    fontSize: 17,
  },

  money: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  btnQuantity: {
    backgroundColor: '#E5E5E7',
    padding: width * 0.01,
    borderRadius: 10,
  },

  quantityNumber: {
    fontSize: 18,
    padding: 10,
  },
});

export default CardItem;
