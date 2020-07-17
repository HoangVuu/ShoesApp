import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const Header = (props) => {
  const {title} = props;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btn}>
          <Icon name="search1" style={styles.btnIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn}>
          <Icon name="bells" style={styles.btnIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },

  btn: {
    width: 40,
    height: 40,
    backgroundColor: '#cecece',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    flexShrink: 0,
    // 0 - header nhiều text đẩy ra thì btn sẽ ko thu lại để vừa, vẫn giữ nguyên kích thước
    // 1-  header nhiều text đẩy ra thì btn sẽ  thu lại để vừa kích thước
  },

  btnContainer: {
    flexDirection: 'row',
  },
  btnIcon: {
    fontSize: 18,
  },
});
