import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  TouchableOpacity,
} from 'react-native';
import IconFont from 'react-native-vector-icons/FontAwesome';
import {withNavigation} from '@react-navigation/compat';

const Product = (props) => {
  const {item, isCurrent} = props;
  const [flipAnim] = useState(new Animated.Value(0));
  const [widthAnim] = useState(new Animated.Value(160));
  const [heightAnim] = useState(new Animated.Value(220));

  const categories = JSON.parse(JSON.stringify(item.categories))

  const goToDetail = () => {
    props.navigation.navigate('ProductDetail', {
      id: item.id,
    });
  };

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
        transform: [
          {
            rotateY: flipAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg', '80deg'],
            }),
          },
        ],
        width: widthAnim,
        height: heightAnim,
        // opacity: fadeAnim,
        // transform: [{translateY: slideAnim}],
      }}>
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
        <IconFont
          name="long-arrow-right"
          size={25}
          style={styles.iconArrow}
          color="white"
        />
      </TouchableOpacity>
      {/* <Icon name="hearto" style={styles.iconHeart} /> */}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    backgroundColor: '#517ad5',
    borderRadius: 15,
    marginRight: 50,
  },

  productInfo: {
    padding: 20,
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
});

export default withNavigation(Product);
