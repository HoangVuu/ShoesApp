import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import IconF from 'react-native-vector-icons/FontAwesome';
import IconM from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/AntDesign';
import {withNavigation} from '@react-navigation/compat';
import {useSelector, useDispatch} from 'react-redux';

const {width, height} = Dimensions.get('window');

const Product = (props) => {
  const dispatch = useDispatch();
  const [isLove, setIsLove] = useState(true);
  const {item, isCurrent} = props;
  const [flipAnim] = useState(new Animated.Value(0));
  const [widthAnim] = useState(new Animated.Value(160));
  const [heightAnim] = useState(new Animated.Value(220));

  const categories = JSON.parse(JSON.stringify(item.categories));

  const userInfo = useSelector((state) => state.userInfo);
  const lovedList = useSelector((state) => state.favorite);
  const listLiked = lovedList.map((favoItem) => favoItem.id);
  const addToCart = () => {
    // send request add to cart
    dispatch({
      type: 'ADD_TO_CART', //thuộc tính bắt buộc: mô tả hành động
      payload: item, // khi nào cần gửi dữ liệu lên thì gửi kèm
    });
  };

  const goToDetail = () => {
    props.navigation.navigate('ProductDetail', {
      id: item.id,
    });
  };

  const addItem = () => {
    dispatch({
      type: 'ADD_TO_FAVORITE',
      payload: item,
    });
  };

  const removeItem = () => {
    dispatch({
      type: 'REMOVE_TO_FAVORITE',
      payload: item?.id,
    });
  };

  const handleFavorite = () => {
    setIsLove(!isLove);
    console.log('love', isLove);
    console.log('userInfo.isLogin', userInfo.isLogin);

    isLove ? addItem() : removeItem();
  };

  const handleLoginrequest = () => {
    Alert.alert(
      'Login request',
      'You have to login to experience this feature',
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

  console.log('item.id', item.id);
  console.log('list Liked', listLiked);

  useEffect(() => {
    if (listLiked.some((favo) => favo === item.id)) {
      setIsLove(false);
    } else {
      setIsLove(true);
    }
  }, [listLiked]);

  useEffect(() => {
    if (isCurrent) {
      //make animation
      Animated.timing(widthAnim, {
        toValue: 180,
        duration: 300,
      }).start();

      Animated.timing(heightAnim, {
        toValue: 240,
        duration: 300,
      }).start();

      Animated.sequence([
        Animated.timing(flipAnim, {
          toValue: 1,
          duration: 300,
        }),

        Animated.spring(flipAnim, {
          toValue: 0,
          duration: 300,
          friction: 1,
          tension: 1,
        }),
      ]).start();
    } else {
      Animated.timing(widthAnim, {
        toValue: 160,
        duration: 300,
      }).start();

      Animated.timing(heightAnim, {
        toValue: 220,
        duration: 300,
      }).start();
    }
  }, [isCurrent]);

  return (
    <Animated.View
      style={{
        ...styles.productContainer,
        // transform: [
        //   {
        //     rotateY: flipAnim.interpolate({
        //       inputRange: [0, 1],
        //       outputRange: ['0deg', '80deg'],
        //     }),
        //   },
        // ],
        // width: widthAnim,
        // height: heightAnim,
        // opacity: fadeAnim,
        // transform: [{translateY: slideAnim}],
      }}>
      <TouchableOpacity onPress={goToDetail}>
        <View style={styles.productInfo}>
          <Text style={styles.productCat}>{item.categories[0].category}</Text>
          <Text style={styles.productName}>
            {item.name
              .toLocaleLowerCase()
              .replace(categories[0].category.toLowerCase(), '')
              .trim()}
          </Text>
          <Text style={styles.productPrice}>${item.price}</Text>
        </View>
        <Image source={{uri: item.image}} style={styles.productImg} />
        <TouchableOpacity onPress={goToDetail} style={styles.iconContainer}>
          <IconF
            name="long-arrow-right"
            size={25}
            style={styles.iconArrow}
            color="white"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.favorite}
          onPress={userInfo?.isLogin ? handleFavorite : handleLoginrequest}>
          {!isLove ? (
            <View>
              <Icon name="heart" size={18} color="red" style={styles.shadow} />
            </View>
          ) : (
            <Icon name="hearto" color="#fff" size={18} />
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={addToCart} style={styles.cart}>
          <IconM name="add-shopping-cart" size={23} color="#DD9A89" />
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    width: width * 0.43,
    height: height * 0.35,
    marginRight: width * 0.02,
    backgroundColor: '#517ad5',
    borderRadius: 15,
    // backgroundColor: 'red',
    // marginRight: width * 0.05,
    position: 'relative',
  },

  productInfo: {
    padding: 18,
    height: 100,
  },

  productCat: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },

  productName: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  productPrice: {
    color: '#fff',
  },

  productImg: {
    width: '120%',
    height: 100,
    transform: [{rotate: '-30deg'}],
  },

  iconArrow: {
    marginRight: 15,
  },

  iconContainer: {
    display: 'flex',
    alignItems: 'flex-end',
  },

  favorite: {
    position: 'absolute',
    right: 10,
    top: 8,
  },

  cart: {
    position: 'absolute',
    right: 7,
    top: 32,
  },

  shadow: {
    shadowColor: 'black',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.9,
    shadowRadius: 2,
    elevation: 5,
  },
});

export default withNavigation(Product);
