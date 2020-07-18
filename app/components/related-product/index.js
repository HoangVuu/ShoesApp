import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Fragment,
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
        <View style={styles.tagContainer}>
          <Text style={styles.textTag}>NEW</Text>
        </View>
        <Image
          resizeMode="contain"
          style={styles.relatedImg}
          source={{uri: item.image}}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.relatedName}>{item.name}</Text>
          <Text style={styles.relatedPrice}>${item.price}</Text>
        </View>
      </TouchableOpacity>
    )
  );
};

const styles = StyleSheet.create({
  relatedContainer: {
    position: 'relative',
    marginLeft: 20,
    alignItems: 'center',
    width: width * 0.4,
    backgroundColor: '#EFF0F1',
    borderRadius: 15,
  },

  relatedImg: {
    width: '100%',
    height: 100,
    transform: [{rotate: '-15deg'}],
  },

  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  relatedName: {
    textAlign: 'center',
    alignContent: 'center',
    width: width * 0.32,
    alignSelf: 'center',
    textTransform: 'capitalize',
    height: height * 0.05,
    fontWeight: 'bold',
  },

  relatedPrice: {
    marginBottom: 10,
  },

  tagContainer: {
    position: 'absolute',
    width: width * 0.25,
    backgroundColor: '#F93C66',
    transform: [{rotate: '-90deg'}],
    top: 25,
    right: width * 0.23,
  },

  textTag: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default withNavigation(RelatedProduct);
