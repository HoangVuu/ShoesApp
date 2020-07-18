import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  Alert,
  Dimensions,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {getCart} from '../../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import CartItem from '../../components/cart-item';

const {width, height} = Dimensions.get('window');

const Cart = () => {
  const dispatch = useDispatch();
  const cartList = useSelector((state) => state.cart);
  console.log('cartList', cartList);
  useEffect(() => {
    dispatch(getCart());
  });

  const handleLoginrequest = () => {
    Alert.alert(
      'Yêu cầu đăng nhập',
      'Bạn phải đăng nhập để sử dụng chức năng này',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );
  };

  const getSum = () => {
    let sum = 0;
    cartList.map((item) => (sum += item.quantity));
    return sum;
  };

  const getTotal = () => {
    let total = 0;
    cartList.map((item) => (total += item.quantity * item.product.price));
    return total;
  };

  return (
    <SafeAreaView style={{backgroundColor: '#fff'}}>
      <View style={styles.headerContainer}>
        <Text style={styles.textHeader}>My Cart</Text>
        <Text style={styles.total}>
          {' '}
          Total {getSum()} {getSum() === 0 ? 'item' : 'items'}
        </Text>
      </View>
      {/* Scroll list cart */}
      {/* <TouchableOpacity>
          <Icon style={styles.btnBack} name="arrowleft" size={25} />
        </TouchableOpacity> */}
      {/* List of Cart */}
      {cartList.length ? (
        <ScrollView style={styles.scrollContainer}>
          <FlatList
            style={{backgroundColor: '#f5f5f5', marginTop: 5}}
            data={cartList}
            removeClippedSubviews
            renderItem={({item}) => {
              return (
                <TouchableOpacity style={styles.info}>
                  <CartItem key={item.product.id} card={item} />
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item, index) => index}
          />
        </ScrollView>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={{color: '#847d7d'}}>
            Your cart is empty. Please choose shoes.
          </Text>
        </View>
      )}

      {/* Next  */}
      <View>
        <View style={styles.headerContainer}>
          <Text style={styles.textTotal}>Total</Text>
          <Text style={styles.totalMoney}>${getTotal()}</Text>
        </View>
        <TouchableOpacity
          onPress={handleLoginrequest}
          style={styles.cartContainer}>
          <Text style={styles.cart}>NEXT</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  headerContainer: {
    borderBottomColor: '#E5E5E7',
    borderBottomWidth: 1,
    height: height * 0.1,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  btnBack: {
    marginLeft: 15,
  },

  textHeader: {
    fontSize: 28,
    marginLeft: 20,
    fontWeight: 'bold',
  },

  total: {
    marginRight: 15,
    fontSize: 16,
  },

  scrollContainer: {
    height: height * 0.58,
    backgroundColor: '#fff',
  },

  cartContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#F93C66',
    width: width * 0.8,
    height: height * 0.06,
    borderRadius: 8,
    marginVertical: height * 0.03,
  },

  cart: {
    color: '#fff',
    textTransform: 'uppercase',
  },

  textTotal: {
    fontSize: 16,
    marginLeft: 20,
    textTransform: 'uppercase',
  },

  totalMoney: {
    fontWeight: 'bold',
    marginRight: 15,
    fontSize: 28,
  },

  emptyContainer: {
    alignItems: 'center',
    marginTop: 20,
    height: height * 0.54,
  },
});
