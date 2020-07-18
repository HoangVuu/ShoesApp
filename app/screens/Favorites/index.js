import React, {useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import {getFavorites} from '../../redux/actions';
import FavoriteItem from '../../components/favorite-item';

const {width, height} = Dimensions.get('window');

const Favorites = () => {
  const dispatch = useDispatch();
  const lovedList = useSelector((state) => state.favorite);

  useEffect(() => {
    console.log('lovedList', lovedList);
    dispatch(getFavorites());
  });

  return (
    <View style={styles.favoriteContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.textHeader}>My Favorite</Text>
        <Text style={styles.total}> Total {lovedList?.length} items</Text>
      </View>

      <FlatList
        data={lovedList}
        removeClippedSubviews
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => {
          return (
            <TouchableOpacity>
              <FavoriteItem key={item.id} item={item} />
            </TouchableOpacity>
          );
        }}
        numColumns={2}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
};

export default Favorites;

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

  favoriteContainer: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'column',
    padding: width * 0.01,
    backgroundColor: '#f5f5f5',
  },

  favoriteList: {
    backgroundColor: '#f5f5f5',
    marginTop: 5,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: height * 0.58,
    width: width,
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
    width: width,
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
