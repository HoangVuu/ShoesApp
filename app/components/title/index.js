import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const {width, height} = Dimensions.get('window');

const Title = (props) => {
  const {title, customStyle} = props;
  return (
    <View style={styles.titleWrapper}>
      <Text style={[customStyle, styles.text]}>{title}</Text>
    </View>
  );
};

export default Title;

const styles = StyleSheet.create({
  titleWrapper: {
    height: height * 0.12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    fontFamily: 'Muli',
    // color: '#F93C66',
    fontWeight: 'bold',
  },
});
