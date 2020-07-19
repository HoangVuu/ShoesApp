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
    dispatch(getFavorites());
  });

  return (
    <View style={styles.favoriteContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.textHeader}>My Favorite</Text>
        <Text style={styles.total}>
          {' '}
          Total {lovedList?.length} {lovedList?.length === 0 ? 'item' : 'items'}
        </Text>
      </View>

      <View style={{width: width}}>
        {lovedList.length ? (
          <FlatList
            data={lovedList}
            removeClippedSubviews
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => {
              return <FavoriteItem key={item.id} item={item} />;
            }}
            numColumns={2}
            keyExtractor={(item, index) => index}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={{color: '#847d7d'}}>
              You don't have any favorites shoes.
            </Text>

            <Text style={{color: '#847d7d'}}>
              {' '}
              Please choose shoes you liked.
            </Text>
          </View>
        )}
      </View>
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
    backgroundColor: '#fff',
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

  cart: {
    color: '#fff',
    textTransform: 'uppercase',
  },

  textTotal: {
    fontSize: 16,
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
    // height: height * 0.54,
  },
});
