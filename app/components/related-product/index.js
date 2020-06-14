import React from 'react';
import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const RelatedProduct = (props) => {
  const {item} = props;
  return (
    item && (
      <View style={styles.relatedContainer}>
        <Image
          resizeMode="contain"
          style={styles.relatedImg}
          source={{uri: item.image}}
        />
        <Text style={styles.relatedName}>
          {item.name
            .toLocaleLowerCase()
            .replace(item.categories[0]?.category?.toLowerCase(), '')
            .trim()}
        </Text>
        <Text style={styles.relatedPrice}>${item.price}</Text>
      </View>
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

  relatedPrice: {
    marginBottom: 10,
  },
});

export default RelatedProduct;
