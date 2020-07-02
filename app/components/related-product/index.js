import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {withNavigation} from '@react-navigation/compat';

const {width, height} = Dimensions.get('window');

const RelatedProduct = (props) => {
  const {item} = props;

  const goToDetail = () => {
    props.navigation.navigate('ProductDetail', {
      id: item.id,
    });
  };

  return (
    item && (
      <TouchableOpacity onPress={goToDetail} style={styles.relatedContainer}>
        <Image
          resizeMode="contain"
          style={styles.relatedImg}
          source={{uri: item.image}}
        />
        <Text style={styles.relatedName}>{item.name}</Text>
        <Text style={styles.relatedPrice}>${item.price}</Text>
      </TouchableOpacity>
    )
  );
};

const styles = StyleSheet.create({
  relatedContainer: {
    marginLeft: 20,
    alignItems: 'center',
    width: width * 0.4,
    backgroundColor: '#fff',
    borderRadius: 15,
  },

  relatedImg: {
    width: '100%',
    height: 100,
    transform: [{rotate: '-15deg'}],
  },

  relatedName: {
    textTransform: 'capitalize',
  },

  relatedPrice: {
    marginBottom: 10,
  },
});

export default withNavigation(RelatedProduct);
